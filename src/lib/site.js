/* Sulochana Mahe — shared site runtime (GSAP + ScrollTrigger + Lenis).
   Used by every page: cloud loader & page transitions, smooth scroll, cursor,
   overlay menu, scroll reveals, and page hooks (Site.pages[page]). */
(function () {
  const Site = (window.Site = window.Site || {});
  Site.pages = Site.pages || {};

  Site.ready = () =>
    !!(
      window.gsap &&
      window.ScrollTrigger &&
      window.Lenis &&
      document.querySelector("[data-clouds]") &&
      document.querySelector("[data-menu]")
    );

  Site.whenReady = function (cb) {
    let t;
    const tick = () => (Site.ready() ? cb() : (t = setTimeout(tick, 30)));
    tick();
    return () => clearTimeout(t);
  };

  const seeded = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;

  /* ---------- clouds (persistent) ----------
     The overlay lives in the root layout and outlives every page runtime, so its
     state lives here, not in a page's gsap context. Reverting that context on
     navigation used to snap the puffs home and restart their drift while the
     clouds were closed. Every close/open tweens from wherever the puffs are, so
     a click mid-parting folds the clouds back in without a jump. */
  function makeClouds(g, el) {
    const $in = (s) => el.querySelector(s);
    const sky = $in("[data-sky]"),
      wrap = $in("[data-puffs]"),
      trans = $in("[data-transui]"),
      transName = $in("[data-transname]");
    if (!wrap.childElementCount) {
      const r = seeded(11);
      const tints = ["226,176,96", "240,214,160", "248,236,210", "253,248,238"];
      for (let i = 0; i < 46; i++) {
        const layer = i % 4;
        const x = r() * 120 - 10,
          y = r() * 120 - 10,
          s = 34 + r() * 40 + layer * 5;
        const c = tints[layer];
        const d = document.createElement("div");
        d.setAttribute("data-puff", "");
        d.style.cssText = `position:absolute;left:calc(${x}% - ${s / 2}vmax);top:calc(${y}% - ${s / 2}vmax);width:${s}vmax;height:${s}vmax;border-radius:50%;background:radial-gradient(closest-side, rgba(${c},1) 0%, rgba(${c},.82) 38%, rgba(${c},.35) 70%, rgba(${c},0) 100%);will-change:transform`;
        const dx = x - 50 || 1,
          dy = y - 50,
          len = Math.hypot(dx, dy);
        d._ox = (dx / len) * (0.9 + r() * 0.5);
        d._oy = (dy / len) * (0.9 + r() * 0.5);
        wrap.appendChild(d);
      }
    }
    const puffs = Array.from(wrap.querySelectorAll("[data-puff]"));
    const outX = (i) => puffs[i]._ox * window.innerWidth;
    const outY = (i) => puffs[i]._oy * window.innerHeight;

    // The first paint shows the overlay closed. The drift only runs while the
    // clouds are on screen: 46 viewport-sized layers restyled every frame for
    // the life of the page cost frames everywhere else.
    g.set(puffs, { x: 0, y: 0, scale: 1 });
    const drift = puffs.map((p, i) =>
      g.to(p, {
        xPercent: (i % 2 ? 1 : -1) * (4 + (i % 5)),
        yPercent: (i % 3 ? -1 : 1) * 3,
        duration: 5 + (i % 4),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
    );
    const drifting = (on) => drift.forEach((t) => (on ? t.play() : t.pause()));
    const show = () => {
      drifting(true);
      g.set(el, { visibility: "visible", pointerEvents: "auto" });
    };

    let tl = null,
      failsafe = 0;
    const run = (t) => {
      if (tl) tl.kill();
      return (tl = t);
    };
    // If no page claims the closed clouds (a failed navigation), part them anyway.
    const arm = () => {
      clearTimeout(failsafe);
      failsafe = setTimeout(() => api.open(false), 8000);
    };
    const onPop = () => {
      if (location.pathname !== api.path) api.snap();
    };
    window.addEventListener("popstate", onPop);

    const api = {
      el,
      covered: true,
      // True while the clouds are closing or closed; route clicks wait it out.
      busy: true,
      path: location.pathname,
      // A page runtime took over the closed clouds and will open them.
      claim() {
        clearTimeout(failsafe);
      },
      // The clouds answer the click on the very next frame (an ease-out, not an
      // ease-in that idles for a third of its run), and the page is swapped as
      // soon as the screen is covered; the name keeps surfacing over the swap.
      // Only transform and opacity animate here: a filter on this full-viewport
      // layer re-blurred the whole screen every frame.
      close(destHTML, cb) {
        clearTimeout(failsafe);
        api.busy = api.covered = true;
        transName.innerHTML = destHTML || "";
        show();
        run(g.timeline())
          .to(
            puffs,
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              stagger: { each: 0.004, from: "edges" },
            },
            0,
          )
          .to(sky, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.05)
          // The lamp-arch and the destination surface out of the cloud bank,
          // echoing the loader, and hold there while the next page loads.
          .fromTo(
            trans,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
            0.3,
          )
          .add(() => {
            arm();
            cb && cb();
          }, 0.8);
      },
      // Back/forward: Next renders the next page on its own, so cover at once,
      // before it paints, rather than let it flash and close over it.
      snap() {
        run(null);
        api.busy = api.covered = true;
        show();
        g.set(puffs, { x: 0, y: 0, scale: 1 });
        g.set(sky, { opacity: 1 });
        g.set(trans, { opacity: 0 });
        arm();
      },
      open(first, cb) {
        clearTimeout(failsafe);
        return run(
          g.timeline({
            onComplete: () => {
              g.set(el, { visibility: "hidden" });
              drifting(false);
              api.covered = false;
              cb && cb();
            },
          }),
        )
          .to(
            trans,
            { opacity: 0, y: -24, duration: 0.45, ease: "power2.in" },
            0,
          )
          // The first visit keeps its slow, ceremonial parting; a page change
          // parts at once so the new page is there the moment it is ready.
          .to(
            puffs,
            {
              x: outX,
              y: outY,
              scale: 1.7,
              duration: first ? 2.6 : 1.3,
              ease: first ? "expo.inOut" : "power3.inOut",
              stagger: { each: first ? 0.012 : 0.004, from: "center" },
            },
            first ? 0.15 : 0.05,
          )
          .to(
            sky,
            {
              opacity: 0,
              duration: first ? 1.4 : 0.9,
              ease: first ? "power2.inOut" : "power2.out",
            },
            first ? 0.7 : 0.2,
          )
          // Hand the page back once the centre has cleared.
          .add(() => {
            g.set(el, { pointerEvents: "none" });
            api.busy = false;
          }, first ? 1.1 : 0.55);
      },
      kill() {
        run(null);
        clearTimeout(failsafe);
        drift.forEach((t) => t.kill());
        window.removeEventListener("popstate", onPop);
      },
    };
    return api;
  }
  // One controller per overlay element (a fresh one only if the layout remounts).
  function getClouds(g) {
    const el = document.querySelector("[data-clouds]");
    let c = Site._clouds;
    if (c && c.el === el) return c;
    if (c) c.kill();
    return (Site._clouds = makeClouds(g, el));
  }

  Site.init = function (opts) {
    opts = opts || {};
    const g = window.gsap,
      ST = window.ScrollTrigger;
    g.registerPlugin(ST);
    g.config({ nullTargetWarn: false });
    const $ = (s, r) => (r || document).querySelector(s);
    const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
    const off = [];
    const on = (el, ev, fn, o) => {
      if (!el) return;
      el.addEventListener(ev, fn, o);
      off.push(() => el.removeEventListener(ev, fn, o));
    };
    let rctx = null,
      roff = [];
    const onR = (el, ev, fn, o) => {
      if (!el) return;
      el.addEventListener(ev, fn, o);
      roff.push(() => el.removeEventListener(ev, fn, o));
    };
    const root = document.documentElement;
    const navigate =
      opts.navigate ||
      ((href) => {
        window.location.href = href;
      });
    const isStatic =
      !!window.SITE_STATIC || /[?&]static\b/.test(location.search);
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const page = Site.pages[opts.page] || {};

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);

    const ui = $("[data-loadui]");

    const tickClock = () => {
      try {
        const t = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date());
        document.querySelectorAll("[data-clock]").forEach((e) => {
          e.textContent = t;
        });
      } catch (e) {}
    };
    tickClock();
    if (isStatic) {
      $("[data-clouds]").style.display = "none";
      $$("[data-track]").forEach((t) => {
        t.style.flexWrap = "wrap";
        t.style.width = "auto";
      });
      $$("[data-hscroll]").forEach((s) => {
        s.style.height = "auto";
      });
      page.staticSetup && page.staticSetup({ g, $, $$ });
      const noop = () => {};
      noop.rebuild = noop;
      return noop;
    }

    const lenis = new window.Lenis({ lerp: 0.09 });
    lenis.on("scroll", ST.update);
    const tick = (t) => lenis.raf(t * 1000);
    g.ticker.add(tick);
    g.ticker.lagSmoothing(0);
    lenis.stop();

    /* ---------- clouds ---------- */
    const clouds = getClouds(g);
    // Arriving without a cloud transition (first load is already covered; a
    // remount or back/forward may not be): close them before anything moves.
    if (!clouds.covered) clouds.snap();
    clouds.claim();
    clouds.path = location.pathname;
    // Destination name shown in the clouds; a painting's page reads as Works.
    const destHTML = (route) => {
      const s = $(
        `[data-destlabel="${route === "work" ? "works" : route}"]`,
      );
      return s ? s.innerHTML : "";
    };
    let dead = false;

    let menuOpen = false,
      menuTl;
    const ctx = g.context(() => {});

    ctx.add(() => {
      g.set("[data-hchar]", { yPercent: 115, rotate: 5 });
      g.set("[data-hfade]", { opacity: 0, y: 26 });
      g.set("[data-hclip]", { clipPath: "inset(100% 0% 0% 0%)" });
      g.set("[data-hclipimg]", { scale: 1.4, force3D: false });
      g.set("[data-nav]", { yPercent: -120 });
      g.set("[data-menufab]", { scale: 0 });

      page.setup && page.setup({ g, ST, lenis, $, $$, on, finePointer });
      buildMenu();
      buildHeader();
    });
    buildReveals();

    /* ---------- intro ---------- */
    ctx.add(() => {
      const first = !sessionStorage.getItem("sm-loaded");
      sessionStorage.setItem("sm-loaded", "1");
      const tl = g.timeline({ paused: true });
      if (first) {
        const count = $("[data-loadcount]"),
          c = { v: 0 };
        tl.set(ui, { opacity: 1 })
          .fromTo(
            "[data-loadname]",
            { opacity: 0, filter: "blur(18px)", letterSpacing: "0.18em" },
            {
              opacity: 1,
              filter: "blur(0px)",
              letterSpacing: "0em",
              duration: 2.2,
              ease: "expo.out",
            },
            0.1,
          )
          .fromTo(
            "[data-loadmeta]",
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.5,
          )
          .to(
            c,
            {
              v: 100,
              duration: 2.6,
              ease: "power2.inOut",
              onUpdate: () => {
                count.textContent = String(Math.round(c.v)).padStart(3, "0");
              },
            },
            0,
          )
          .addLabel("part", "+=0.25")
          .to(
            ui,
            {
              opacity: 0,
              y: -40,
              filter: "blur(10px)",
              duration: 0.8,
              ease: "power2.in",
            },
            "part",
          )
          // The loader is done with; drop its full-screen filter layer.
          .set(ui, { clearProps: "filter,transform" });
      } else {
        // A page change: the loader stays hidden and untouched.
        tl.set(ui, { opacity: 0 }).addLabel("part", 0);
      }
      let parted = false;
      tl.add(() => {
        if (parted) return;
        parted = true;
        clouds.open(first);
      }, "part").addLabel("reveal", first ? "part+=0.9" : "part+=0.25");
      heroIntro(tl, "reveal");
      page.intro && page.intro(tl, "reveal", { g, $, $$ });
      tl.add(() => lenis.start(), "reveal+=0.9");
      // Part the clouds only once the page's fonts have settled (the Malayalam
      // faces load on demand), so no text reflows after it is revealed. The
      // first visit's loader already runs long enough.
      const settled = first
        ? Promise.resolve()
        : Promise.race([
            document.fonts ? document.fonts.ready : Promise.resolve(),
            new Promise((r) => setTimeout(r, 500)),
          ]);
      settled.then(() =>
        requestAnimationFrame(() => {
          if (!dead) tl.play();
        }),
      );
    });

    // The hero image scales inside a box whose clip-path is animating. Left to
    // force3D:"auto", GSAP lifts the image onto its own GPU layer for the tween,
    // and Chrome then clips it with a separately rasterised mask that trails
    // the moving clip edge by a frame: slivers of the image flash outside the
    // box and a hairline outlines the arch; when the tween ends the layer drops
    // back and the image visibly re-sharpens. Painted in 2D, the image is
    // clipped in the same paint as the box. Once revealed, the clip-path is
    // removed so it doesn't double the overflow edge's anti-aliasing.
    function heroIntro(tl, at) {
      tl.to(
        "[data-hclip]",
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          clearProps: "clipPath",
        },
        at,
      )
        .to(
          "[data-hclipimg]",
          { scale: 1, duration: 2.2, ease: "expo.out", force3D: false },
          at,
        )
        .to(
          "[data-hchar]",
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.04,
          },
          at + "+=0.15",
        )
        .to(
          "[data-hfade]",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.07 },
          at + "+=0.6",
        )
        .to(
          "[data-nav]",
          { yPercent: 0, duration: 1, ease: "expo.out" },
          at + "+=0.6",
        )
        .to(
          "[data-menufab]",
          { scale: 1, duration: 0.9, ease: "back.out(1.7)" },
          at + "+=0.9",
        );
    }

    /* ---------- in-place content swap (language change) ----------
       Clouds close, `apply` updates the DOM (it may return a promise), scroll
       effects re-bind to the new text, then the clouds part again. The scroll
       position is kept. */
    let swapping = false;
    function transition(apply) {
      if (swapping || clouds.busy) return;
      swapping = true;
      lenis.stop();
      clouds.close("", () => {
        if (menuOpen) {
          toggleMenu(false);
          menuTl.progress(0).pause();
        }
        lenis.stop();
        new Promise((done) => {
          Promise.resolve(apply()).then(done, done);
          setTimeout(done, 1500);
        }).then(() =>
          requestAnimationFrame(() => {
            if (dead) return;
            rebuild();
            clouds.open(false, () => {
              swapping = false;
              lenis.start();
            });
          }),
        );
      });
    }

    /* ---------- scroll reveals ---------- */
    function buildReveals() {
      rctx = g.context(() => reveals());
    }
    function rebuild() {
      roff.forEach((f) => f && f());
      roff = [];
      rctx && rctx.revert();
      buildReveals();
      ST.refresh();
    }
    function reveals() {
      $$("[data-rl]").forEach((el) =>
        g.from(el, {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: el.parentElement, start: "top 90%" },
        }),
      );
      $$("[data-fade]").forEach((el) =>
        g.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        }),
      );
      $$("[data-clip]").forEach((el) => {
        const tl = g.timeline({
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
        tl.from(el, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.inOut",
        });
        const img = el.querySelector("[data-clipimg]");
        if (img)
          tl.from(img, { scale: 1.35, duration: 2, ease: "expo.out" }, 0);
      });
      $$("[data-words]").forEach((p) => {
        const w = $$("[data-word]", p);
        g.set(w, { opacity: 0.14 });
        g.to(w, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: p,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        });
      });
      $$("[data-parallax]").forEach((el) =>
        g.fromTo(
          el,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        ),
      );
      $$("[data-stagger]").forEach((w) =>
        g.from(w.children, {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: w, start: "top 88%" },
        }),
      );

      $$("[data-row]").forEach((r) => {
        const line = $("[data-rline]", r);
        if (line)
          g.from(line, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: r, start: "top 92%" },
          });
        g.from($$("[data-rin]", r), {
          y: 36,
          opacity: 0,
          stagger: 0.07,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: r, start: "top 92%" },
        });
      });

      // Horizontal gallery (desktop pins; touch / narrow screens swipe natively)
      $$("[data-hscroll]").forEach((sec) => {
        const track = $("[data-track]", sec),
          vp = $("[data-trackvp]", sec),
          bar = $("[data-wbar]", sec),
          count = $("[data-wcount]", sec);
        const total = track.children.length;
        const mm = g.matchMedia();
        mm.add("(min-width: 821px)", () => {
          vp.style.overflowX = "hidden";
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const hs = g.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: () => "+=" + dist(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (s) => {
                g.set(bar, { scaleX: s.progress });
                if (count)
                  count.textContent = String(
                    Math.min(total, 1 + Math.floor(s.progress * total)),
                  ).padStart(2, "0");
              },
            },
          });
          $$("[data-wimg]", sec).forEach((el) =>
            g.fromTo(
              el,
              { xPercent: -6 },
              {
                xPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  containerAnimation: hs,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            ),
          );
          return () => {
            vp.style.overflowX = "";
          };
        });
        mm.add("(max-width: 820px)", () => {
          vp.style.overflowX = "auto";
          const upd = () => {
            const m = vp.scrollWidth - vp.clientWidth;
            const p = m ? vp.scrollLeft / m : 0;
            g.set(bar, { scaleX: p });
            if (count)
              count.textContent = String(
                Math.min(total, 1 + Math.floor(p * total * 0.999)),
              ).padStart(2, "0");
          };
          vp.addEventListener("scroll", upd, { passive: true });
          vp.setAttribute("data-lenis-prevent-horizontal", "");
          return () => vp.removeEventListener("scroll", upd);
        });
        roff.push(() => mm.revert());
      });

      // Hover list with cursor-following preview ("What she paints")
      $$("[data-hoverlist]").forEach((list) => {
        const fl = $("[data-float]", list),
          flImg = $("[data-floatimg]", list);
        const rows = $$("[data-row]", list);
        if (!finePointer || !fl) {
          $$("[data-rthumb]", list).forEach((t) => (t.style.display = "block"));
          if (fl) fl.style.display = "none";
          return;
        }
        g.set(fl, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
        const fx = g.quickTo(fl, "x", { duration: 0.6, ease: "power3" }),
          fy = g.quickTo(fl, "y", { duration: 0.6, ease: "power3" });
        let active = null,
          px = -1,
          py = -1;
        // Pick the row under the cursor by hit-testing, so the preview also
        // follows along when the page scrolls under a still cursor (the browser
        // doesn't reliably fire pointerenter for that).
        const syncRow = () => {
          if (px < 0) return;
          const el = document.elementFromPoint(px, py);
          const r = el && el.closest("[data-row]");
          if (r && rows.includes(r)) enter(r, { clientX: px, clientY: py });
        };
        onR(window, "pointermove", (e) => {
          px = e.clientX;
          py = e.clientY;
        }, { passive: true });
        onR(list, "pointermove", (e) => {
          fx(e.clientX);
          fy(e.clientY);
          syncRow();
        });
        const enter = (r, e) => {
          if (active === r) return;
          if (!active && e) {
            g.set(fl, { x: e.clientX, y: e.clientY });
          }
          active = r;
          flImg.style.backgroundSize = r.dataset.size;
          flImg.style.backgroundPosition = r.dataset.pos;
          g.fromTo(
            flImg,
            { scale: 1.2 },
            { scale: 1, duration: 0.8, ease: "expo.out", overwrite: true },
          );
          g.to(fl, {
            opacity: 1,
            scale: 1,
            rotate: -3,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
          rows.forEach((o) => {
            const on_ = o === r;
            g.to($("[data-rtitle]", o), {
              x: on_ ? 24 : 0,
              color: on_ ? o.dataset.hl : o.dataset.ink,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
            g.to($("[data-rarrow]", o), {
              rotate: on_ ? 0 : -45,
              scale: on_ ? 1 : 0.85,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        };
        const leaveAll = () => {
          active = null;
          g.to(fl, {
            opacity: 0,
            scale: 0.6,
            rotate: 0,
            duration: 0.4,
            overwrite: "auto",
          });
          rows.forEach((o) => {
            g.to($("[data-rtitle]", o), {
              x: 0,
              color: o.dataset.ink,
              duration: 0.5,
              overwrite: "auto",
            });
            g.to($("[data-rarrow]", o), {
              rotate: -45,
              scale: 0.85,
              duration: 0.5,
              overwrite: "auto",
            });
          });
        };
        rows.forEach((r) => {
          onR(r, "focus", () => enter(r));
          onR(r, "blur", leaveAll);
        });
        onR($("[data-rows]", list) || list, "pointerleave", leaveAll);
        roff.push(
          lenis.on("scroll", () => {
            syncRow();
            if (!active) return;
            const b = list.getBoundingClientRect();
            if (b.bottom < 0 || b.top > innerHeight) leaveAll();
          }),
        );
      });

      $$("[data-mag]").forEach((el) => {
        if (!finePointer) return;
        const inner = el.firstElementChild;
        onR(el, "pointermove", (e) => {
          const b = el.getBoundingClientRect(),
            dx = e.clientX - b.left - b.width / 2,
            dy = e.clientY - b.top - b.height / 2;
          g.to(el, {
            x: dx * 0.35,
            y: dy * 0.35,
            duration: 0.5,
            ease: "power3",
          });
          if (inner)
            g.to(inner, {
              x: dx * 0.15,
              y: dy * 0.15,
              duration: 0.5,
              ease: "power3",
            });
        });
        onR(el, "pointerleave", () =>
          g.to([el, inner].filter(Boolean), {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1,.4)",
          }),
        );
      });

      $$("[data-mq]").forEach((m) => {
        const mq = g.to(m, {
          xPercent: -50,
          repeat: -1,
          duration: 26,
          ease: "none",
        });
        roff.push(
          lenis.on("scroll", ({ velocity }) => {
            g.to(mq, {
              timeScale: 1 + Math.min(Math.abs(velocity) / 3, 5),
              duration: 0.2,
              overwrite: true,
            });
            g.to(mq, { timeScale: 1, duration: 0.8, delay: 0.2 });
          }),
        );
      });

      $$("[data-spin]").forEach((el) =>
        g.to(el, {
          rotate: 360,
          repeat: -1,
          duration: 18,
          ease: "none",
          transformOrigin: "50% 50%",
        }),
      );
      $$("[data-scrollline]").forEach((el) =>
        g
          .timeline({ repeat: -1 })
          .fromTo(
            el,
            { scaleY: 0, transformOrigin: "top" },
            { scaleY: 1, duration: 0.9, ease: "power2.inOut" },
          )
          .set(el, { transformOrigin: "bottom" })
          .to(el, { scaleY: 0, duration: 0.9, ease: "power2.inOut" }),
      );

      // Footer: giant wordmark rises letter by letter; content drifts in
      $$("[data-fword]").forEach((w) =>
        g.from($$("[data-fchar]", w), {
          yPercent: 110,
          rotate: 4,
          stagger: 0.035,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: w, start: "top 98%" },
        }),
      );
      $$("[data-footpar]").forEach((el) =>
        g.from(el, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }),
      );

      // Stacking panels (Works)
      $$("[data-stack]").forEach((st) => {
        const items = $$("[data-stackitem]", st);
        items.forEach((it, i) => {
          const nx = items[i + 1];
          if (!nx) return;
          g.to($("[data-stackinner]", it), {
            scale: 0.9,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: nx,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });
      // Arch that opens to full-bleed on scroll (Work detail)
      $$("[data-expand]").forEach((el) => {
        const sec = el.closest("[data-expandsec]") || el.parentElement;
        g.fromTo(
          el,
          { clipPath: el.dataset.from },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      });
      // Loupe: magnify detail under the pointer
      $$("[data-loupe]").forEach((box) => {
        const lens = $("[data-lens]", box),
          li = $("[data-lensimg]", box);
        if (!lens) return;
        if (!finePointer) {
          lens.style.display = "none";
          return;
        }
        const Z = 2.8;
        g.set(lens, { xPercent: -50, yPercent: -50, scale: 0 });
        const lx = g.quickSetter(lens, "x", "px"),
          ly = g.quickSetter(lens, "y", "px");
        onR(box, "pointerenter", () =>
          g.to(lens, { scale: 1, duration: 0.5, ease: "expo.out" }),
        );
        onR(box, "pointerleave", () =>
          g.to(lens, { scale: 0, duration: 0.35 }),
        );
        onR(box, "pointermove", (e) => {
          const b = box.getBoundingClientRect(),
            R = lens.offsetWidth / 2,
            px = e.clientX - b.left,
            py = e.clientY - b.top;
          lx(px);
          ly(py);
          li.style.width = b.width * Z + "px";
          li.style.height = b.height * Z + "px";
          li.style.transform =
            "translate(" + (R - px * Z) + "px," + (R - py * Z) + "px)";
        });
      });
      // Count-up numbers
      $$("[data-countto]").forEach((el) => {
        const v = +el.dataset.countto,
          o = { v: 0 };
        el.textContent = "0";
        g.to(o, {
          v,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
          onUpdate: () => {
            el.textContent = Math.round(o.v).toLocaleString("en-IN");
          },
        });
      });
      // Timeline progress line
      $$("[data-tline]").forEach((el) =>
        g.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        ),
      );
    }

    /* ---------- header (scrolls with the page; only the menu button is fixed) ---------- */
    function buildHeader() {
      const iv = setInterval(tickClock, 15000);
      off.push(() => clearInterval(iv));
      $$("[data-hnavlink]").forEach((a) => {
        if (a.dataset.route === opts.page) {
          a.style.color = "#D89A2B";
          a.setAttribute("aria-current", "page");
        }
      });
      $$("[data-roll]").forEach((a) => {
        const r = $("[data-rollin]", a);
        if (!r) return;
        on(a, "pointerenter", () =>
          g.to(r, { yPercent: -50, duration: 0.55, ease: "expo.out" }),
        );
        on(a, "pointerleave", () =>
          g.to(r, { yPercent: 0, duration: 0.55, ease: "expo.out" }),
        );
      });
      // The clock, inline nav and CTA collapse through media queries in
      // styles.css, so the breakpoints can differ per language.
      const fab = $("[data-menufab]");
      if (fab && finePointer) {
        on(fab, "pointermove", (e) => {
          const b = fab.getBoundingClientRect();
          g.to(fab, {
            x: (e.clientX - b.left - b.width / 2) * 0.3,
            y: (e.clientY - b.top - b.height / 2) * 0.3,
            duration: 0.4,
            ease: "power3",
          });
        });
        on(fab, "pointerleave", () =>
          g.to(fab, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,.4)" }),
        );
      }
    }

    /* ---------- menu ---------- */
    function buildMenu() {
      menuTl = g
        .timeline({ paused: true })
        .set("[data-menu]", { visibility: "visible" })
        .fromTo(
          "[data-mpanel]",
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.inOut",
            transformOrigin: "top",
          },
        )
        .fromTo(
          "[data-mlink]",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out" },
          "-=0.4",
        )
        .fromTo(
          "[data-mprev]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" },
          "<",
        )
        .fromTo(
          "[data-mfade]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
          },
          "<0.2",
        );
      const items = $$("[data-mitem]"),
        prev = $("[data-mprevimg]");
      items.forEach((a) => {
        if (a.dataset.route === opts.page)
          a.setAttribute("aria-current", "page");
        on(a, "pointerenter", () => {
          items.forEach((o) =>
            g.to(o, { opacity: o === a ? 1 : 0.3, duration: 0.4 }),
          );
          g.to($("[data-mlink]", a), {
            x: 24,
            duration: 0.5,
            ease: "power3.out",
          });
          prev.style.backgroundSize = a.dataset.size;
          prev.style.backgroundPosition = a.dataset.pos;
          g.fromTo(
            prev,
            { scale: 1.15 },
            { scale: 1, duration: 0.9, ease: "expo.out" },
          );
        });
        on(a, "pointerleave", () => {
          items.forEach((o) => g.to(o, { opacity: 1, duration: 0.4 }));
          g.to($("[data-mlink]", a), {
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        });
      });
      $$("[data-mcur]").forEach((d) => {
        d.style.opacity =
          d.closest("[data-mitem]").dataset.route === opts.page ? "1" : "0";
      });
      $$("[data-menubtn]").forEach((b) => on(b, "click", () => toggleMenu()));
      on(window, "keydown", (e) => {
        if (e.key === "Escape" && menuOpen) toggleMenu(false);
      });
    }
    function toggleMenu(force) {
      const open = typeof force === "boolean" ? force : !menuOpen;
      if (open === menuOpen) return;
      menuOpen = open;
      if (open) {
        lenis.stop();
        menuTl.timeScale(1).play();
      } else {
        lenis.start();
        menuTl.timeScale(1.5).reverse();
      }
      g.to("[data-menufab]", {
        backgroundColor: open ? "#F1E6CC" : "#D89A2B",
        rotate: open ? 90 : 0,
        duration: 0.6,
        ease: "expo.inOut",
      });
      $$("[data-menubtn]").forEach((b) =>
        b.setAttribute("aria-expanded", String(open)),
      );
      g.to("[data-mlabel]", {
        yPercent: open ? -50 : 0,
        duration: 0.6,
        ease: "expo.inOut",
      });
      g.to("[data-bar1]", {
        y: open ? 3.75 : 0,
        rotate: open ? 45 : 0,
        duration: 0.6,
        ease: "expo.inOut",
      });
      g.to("[data-bar2]", {
        y: open ? -3.75 : 0,
        rotate: open ? -45 : 0,
        duration: 0.6,
        ease: "expo.inOut",
      });
    }

    /* ---------- links & routing ---------- */
    on(
      document,
      "click",
      (e) => {
        const a = e.target.closest && e.target.closest("a");
        if (
          !a ||
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          a.target === "_blank"
        )
          return;
        const href = a.getAttribute("href") || "";
        if (href.startsWith("#")) {
          if (href.length < 2) return;
          e.preventDefault();
          if (menuOpen) toggleMenu(false);
          lenis.scrollTo(href === "#top" ? 0 : href, { duration: 1.6 });
          return;
        }
        if (!a.hasAttribute("data-route")) return;
        e.preventDefault();
        // Already on the way somewhere: a second click must not restart the clouds.
        if (clouds.busy || swapping) return;
        // Same route name is not enough: /works/a → /works/b are both "work".
        const same =
          a.dataset.route === opts.page &&
          !href.includes("#") &&
          !href.includes("?") &&
          href === location.pathname;
        if (same) {
          if (menuOpen) toggleMenu(false);
          lenis.scrollTo(0, { duration: 1.6 });
          return;
        }
        if (menuOpen) {
          menuOpen = false;
          lenis.start();
        }
        lenis.stop();
        clouds.close(destHTML(a.dataset.route), () => navigate(href));
      },
      true,
    );

    /* ---------- cursor ---------- */
    (function cursor() {
      const c = $("[data-cur]"),
        bub = $("[data-curbub]");
      if (!finePointer || !c || !bub) return;
      const dot = $("[data-curdot]"),
        ring = $("[data-curring]"),
        lab = $("[data-curlabel]");
      const dx = g.quickSetter(dot, "x", "px"),
        dy = g.quickSetter(dot, "y", "px");
      const rx = g.quickTo(ring, "x", { duration: 0.45, ease: "power3" }),
        ry = g.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
      const bx = g.quickTo(bub, "x", { duration: 0.55, ease: "power3" }),
        by = g.quickTo(bub, "y", { duration: 0.55, ease: "power3" });
      g.set([dot, ring, bub], { xPercent: -50, yPercent: -50 });
      g.set(bub, { scale: 0 });
      let visible = false,
        mode = null;
      const show = (x, y) => {
        if (visible) return;
        visible = true;
        g.set([dot, ring, bub], { x, y });
        root.classList.add("has-cur");
        g.to([c, bub], { opacity: 1, duration: 0.25, overwrite: "auto" });
      };
      const hide = () => {
        if (!visible) return;
        visible = false;
        g.to([c, bub], { opacity: 0, duration: 0.2, overwrite: "auto" });
      };
      const setMode = (t) => {
        const el = t && t.closest ? t : null;
        const field =
          el && el.closest('input, textarea, select, [contenteditable="true"]');
        const big = !field && el && el.closest("[data-cursor]");
        const link =
          !field &&
          !big &&
          el &&
          el.closest('a, button, label, [role="button"]');
        const m = field
          ? "field"
          : big
            ? "big:" + big.dataset.cursor
            : link
              ? "link"
              : "none";
        if (m === mode) return;
        mode = m;
        if (field) {
          root.classList.remove("has-cur");
          g.to([dot, ring], { opacity: 0, duration: 0.15 });
          g.to(bub, { scale: 0, duration: 0.2 });
          return;
        }
        root.classList.add("has-cur");
        if (big) {
          lab.textContent = big.dataset.cursor;
          g.to(bub, { scale: 1, duration: 0.45, ease: "expo.out" });
          g.to(ring, { scale: 0.4, opacity: 0, duration: 0.3 });
          g.to(dot, { scale: 0, opacity: 1, duration: 0.2 });
        } else {
          g.to(bub, { scale: 0, duration: 0.3, ease: "power3.out" });
          g.to(ring, {
            scale: link ? 1.7 : 1,
            opacity: 1,
            duration: 0.45,
            ease: "expo.out",
          });
          g.to(dot, { scale: link ? 0 : 1, opacity: 1, duration: 0.25 });
        }
      };
      on(
        window,
        "pointermove",
        (e) => {
          if (e.pointerType && e.pointerType !== "mouse") return;
          show(e.clientX, e.clientY);
          dx(e.clientX);
          dy(e.clientY);
          rx(e.clientX);
          ry(e.clientY);
          bx(e.clientX);
          by(e.clientY);
          setMode(e.target);
        },
        { passive: true },
      );
      on(document, "pointerover", (e) => {
        if (visible) setMode(e.target);
      });
      on(document.documentElement, "mouseleave", hide);
      on(window, "blur", hide);
      on(window, "pointerdown", () =>
        g.to(ring, { scale: "*=0.8", duration: 0.15 }),
      );
      on(window, "pointerup", () => {
        const m = mode;
        mode = null;
        setMode(
          document.elementFromPoint(
            g.getProperty(dot, "x"),
            g.getProperty(dot, "y"),
          ) || document.body,
        );
        if (!mode) mode = m;
      });
      off.push(() => root.classList.remove("has-cur"));
    })();

    if (location.hash) {
      const tgt = document.getElementById(location.hash.slice(1));
      if (tgt)
        setTimeout(() => {
          ST.refresh();
          lenis.scrollTo(tgt, { immediate: true, force: true });
        }, 60);
    }
    document.fonts && document.fonts.ready.then(() => ST.refresh());
    const onLoad = () => ST.refresh();
    on(window, "load", onLoad);

    Site.current = { lenis, rebuild, transition, page: opts.page };
    const destroy = function () {
      dead = true;
      Site.current = null;
      roff.forEach((f) => f && f());
      rctx && rctx.revert();
      off.forEach((f) => f());
      page.destroy && page.destroy();
      ctx.revert();
      g.ticker.remove(tick);
      lenis.destroy();
    };
    destroy.rebuild = rebuild;
    return destroy;
  };

  /* ================= Page hooks ================= */

  // Home: lamp-lit wall. The mural sits in darkness; an oil-lamp glow follows the
  // pointer and reveals it in full colour. Scrolling lights the whole wall.
  Site.pages.home = {
    setup({ g, ST, $, on, finePointer }) {
      const hero = $("[data-hero]"),
        lit = $("[data-lamp-lit]"),
        glow = $("[data-lamp-glow]"),
        wall = $("[data-lampwall]");
      if (!hero || !lit) return;
      const mask =
        "radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 0%, rgba(0,0,0,.92) 30%, rgba(0,0,0,.45) 62%, transparent 100%)";
      lit.style.webkitMaskImage = mask;
      lit.style.maskImage = mask;
      const L = { x: 0.5, y: 0.46, tx: 0.5, ty: 0.46, base: 0, extra: 0 };
      this._L = L;
      let lastMove = -1e9;
      on(hero, "pointermove", (e) => {
        const b = hero.getBoundingClientRect();
        L.tx = (e.clientX - b.left) / b.width;
        L.ty = (e.clientY - b.top) / b.height;
        lastMove = performance.now();
        const h = $("[data-lamphint]");
        if (h && !h._gone) {
          h._gone = true;
          g.to(h, { opacity: 0, y: -10, duration: 0.6 });
        }
      });
      const tick = () => {
        const t = performance.now() / 1000;
        if (performance.now() - lastMove > (finePointer ? 3500 : 0)) {
          L.tx = 0.42 + 0.2 * Math.sin(t * 0.35);
          L.ty = 0.45 + 0.12 * Math.sin(t * 0.6 + 1);
        }
        L.x += (L.tx - L.x) * 0.07;
        L.y += (L.ty - L.y) * 0.07;
        const vmin = Math.min(hero.clientWidth, hero.clientHeight);
        const flicker =
          1 +
          0.035 * Math.sin(t * 9.3) +
          0.02 * Math.sin(t * 23.1) +
          0.015 * Math.sin(t * 3.7);
        const r = (L.base * flicker + L.extra) * vmin;
        const vars = {
          "--lx": (L.x * 100).toFixed(2) + "%",
          "--ly": (L.y * 100).toFixed(2) + "%",
          "--lr": Math.max(r, 0.01).toFixed(1) + "px",
        };
        for (const k in vars) {
          lit.style.setProperty(k, vars[k]);
          glow.style.setProperty(k, vars[k]);
        }
      };
      g.ticker.add(tick);
      this.destroy = () => g.ticker.remove(tick);
      const st = {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      g.to(L, { extra: 1.6, ease: "none", scrollTrigger: st });
      g.to(wall, { scale: 1.12, yPercent: 8, ease: "none", scrollTrigger: st });
      g.to("[data-htop]", { xPercent: -10, ease: "none", scrollTrigger: st });
      g.to("[data-hbot]", { xPercent: 10, ease: "none", scrollTrigger: st });
      g.set(wall, { scale: 1.35, filter: "blur(14px) brightness(1.6)" });
      g.set(glow, { opacity: 0 });
    },
    intro(tl, at) {
      const L = this._L;
      if (!L) return;
      tl.to(
        "[data-lampwall]",
        {
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: 2.6,
          ease: "expo.out",
        },
        at,
      )
        .to(L, { base: 0.36, duration: 2.4, ease: "expo.out" }, at + "+=0.3")
        .to(
          "[data-lamp-glow]",
          { opacity: 1, duration: 1.6, ease: "power2.out" },
          at + "+=0.3",
        )
        .fromTo(
          "[data-band]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "expo.inOut", stagger: 0.1 },
          at + "+=0.2",
        );
    },
    staticSetup({ $ }) {
      const lit = $("[data-lamp-lit]");
      if (lit) {
        lit.style.webkitMaskImage = "none";
        lit.style.maskImage = "none";
      }
    },
  };

  // Gallery: infinite drag canvas + lightbox
  Site.pages.gallery = {
    layout($, $$) {
      const vp = $("[data-gcanvas]");
      if (!vp) return null;
      const tiles = $$("[data-gtile]", vp),
        C = 6,
        R = Math.ceil(tiles.length / C);
      const cw = Math.max(260, Math.min(420, vp.clientWidth / 4.4)),
        ch = cw * 1.32;
      tiles.forEach((t, i) => {
        const c = i % C,
          r = Math.floor(i / C);
        t._bx = c * cw + (r % 2 ? cw * 0.5 : 0);
        t._by = r * ch + (+t.dataset.oy || 0);
        t.style.width = cw * 0.78 + "px";
      });
      return { vp, tiles, cw, ch, W: C * cw, H: R * ch };
    },
    setup({ g, $, $$, on, finePointer }) {
      let L = this.layout($, $$);
      if (!L) return;
      on(window, "resize", () => {
        L = this.layout($, $$);
      });
      let x = 0,
        y = 0,
        tx = 0,
        ty = 0,
        drag = false,
        sx = 0,
        sy = 0,
        moved = 0,
        touch = false;
      const wrap = (v, m) => ((v % m) + m) % m;
      const inners = L.tiles.map((t) => $("[data-gtin]", t));
      on(L.vp, "pointerdown", (e) => {
        if (e.button > 0) return;
        drag = true;
        moved = 0;
        sx = e.clientX;
        sy = e.clientY;
        touch = e.pointerType === "touch";
        g.to(inners, { scale: 0.94, duration: 0.4, ease: "power3.out" });
      });
      on(window, "pointermove", (e) => {
        if (!drag) return;
        const dx = e.clientX - sx,
          dy = e.clientY - sy;
        sx = e.clientX;
        sy = e.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        tx += dx * 1.3;
        if (!touch) ty += dy * 1.3;
      });
      const up = () => {
        if (!drag) return;
        drag = false;
        g.to(inners, { scale: 1, duration: 0.7, ease: "expo.out" });
      };
      on(window, "pointerup", up);
      on(window, "pointercancel", up);
      on(
        L.vp,
        "wheel",
        (e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            tx -= e.deltaX;
          }
        },
        { passive: false },
      );
      on(
        L.vp,
        "click",
        (e) => {
          if (e.detail !== 0 && moved > 6) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          const t = e.target.closest("[data-gtile]");
          if (t) open(+t.dataset.i);
        },
        true,
      );
      const tick = () => {
        if (!drag) tx -= 0.35;
        x += (tx - x) * 0.085;
        y += (ty - y) * 0.085;
        const vx = tx - x;
        L.tiles.forEach((t) => {
          const px = wrap(t._bx + x, L.W) - L.cw,
            py = wrap(t._by + y, L.H) - L.ch;
          t.style.transform =
            "translate3d(" +
            px +
            "px," +
            py +
            "px,0) skewX(" +
            Math.max(-6, Math.min(6, vx * -0.02)) +
            "deg)";
        });
      };
      g.ticker.add(tick);
      this.destroy = () => g.ticker.remove(tick);

      // filters (dim non-matching tiles; no re-render)
      const chips = $$("[data-gfilter]");
      const setFilter = (cat) => {
        chips.forEach((c) => {
          const on_ = c.dataset.gfilter === cat;
          c.style.background = on_ ? "#F1E6CC" : "transparent";
          c.style.color = on_ ? "#17100A" : "#F1E6CC";
          c.setAttribute("aria-pressed", String(on_));
        });
        L.tiles.forEach((t, i) => {
          const m = cat === "All" || t.dataset.cat === cat;
          g.to(inners[i], {
            opacity: m ? 1 : 0.1,
            filter: m ? "grayscale(0)" : "grayscale(1)",
            duration: 0.6,
          });
          t.style.pointerEvents = m ? "auto" : "none";
        });
      };
      chips.forEach((c) => on(c, "click", () => setFilter(c.dataset.gfilter)));
      setFilter("All");

      // lightbox
      const lb = $("[data-lb]"),
        img = $("[data-lbimg]"),
        ttl = $("[data-lbtitle]"),
        cap = $("[data-lbcat]"),
        idx = $("[data-lbidx]");
      let cur = -1;
      const visible = () =>
        L.tiles.filter((t) => t.style.pointerEvents !== "none");
      const fill = (i) => {
        const t = L.tiles[i];
        cur = i;
        img.style.backgroundSize = t.dataset.size;
        img.style.backgroundPosition = t.dataset.pos;
        ttl.textContent = t.dataset.title;
        cap.textContent = t.dataset.catlabel || t.dataset.cat;
        idx.textContent =
          t.dataset.n + " / " + String(L.tiles.length).padStart(2, "0");
      };
      function open(i) {
        fill(i);
        Site.current && Site.current.lenis.stop();
        g.set(lb, { visibility: "visible", pointerEvents: "auto" });
        g.timeline()
          .fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 0.4 })
          .fromTo(
            "[data-lbframe]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" },
            0,
          )
          .fromTo(
            img,
            { scale: 1.3 },
            { scale: 1, duration: 1.4, ease: "expo.out" },
            0.2,
          )
          .fromTo(
            "[data-lbtext] > *",
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.8,
              ease: "power3.out",
            },
            0.5,
          );
      }
      const close = () => {
        if (cur < 0) return;
        cur = -1;
        g.to(lb, {
          opacity: 0,
          duration: 0.4,
          onComplete: () =>
            g.set(lb, { visibility: "hidden", pointerEvents: "none" }),
        });
        Site.current && Site.current.lenis.start();
      };
      const step = (d) => {
        const v = visible();
        const k = v.indexOf(L.tiles[cur]);
        const nt = v[(k + d + v.length) % v.length];
        g.to(img, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            fill(+nt.dataset.i);
            g.fromTo(
              img,
              { opacity: 0, scale: 1.1 },
              { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" },
            );
          },
        });
      };
      on($("[data-lbclose]"), "click", close);
      on($("[data-lbprev]"), "click", () => step(-1));
      on($("[data-lbnext]"), "click", () => step(1));
      on(window, "keydown", (e) => {
        if (cur < 0) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      });
    },
    staticSetup({ $, $$ }) {
      const L = this.layout($, $$);
      if (!L) return;
      L.tiles.forEach((t) => {
        t.style.transform = "translate3d(" + t._bx + "px," + t._by + "px,0)";
      });
      L.vp.style.height = L.H + "px";
    },
  };
})();
