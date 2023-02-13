function lib(e) {
  return (
    $(function () {
      e.init && e.init();
    }),
    e
  );
}
!(function (e, t) {
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (E, t) {
  function s(e) {
    var t = !!e && "length" in e && e.length,
      n = me.type(e);
    return (
      "function" !== n &&
      !me.isWindow(e) &&
      ("array" === n ||
        0 === t ||
        ("number" == typeof t && 0 < t && t - 1 in e))
    );
  }
  function n(e, n, i) {
    if (me.isFunction(n))
      return me.grep(e, function (e, t) {
        return !!n.call(e, t, e) !== i;
      });
    if (n.nodeType)
      return me.grep(e, function (e) {
        return (e === n) !== i;
      });
    if ("string" == typeof n) {
      if (Ce.test(n)) return me.filter(n, e, i);
      n = me.filter(n, e);
    }
    return me.grep(e, function (e) {
      return -1 < me.inArray(e, n) !== i;
    });
  }
  function i(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType; );
    return e;
  }
  function u(e) {
    var n = {};
    return (
      me.each(e.match(Pe) || [], function (e, t) {
        n[t] = !0;
      }),
      n
    );
  }
  function r() {
    oe.addEventListener
      ? (oe.removeEventListener("DOMContentLoaded", o),
        E.removeEventListener("load", o))
      : (oe.detachEvent("onreadystatechange", o), E.detachEvent("onload", o));
  }
  function o() {
    (oe.addEventListener ||
      "load" === E.event.type ||
      "complete" === oe.readyState) &&
      (r(), me.ready());
  }
  function l(t, n, i) {
    if (i === undefined && 1 === t.nodeType) {
      var r = "data-" + n.replace(Re, "-$1").toLowerCase();
      if ("string" == typeof (i = t.getAttribute(r))) {
        try {
          i =
            "true" === i ||
            ("false" !== i &&
              ("null" === i
                ? null
                : +i + "" === i
                ? +i
                : Oe.test(i)
                ? me.parseJSON(i)
                : i));
        } catch (e) {}
        me.data(t, n, i);
      } else i = undefined;
    }
    return i;
  }
  function c(e) {
    var t;
    for (t in e)
      if (("data" !== t || !me.isEmptyObject(e[t])) && "toJSON" !== t)
        return !1;
    return !0;
  }
  function a(e, t, n, i) {
    if (Fe(e)) {
      var r,
        o,
        a = me.expando,
        s = e.nodeType,
        l = s ? me.cache : e,
        c = s ? e[a] : e[a] && a;
      if (
        (c && l[c] && (i || l[c].data)) ||
        n !== undefined ||
        "string" != typeof t
      )
        return (
          c || (c = s ? (e[a] = re.pop() || me.guid++) : a),
          l[c] || (l[c] = s ? {} : { toJSON: me.noop }),
          ("object" != typeof t && "function" != typeof t) ||
            (i
              ? (l[c] = me.extend(l[c], t))
              : (l[c].data = me.extend(l[c].data, t))),
          (o = l[c]),
          i || (o.data || (o.data = {}), (o = o.data)),
          n !== undefined && (o[me.camelCase(t)] = n),
          "string" == typeof t
            ? null == (r = o[t]) && (r = o[me.camelCase(t)])
            : (r = o),
          r
        );
    }
  }
  function h(e, t, n) {
    if (Fe(e)) {
      var i,
        r,
        o = e.nodeType,
        a = o ? me.cache : e,
        s = o ? e[me.expando] : me.expando;
      if (a[s]) {
        if (t && (i = n ? a[s] : a[s].data)) {
          r = (t = me.isArray(t)
            ? t.concat(me.map(t, me.camelCase))
            : t in i
            ? [t]
            : (t = me.camelCase(t)) in i
            ? [t]
            : t.split(" ")).length;
          for (; r--; ) delete i[t[r]];
          if (n ? !c(i) : !me.isEmptyObject(i)) return;
        }
        (n || (delete a[s].data, c(a[s]))) &&
          (o
            ? me.cleanData([e], !0)
            : pe.deleteExpando || a != a.window
            ? delete a[s]
            : (a[s] = undefined));
      }
    }
  }
  function d(e, t, n, i) {
    var r,
      o = 1,
      a = 20,
      s = i
        ? function () {
            return i.cur();
          }
        : function () {
            return me.css(e, t, "");
          },
      l = s(),
      c = (n && n[3]) || (me.cssNumber[t] ? "" : "px"),
      u = (me.cssNumber[t] || ("px" !== c && +l)) && Be.exec(me.css(e, t));
    if (u && u[3] !== c)
      for (
        c = c || u[3], n = n || [], u = +l || 1;
        (u /= o = o || ".5"),
          me.style(e, t, u + c),
          o !== (o = s() / l) && 1 !== o && --a;

      );
    return (
      n &&
        ((u = +u || +l || 0),
        (r = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
        i && ((i.unit = c), (i.start = u), (i.end = r))),
      r
    );
  }
  function g(e) {
    var t = Ge.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement) for (; t.length; ) n.createElement(t.pop());
    return n;
  }
  function v(e, t) {
    var n,
      i,
      r = 0,
      o =
        "undefined" != typeof e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : "undefined" != typeof e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : undefined;
    if (!o)
      for (o = [], n = e.childNodes || e; null != (i = n[r]); r++)
        !t || me.nodeName(i, t) ? o.push(i) : me.merge(o, v(i, t));
    return t === undefined || (t && me.nodeName(e, t)) ? me.merge([e], o) : o;
  }
  function y(e, t) {
    for (var n, i = 0; null != (n = e[i]); i++)
      me._data(n, "globalEval", !t || me._data(t[i], "globalEval"));
  }
  function b(e) {
    We.test(e.type) && (e.defaultChecked = e.checked);
  }
  function m(e, t, n, i, r) {
    for (
      var o, a, s, l, c, u, h, d = e.length, p = g(t), f = [], m = 0;
      m < d;
      m++
    )
      if ((a = e[m]) || 0 === a)
        if ("object" === me.type(a)) me.merge(f, a.nodeType ? [a] : a);
        else if (Qe.test(a)) {
          for (
            l = l || p.appendChild(t.createElement("div")),
              c = (Ve.exec(a) || ["", ""])[1].toLowerCase(),
              h = Ke[c] || Ke._default,
              l.innerHTML = h[1] + me.htmlPrefilter(a) + h[2],
              o = h[0];
            o--;

          )
            l = l.lastChild;
          if (
            (!pe.leadingWhitespace &&
              Xe.test(a) &&
              f.push(t.createTextNode(Xe.exec(a)[0])),
            !pe.tbody)
          )
            for (
              o =
                (a =
                  "table" !== c || Ye.test(a)
                    ? "<table>" !== h[1] || Ye.test(a)
                      ? 0
                      : l
                    : l.firstChild) && a.childNodes.length;
              o--;

            )
              me.nodeName((u = a.childNodes[o]), "tbody") &&
                !u.childNodes.length &&
                a.removeChild(u);
          for (me.merge(f, l.childNodes), l.textContent = ""; l.firstChild; )
            l.removeChild(l.firstChild);
          l = p.lastChild;
        } else f.push(t.createTextNode(a));
    for (
      l && p.removeChild(l),
        pe.appendChecked || me.grep(v(f, "input"), b),
        m = 0;
      (a = f[m++]);

    )
      if (i && -1 < me.inArray(a, i)) r && r.push(a);
      else if (
        ((s = me.contains(a.ownerDocument, a)),
        (l = v(p.appendChild(a), "script")),
        s && y(l),
        n)
      )
        for (o = 0; (a = l[o++]); ) Je.test(a.type || "") && n.push(a);
    return (l = null), p;
  }
  function p() {
    return !0;
  }
  function f() {
    return !1;
  }
  function w() {
    try {
      return oe.activeElement;
    } catch (e) {}
  }
  function x(e, t, n, i, r, o) {
    var a, s;
    if ("object" == typeof t) {
      for (s in ("string" != typeof n && ((i = i || n), (n = undefined)), t))
        x(e, s, n, i, t[s], o);
      return e;
    }
    if (
      (null == i && null == r
        ? ((r = n), (i = n = undefined))
        : null == r &&
          ("string" == typeof n
            ? ((r = i), (i = undefined))
            : ((r = i), (i = n), (n = undefined))),
      !1 === r)
    )
      r = f;
    else if (!r) return e;
    return (
      1 === o &&
        ((a = r),
        ((r = function (e) {
          return me().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = me.guid++))),
      e.each(function () {
        me.event.add(this, t, r, i, n);
      })
    );
  }
  function S(e, t) {
    return me.nodeName(e, "table") &&
      me.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr")
      ? e.getElementsByTagName("tbody")[0] ||
          e.appendChild(e.ownerDocument.createElement("tbody"))
      : e;
  }
  function C(e) {
    return (e.type = (null !== me.find.attr(e, "type")) + "/" + e.type), e;
  }
  function k(e) {
    var t = ct.exec(e.type);
    return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
  }
  function T(e, t) {
    if (1 === t.nodeType && me.hasData(e)) {
      var n,
        i,
        r,
        o = me._data(e),
        a = me._data(t, o),
        s = o.events;
      if (s)
        for (n in (delete a.handle, (a.events = {}), s))
          for (i = 0, r = s[n].length; i < r; i++) me.event.add(t, n, s[n][i]);
      a.data && (a.data = me.extend({}, a.data));
    }
  }
  function A(e, t) {
    var n, i, r;
    if (1 === t.nodeType) {
      if (((n = t.nodeName.toLowerCase()), !pe.noCloneEvent && t[me.expando])) {
        for (i in (r = me._data(t)).events) me.removeEvent(t, i, r.handle);
        t.removeAttribute(me.expando);
      }
      "script" === n && t.text !== e.text
        ? ((C(t).text = e.text), k(t))
        : "object" === n
        ? (t.parentNode && (t.outerHTML = e.outerHTML),
          pe.html5Clone &&
            e.innerHTML &&
            !me.trim(t.innerHTML) &&
            (t.innerHTML = e.innerHTML))
        : "input" === n && We.test(e.type)
        ? ((t.defaultChecked = t.checked = e.checked),
          t.value !== e.value && (t.value = e.value))
        : "option" === n
        ? (t.defaultSelected = t.selected = e.defaultSelected)
        : ("input" !== n && "textarea" !== n) ||
          (t.defaultValue = e.defaultValue);
    }
  }
  function N(n, i, r, o) {
    i = se.apply([], i);
    var e,
      t,
      a,
      s,
      l,
      c,
      u = 0,
      h = n.length,
      d = h - 1,
      p = i[0],
      f = me.isFunction(p);
    if (f || (1 < h && "string" == typeof p && !pe.checkClone && lt.test(p)))
      return n.each(function (e) {
        var t = n.eq(e);
        f && (i[0] = p.call(this, e, t.html())), N(t, i, r, o);
      });
    if (
      h &&
      ((e = (c = m(i, n[0].ownerDocument, !1, n, o)).firstChild),
      1 === c.childNodes.length && (c = e),
      e || o)
    ) {
      for (a = (s = me.map(v(c, "script"), C)).length; u < h; u++)
        (t = c),
          u !== d &&
            ((t = me.clone(t, !0, !0)), a && me.merge(s, v(t, "script"))),
          r.call(n[u], t, u);
      if (a)
        for (l = s[s.length - 1].ownerDocument, me.map(s, k), u = 0; u < a; u++)
          (t = s[u]),
            Je.test(t.type || "") &&
              !me._data(t, "globalEval") &&
              me.contains(l, t) &&
              (t.src
                ? me._evalUrl && me._evalUrl(t.src)
                : me.globalEval(
                    (t.text || t.textContent || t.innerHTML || "").replace(
                      ut,
                      ""
                    )
                  ));
      c = e = null;
    }
    return n;
  }
  function j(e, t, n) {
    for (var i, r = t ? me.filter(t, e) : e, o = 0; null != (i = r[o]); o++)
      n || 1 !== i.nodeType || me.cleanData(v(i)),
        i.parentNode &&
          (n && me.contains(i.ownerDocument, i) && y(v(i, "script")),
          i.parentNode.removeChild(i));
    return e;
  }
  function D(e, t) {
    var n = me(t.createElement(e)).appendTo(t.body),
      i = me.css(n[0], "display");
    return n.detach(), i;
  }
  function P(e) {
    var t = oe,
      n = pt[e];
    return (
      n ||
        (("none" !== (n = D(e, t)) && n) ||
          ((t = (
            (dt = (
              dt || me("<iframe frameborder='0' width='0' height='0'/>")
            ).appendTo(t.documentElement))[0].contentWindow ||
            dt[0].contentDocument
          ).document).write(),
          t.close(),
          (n = D(e, t)),
          dt.detach()),
        (pt[e] = n)),
      n
    );
  }
  function L(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  function F(e) {
    if (e in At) return e;
    for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Tt.length; n--; )
      if ((e = Tt[n] + t) in At) return e;
  }
  function O(e, t) {
    for (var n, i, r, o = [], a = 0, s = e.length; a < s; a++)
      (i = e[a]).style &&
        ((o[a] = me._data(i, "olddisplay")),
        (n = i.style.display),
        t
          ? (o[a] || "none" !== n || (i.style.display = ""),
            "" === i.style.display &&
              Ue(i) &&
              (o[a] = me._data(i, "olddisplay", P(i.nodeName))))
          : ((r = Ue(i)),
            ((n && "none" !== n) || !r) &&
              me._data(i, "olddisplay", r ? n : me.css(i, "display"))));
    for (a = 0; a < s; a++)
      (i = e[a]).style &&
        ((t && "none" !== i.style.display && "" !== i.style.display) ||
          (i.style.display = t ? o[a] || "" : "none"));
    return e;
  }
  function R(e, t, n) {
    var i = St.exec(t);
    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
  }
  function I(e, t, n, i, r) {
    for (
      var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
        a = 0;
      o < 4;
      o += 2
    )
      "margin" === n && (a += me.css(e, n + qe[o], !0, r)),
        i
          ? ("content" === n && (a -= me.css(e, "padding" + qe[o], !0, r)),
            "margin" !== n &&
              (a -= me.css(e, "border" + qe[o] + "Width", !0, r)))
          : ((a += me.css(e, "padding" + qe[o], !0, r)),
            "padding" !== n &&
              (a += me.css(e, "border" + qe[o] + "Width", !0, r)));
    return a;
  }
  function $(e, t, n) {
    var i = !0,
      r = "width" === t ? e.offsetWidth : e.offsetHeight,
      o = yt(e),
      a = pe.boxSizing && "border-box" === me.css(e, "boxSizing", !1, o);
    if (r <= 0 || null == r) {
      if (
        (((r = bt(e, t, o)) < 0 || null == r) && (r = e.style[t]), mt.test(r))
      )
        return r;
      (i = a && (pe.boxSizingReliable() || r === e.style[t])),
        (r = parseFloat(r) || 0);
    }
    return r + I(e, t, n || (a ? "border" : "content"), i, o) + "px";
  }
  function M(e, t, n, i, r) {
    return new M.prototype.init(e, t, n, i, r);
  }
  function H() {
    return (
      E.setTimeout(function () {
        Nt = undefined;
      }),
      (Nt = me.now())
    );
  }
  function B(e, t) {
    var n,
      i = { height: e },
      r = 0;
    for (t = t ? 1 : 0; r < 4; r += 2 - t)
      i["margin" + (n = qe[r])] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function q(e, t, n) {
    for (
      var i,
        r = (W.tweeners[t] || []).concat(W.tweeners["*"]),
        o = 0,
        a = r.length;
      o < a;
      o++
    )
      if ((i = r[o].call(n, t, e))) return i;
  }
  function U(t, e, n) {
    var i,
      r,
      o,
      a,
      s,
      l,
      c,
      u = this,
      h = {},
      d = t.style,
      p = t.nodeType && Ue(t),
      f = me._data(t, "fxshow");
    for (i in (n.queue ||
      (null == (s = me._queueHooks(t, "fx")).unqueued &&
        ((s.unqueued = 0),
        (l = s.empty.fire),
        (s.empty.fire = function () {
          s.unqueued || l();
        })),
      s.unqueued++,
      u.always(function () {
        u.always(function () {
          s.unqueued--, me.queue(t, "fx").length || s.empty.fire();
        });
      })),
    1 === t.nodeType &&
      ("height" in e || "width" in e) &&
      ((n.overflow = [d.overflow, d.overflowX, d.overflowY]),
      "inline" ===
        ("none" === (c = me.css(t, "display"))
          ? me._data(t, "olddisplay") || P(t.nodeName)
          : c) &&
        "none" === me.css(t, "float") &&
        (pe.inlineBlockNeedsLayout && "inline" !== P(t.nodeName)
          ? (d.zoom = 1)
          : (d.display = "inline-block"))),
    n.overflow &&
      ((d.overflow = "hidden"),
      pe.shrinkWrapBlocks() ||
        u.always(function () {
          (d.overflow = n.overflow[0]),
            (d.overflowX = n.overflow[1]),
            (d.overflowY = n.overflow[2]);
        })),
    e))
      if (((r = e[i]), Rt.exec(r))) {
        if (
          (delete e[i], (o = o || "toggle" === r), r === (p ? "hide" : "show"))
        ) {
          if ("show" !== r || !f || f[i] === undefined) continue;
          p = !0;
        }
        h[i] = (f && f[i]) || me.style(t, i);
      } else c = undefined;
    if (me.isEmptyObject(h))
      "inline" === ("none" === c ? P(t.nodeName) : c) && (d.display = c);
    else
      for (i in (f
        ? "hidden" in f && (p = f.hidden)
        : (f = me._data(t, "fxshow", {})),
      o && (f.hidden = !p),
      p
        ? me(t).show()
        : u.done(function () {
            me(t).hide();
          }),
      u.done(function () {
        var e;
        for (e in (me._removeData(t, "fxshow"), h)) me.style(t, e, h[e]);
      }),
      h))
        (a = q(p ? f[i] : 0, i, u)),
          i in f ||
            ((f[i] = a.start),
            p &&
              ((a.end = a.start),
              (a.start = "width" === i || "height" === i ? 1 : 0)));
  }
  function z(e, t) {
    var n, i, r, o, a;
    for (n in e)
      if (
        ((r = t[(i = me.camelCase(n))]),
        (o = e[n]),
        me.isArray(o) && ((r = o[1]), (o = e[n] = o[0])),
        n !== i && ((e[i] = o), delete e[n]),
        (a = me.cssHooks[i]) && "expand" in a)
      )
        for (n in ((o = a.expand(o)), delete e[i], o))
          n in e || ((e[n] = o[n]), (t[n] = r));
      else t[i] = r;
  }
  function W(o, e, t) {
    var n,
      a,
      i = 0,
      r = W.prefilters.length,
      s = me.Deferred().always(function () {
        delete l.elem;
      }),
      l = function () {
        if (a) return !1;
        for (
          var e = Nt || H(),
            t = Math.max(0, c.startTime + c.duration - e),
            n = 1 - (t / c.duration || 0),
            i = 0,
            r = c.tweens.length;
          i < r;
          i++
        )
          c.tweens[i].run(n);
        return (
          s.notifyWith(o, [c, n, t]),
          n < 1 && r ? t : (s.resolveWith(o, [c]), !1)
        );
      },
      c = s.promise({
        elem: o,
        props: me.extend({}, e),
        opts: me.extend(
          !0,
          { specialEasing: {}, easing: me.easing._default },
          t
        ),
        originalProperties: e,
        originalOptions: t,
        startTime: Nt || H(),
        duration: t.duration,
        tweens: [],
        createTween: function (e, t) {
          var n = me.Tween(
            o,
            c.opts,
            e,
            t,
            c.opts.specialEasing[e] || c.opts.easing
          );
          return c.tweens.push(n), n;
        },
        stop: function (e) {
          var t = 0,
            n = e ? c.tweens.length : 0;
          if (a) return this;
          for (a = !0; t < n; t++) c.tweens[t].run(1);
          return (
            e
              ? (s.notifyWith(o, [c, 1, 0]), s.resolveWith(o, [c, e]))
              : s.rejectWith(o, [c, e]),
            this
          );
        },
      }),
      u = c.props;
    for (z(u, c.opts.specialEasing); i < r; i++)
      if ((n = W.prefilters[i].call(c, o, u, c.opts)))
        return (
          me.isFunction(n.stop) &&
            (me._queueHooks(c.elem, c.opts.queue).stop = me.proxy(n.stop, n)),
          n
        );
    return (
      me.map(u, q, c),
      me.isFunction(c.opts.start) && c.opts.start.call(o, c),
      me.fx.timer(me.extend(l, { elem: o, anim: c, queue: c.opts.queue })),
      c
        .progress(c.opts.progress)
        .done(c.opts.done, c.opts.complete)
        .fail(c.opts.fail)
        .always(c.opts.always)
    );
  }
  function V(e) {
    return me.attr(e, "class") || "";
  }
  function J(o) {
    return function (e, t) {
      "string" != typeof e && ((t = e), (e = "*"));
      var n,
        i = 0,
        r = e.toLowerCase().match(Pe) || [];
      if (me.isFunction(t))
        for (; (n = r[i++]); )
          "+" === n.charAt(0)
            ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t))
            : (o[n] = o[n] || []).push(t);
    };
  }
  function X(t, r, o, a) {
    function s(e) {
      var i;
      return (
        (l[e] = !0),
        me.each(t[e] || [], function (e, t) {
          var n = t(r, o, a);
          return "string" != typeof n || c || l[n]
            ? c
              ? !(i = n)
              : void 0
            : (r.dataTypes.unshift(n), s(n), !1);
        }),
        i
      );
    }
    var l = {},
      c = t === ln;
    return s(r.dataTypes[0]) || (!l["*"] && s("*"));
  }
  function G(e, t) {
    var n,
      i,
      r = me.ajaxSettings.flatOptions || {};
    for (i in t) t[i] !== undefined && ((r[i] ? e : n || (n = {}))[i] = t[i]);
    return n && me.extend(!0, e, n), e;
  }
  function K(e, t, n) {
    for (var i, r, o, a, s = e.contents, l = e.dataTypes; "*" === l[0]; )
      l.shift(),
        r === undefined &&
          (r = e.mimeType || t.getResponseHeader("Content-Type"));
    if (r)
      for (a in s)
        if (s[a] && s[a].test(r)) {
          l.unshift(a);
          break;
        }
    if (l[0] in n) o = l[0];
    else {
      for (a in n) {
        if (!l[0] || e.converters[a + " " + l[0]]) {
          o = a;
          break;
        }
        i || (i = a);
      }
      o = o || i;
    }
    if (o) return o !== l[0] && l.unshift(o), n[o];
  }
  function Q(t, n, i, r) {
    var o,
      a,
      s,
      l,
      c,
      u = {},
      h = t.dataTypes.slice();
    if (h[1]) for (s in t.converters) u[s.toLowerCase()] = t.converters[s];
    for (a = h.shift(); a; )
      if (
        (t.responseFields[a] && (i[t.responseFields[a]] = n),
        !c && r && t.dataFilter && (n = t.dataFilter(n, t.dataType)),
        (c = a),
        (a = h.shift()))
      )
        if ("*" === a) a = c;
        else if ("*" !== c && c !== a) {
          if (!(s = u[c + " " + a] || u["* " + a]))
            for (o in u)
              if (
                (l = o.split(" "))[1] === a &&
                (s = u[c + " " + l[0]] || u["* " + l[0]])
              ) {
                !0 === s
                  ? (s = u[o])
                  : !0 !== u[o] && ((a = l[0]), h.unshift(l[1]));
                break;
              }
          if (!0 !== s)
            if (s && t["throws"]) n = s(n);
            else
              try {
                n = s(n);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: s ? e : "No conversion from " + c + " to " + a,
                };
              }
        }
    return { state: "success", data: n };
  }
  function Y(e) {
    return (e.style && e.style.display) || me.css(e, "display");
  }
  function Z(e) {
    if (!me.contains(e.ownerDocument || oe, e)) return !0;
    for (; e && 1 === e.nodeType; ) {
      if ("none" === Y(e) || "hidden" === e.type) return !0;
      e = e.parentNode;
    }
    return !1;
  }
  function ee(n, e, i, r) {
    var t;
    if (me.isArray(e))
      me.each(e, function (e, t) {
        i || pn.test(n)
          ? r(n, t)
          : ee(
              n + "[" + ("object" == typeof t && null != t ? e : "") + "]",
              t,
              i,
              r
            );
      });
    else if (i || "object" !== me.type(e)) r(n, e);
    else for (t in e) ee(n + "[" + t + "]", e[t], i, r);
  }
  function te() {
    try {
      return new E.XMLHttpRequest();
    } catch (e) {}
  }
  function ne() {
    try {
      return new E.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }
  function ie(e) {
    return me.isWindow(e)
      ? e
      : 9 === e.nodeType && (e.defaultView || e.parentWindow);
  }
  var re = [],
    oe = E.document,
    ae = re.slice,
    se = re.concat,
    le = re.push,
    ce = re.indexOf,
    ue = {},
    he = ue.toString,
    de = ue.hasOwnProperty,
    pe = {},
    fe = "1.12.4",
    me = function (e, t) {
      return new me.fn.init(e, t);
    },
    ge = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    ve = /^-ms-/,
    ye = /-([\da-z])/gi,
    be = function (e, t) {
      return t.toUpperCase();
    };
  (me.fn = me.prototype =
    {
      jquery: fe,
      constructor: me,
      selector: "",
      length: 0,
      toArray: function () {
        return ae.call(this);
      },
      get: function (e) {
        return null != e
          ? e < 0
            ? this[e + this.length]
            : this[e]
          : ae.call(this);
      },
      pushStack: function (e) {
        var t = me.merge(this.constructor(), e);
        return (t.prevObject = this), (t.context = this.context), t;
      },
      each: function (e) {
        return me.each(this, e);
      },
      map: function (n) {
        return this.pushStack(
          me.map(this, function (e, t) {
            return n.call(e, t, e);
          })
        );
      },
      slice: function () {
        return this.pushStack(ae.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (e < 0 ? t : 0);
        return this.pushStack(0 <= n && n < t ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: le,
      sort: re.sort,
      splice: re.splice,
    }),
    (me.extend = me.fn.extend =
      function (e) {
        var t,
          n,
          i,
          r,
          o,
          a,
          s = e || {},
          l = 1,
          c = arguments.length,
          u = !1;
        for (
          "boolean" == typeof s && ((u = s), (s = arguments[l] || {}), l++),
            "object" == typeof s || me.isFunction(s) || (s = {}),
            l === c && ((s = this), l--);
          l < c;
          l++
        )
          if (null != (o = arguments[l]))
            for (r in o)
              (t = s[r]),
                s !== (i = o[r]) &&
                  (u && i && (me.isPlainObject(i) || (n = me.isArray(i)))
                    ? (n
                        ? ((n = !1), (a = t && me.isArray(t) ? t : []))
                        : (a = t && me.isPlainObject(t) ? t : {}),
                      (s[r] = me.extend(u, a, i)))
                    : i !== undefined && (s[r] = i));
        return s;
      }),
    me.extend({
      expando: "jQuery" + (fe + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isFunction: function (e) {
        return "function" === me.type(e);
      },
      isArray:
        Array.isArray ||
        function (e) {
          return "array" === me.type(e);
        },
      isWindow: function (e) {
        return null != e && e == e.window;
      },
      isNumeric: function (e) {
        var t = e && e.toString();
        return !me.isArray(e) && 0 <= t - parseFloat(t) + 1;
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      isPlainObject: function (t) {
        var n;
        if (!t || "object" !== me.type(t) || t.nodeType || me.isWindow(t))
          return !1;
        try {
          if (
            t.constructor &&
            !de.call(t, "constructor") &&
            !de.call(t.constructor.prototype, "isPrototypeOf")
          )
            return !1;
        } catch (e) {
          return !1;
        }
        if (!pe.ownFirst) for (n in t) return de.call(t, n);
        for (n in t);
        return n === undefined || de.call(t, n);
      },
      type: function (e) {
        return null == e
          ? e + ""
          : "object" == typeof e || "function" == typeof e
          ? ue[he.call(e)] || "object"
          : typeof e;
      },
      globalEval: function (e) {
        e &&
          me.trim(e) &&
          (
            E.execScript ||
            function (e) {
              E.eval.call(E, e);
            }
          )(e);
      },
      camelCase: function (e) {
        return e.replace(ve, "ms-").replace(ye, be);
      },
      nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      },
      each: function (e, t) {
        var n,
          i = 0;
        if (s(e))
          for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
        else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
        return e;
      },
      trim: function (e) {
        return null == e ? "" : (e + "").replace(ge, "");
      },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (s(Object(e))
              ? me.merge(n, "string" == typeof e ? [e] : e)
              : le.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        var i;
        if (t) {
          if (ce) return ce.call(t, e, n);
          for (
            i = t.length, n = n ? (n < 0 ? Math.max(0, i + n) : n) : 0;
            n < i;
            n++
          )
            if (n in t && t[n] === e) return n;
        }
        return -1;
      },
      merge: function (e, t) {
        for (var n = +t.length, i = 0, r = e.length; i < n; ) e[r++] = t[i++];
        if (n != n) for (; t[i] !== undefined; ) e[r++] = t[i++];
        return (e.length = r), e;
      },
      grep: function (e, t, n) {
        for (var i = [], r = 0, o = e.length, a = !n; r < o; r++)
          !t(e[r], r) !== a && i.push(e[r]);
        return i;
      },
      map: function (e, t, n) {
        var i,
          r,
          o = 0,
          a = [];
        if (s(e))
          for (i = e.length; o < i; o++)
            null != (r = t(e[o], o, n)) && a.push(r);
        else for (o in e) null != (r = t(e[o], o, n)) && a.push(r);
        return se.apply([], a);
      },
      guid: 1,
      proxy: function (e, t) {
        var n, i, r;
        return (
          "string" == typeof t && ((r = e[t]), (t = e), (e = r)),
          me.isFunction(e)
            ? ((n = ae.call(arguments, 2)),
              ((i = function () {
                return e.apply(t || this, n.concat(ae.call(arguments)));
              }).guid = e.guid =
                e.guid || me.guid++),
              i)
            : undefined
        );
      },
      now: function () {
        return +new Date();
      },
      support: pe,
    }),
    "function" == typeof Symbol &&
      (me.fn[Symbol.iterator] = re[Symbol.iterator]),
    me.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (e, t) {
        ue["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var we = (function (n) {
    function w(e, t, n, i) {
      var r,
        o,
        a,
        s,
        l,
        c,
        u,
        h,
        d = t && t.ownerDocument,
        p = t ? t.nodeType : 9;
      if (
        ((n = n || []),
        "string" != typeof e || !e || (1 !== p && 9 !== p && 11 !== p))
      )
        return n;
      if (
        !i &&
        ((t ? t.ownerDocument || t : B) !== L && P(t), (t = t || L), O)
      ) {
        if (11 !== p && (c = ye.exec(e)))
          if ((r = c[1])) {
            if (9 === p) {
              if (!(a = t.getElementById(r))) return n;
              if (a.id === r) return n.push(a), n;
            } else if (d && (a = d.getElementById(r)) && M(t, a) && a.id === r)
              return n.push(a), n;
          } else {
            if (c[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
            if (
              (r = c[3]) &&
              _.getElementsByClassName &&
              t.getElementsByClassName
            )
              return Z.apply(n, t.getElementsByClassName(r)), n;
          }
        if (_.qsa && !V[e + " "] && (!R || !R.test(e))) {
          if (1 !== p) (d = t), (h = e);
          else if ("object" !== t.nodeName.toLowerCase()) {
            for (
              (s = t.getAttribute("id"))
                ? (s = s.replace(we, "\\$&"))
                : t.setAttribute("id", (s = H)),
                o = (u = k(e)).length,
                l = pe.test(s) ? "#" + s : "[id='" + s + "']";
              o--;

            )
              u[o] = l + " " + g(u[o]);
            (h = u.join(",")), (d = (be.test(e) && m(t.parentNode)) || t);
          }
          if (h)
            try {
              return Z.apply(n, d.querySelectorAll(h)), n;
            } catch (f) {
            } finally {
              s === H && t.removeAttribute("id");
            }
        }
      }
      return A(e.replace(le, "$1"), t, n, i);
    }
    function t() {
      function n(e, t) {
        return (
          i.push(e + " ") > E.cacheLength && delete n[i.shift()],
          (n[e + " "] = t)
        );
      }
      var i = [];
      return n;
    }
    function l(e) {
      return (e[H] = !0), e;
    }
    function r(t) {
      var n = L.createElement("div");
      try {
        return !!t(n);
      } catch (e) {
        return !1;
      } finally {
        n.parentNode && n.parentNode.removeChild(n), (n = null);
      }
    }
    function i(e, t) {
      for (var n = e.split("|"), i = n.length; i--; ) E.attrHandle[n[i]] = t;
    }
    function c(e, t) {
      var n = t && e,
        i =
          n &&
          1 === e.nodeType &&
          1 === t.nodeType &&
          (~t.sourceIndex || X) - (~e.sourceIndex || X);
      if (i) return i;
      if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
      return e ? 1 : -1;
    }
    function o(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }
    function a(n) {
      return function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t || "button" === t) && e.type === n;
      };
    }
    function s(a) {
      return l(function (o) {
        return (
          (o = +o),
          l(function (e, t) {
            for (var n, i = a([], e.length, o), r = i.length; r--; )
              e[(n = i[r])] && (e[n] = !(t[n] = e[n]));
          })
        );
      });
    }
    function m(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }
    function u() {}
    function g(e) {
      for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
      return i;
    }
    function h(s, e, t) {
      var l = e.dir,
        c = t && "parentNode" === l,
        u = U++;
      return e.first
        ? function (e, t, n) {
            for (; (e = e[l]); ) if (1 === e.nodeType || c) return s(e, t, n);
          }
        : function (e, t, n) {
            var i,
              r,
              o,
              a = [q, u];
            if (n) {
              for (; (e = e[l]); )
                if ((1 === e.nodeType || c) && s(e, t, n)) return !0;
            } else
              for (; (e = e[l]); )
                if (1 === e.nodeType || c) {
                  if (
                    (i = (r =
                      (o = e[H] || (e[H] = {}))[e.uniqueID] ||
                      (o[e.uniqueID] = {}))[l]) &&
                    i[0] === q &&
                    i[1] === u
                  )
                    return (a[2] = i[2]);
                  if (((r[l] = a)[2] = s(e, t, n))) return !0;
                }
          };
    }
    function d(r) {
      return 1 < r.length
        ? function (e, t, n) {
            for (var i = r.length; i--; ) if (!r[i](e, t, n)) return !1;
            return !0;
          }
        : r[0];
    }
    function y(e, t, n) {
      for (var i = 0, r = t.length; i < r; i++) w(e, t[i], n);
      return n;
    }
    function x(e, t, n, i, r) {
      for (var o, a = [], s = 0, l = e.length, c = null != t; s < l; s++)
        (o = e[s]) && ((n && !n(o, i, r)) || (a.push(o), c && t.push(s)));
      return a;
    }
    function b(p, f, m, g, v, e) {
      return (
        g && !g[H] && (g = b(g)),
        v && !v[H] && (v = b(v, e)),
        l(function (e, t, n, i) {
          var r,
            o,
            a,
            s = [],
            l = [],
            c = t.length,
            u = e || y(f || "*", n.nodeType ? [n] : n, []),
            h = !p || (!e && f) ? u : x(u, s, p, n, i),
            d = m ? (v || (e ? p : c || g) ? [] : t) : h;
          if ((m && m(h, d, n, i), g))
            for (r = x(d, l), g(r, [], n, i), o = r.length; o--; )
              (a = r[o]) && (d[l[o]] = !(h[l[o]] = a));
          if (e) {
            if (v || p) {
              if (v) {
                for (r = [], o = d.length; o--; )
                  (a = d[o]) && r.push((h[o] = a));
                v(null, (d = []), r, i);
              }
              for (o = d.length; o--; )
                (a = d[o]) &&
                  -1 < (r = v ? te(e, a) : s[o]) &&
                  (e[r] = !(t[r] = a));
            }
          } else (d = x(d === t ? d.splice(c, d.length) : d)), v ? v(null, t, d, i) : Z.apply(t, d);
        })
      );
    }
    function p(e) {
      for (
        var r,
          t,
          n,
          i = e.length,
          o = E.relative[e[0].type],
          a = o || E.relative[" "],
          s = o ? 1 : 0,
          l = h(
            function (e) {
              return e === r;
            },
            a,
            !0
          ),
          c = h(
            function (e) {
              return -1 < te(r, e);
            },
            a,
            !0
          ),
          u = [
            function (e, t, n) {
              var i =
                (!o && (n || t !== N)) ||
                ((r = t).nodeType ? l(e, t, n) : c(e, t, n));
              return (r = null), i;
            },
          ];
        s < i;
        s++
      )
        if ((t = E.relative[e[s].type])) u = [h(d(u), t)];
        else {
          if ((t = E.filter[e[s].type].apply(null, e[s].matches))[H]) {
            for (n = ++s; n < i && !E.relative[e[n].type]; n++);
            return b(
              1 < s && d(u),
              1 < s &&
                g(
                  e
                    .slice(0, s - 1)
                    .concat({ value: " " === e[s - 2].type ? "*" : "" })
                ).replace(le, "$1"),
              t,
              s < n && p(e.slice(s, n)),
              n < i && p((e = e.slice(n))),
              n < i && g(e)
            );
          }
          u.push(t);
        }
      return d(u);
    }
    function f(g, v) {
      var y = 0 < v.length,
        b = 0 < g.length,
        e = function (e, t, n, i, r) {
          var o,
            a,
            s,
            l = 0,
            c = "0",
            u = e && [],
            h = [],
            d = N,
            p = e || (b && E.find.TAG("*", r)),
            f = (q += null == d ? 1 : Math.random() || 0.1),
            m = p.length;
          for (
            r && (N = t === L || t || r);
            c !== m && null != (o = p[c]);
            c++
          ) {
            if (b && o) {
              for (
                a = 0, t || o.ownerDocument === L || (P(o), (n = !O));
                (s = g[a++]);

              )
                if (s(o, t || L, n)) {
                  i.push(o);
                  break;
                }
              r && (q = f);
            }
            y && ((o = !s && o) && l--, e && u.push(o));
          }
          if (((l += c), y && c !== l)) {
            for (a = 0; (s = v[a++]); ) s(u, h, t, n);
            if (e) {
              if (0 < l) for (; c--; ) u[c] || h[c] || (h[c] = Q.call(i));
              h = x(h);
            }
            Z.apply(i, h),
              r && !e && 0 < h.length && 1 < l + v.length && w.uniqueSort(i);
          }
          return r && ((q = f), (N = d)), u;
        };
      return y ? l(e) : e;
    }
    var v,
      _,
      E,
      S,
      C,
      k,
      T,
      A,
      N,
      j,
      D,
      P,
      L,
      F,
      O,
      R,
      I,
      $,
      M,
      H = "sizzle" + 1 * new Date(),
      B = n.document,
      q = 0,
      U = 0,
      z = t(),
      W = t(),
      V = t(),
      J = function (e, t) {
        return e === t && (D = !0), 0;
      },
      X = 1 << 31,
      G = {}.hasOwnProperty,
      K = [],
      Q = K.pop,
      Y = K.push,
      Z = K.push,
      ee = K.slice,
      te = function (e, t) {
        for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
        return -1;
      },
      ne =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      ie = "[\\x20\\t\\r\\n\\f]",
      re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      oe =
        "\\[" +
        ie +
        "*(" +
        re +
        ")(?:" +
        ie +
        "*([*^$|!~]?=)" +
        ie +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        re +
        "))|)" +
        ie +
        "*\\]",
      ae =
        ":(" +
        re +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        oe +
        ")*)|.*)\\)|)",
      se = new RegExp(ie + "+", "g"),
      le = new RegExp(
        "^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$",
        "g"
      ),
      ce = new RegExp("^" + ie + "*," + ie + "*"),
      ue = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
      he = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"),
      de = new RegExp(ae),
      pe = new RegExp("^" + re + "$"),
      fe = {
        ID: new RegExp("^#(" + re + ")"),
        CLASS: new RegExp("^\\.(" + re + ")"),
        TAG: new RegExp("^(" + re + "|[*])"),
        ATTR: new RegExp("^" + oe),
        PSEUDO: new RegExp("^" + ae),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            ie +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            ie +
            "*(?:([+-]|)" +
            ie +
            "*(\\d+)|))" +
            ie +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + ne + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            ie +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            ie +
            "*((?:-\\d)?\\d*)" +
            ie +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      me = /^(?:input|select|textarea|button)$/i,
      ge = /^h\d$/i,
      ve = /^[^{]+\{\s*\[native \w/,
      ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      be = /[+~]/,
      we = /'|\\/g,
      xe = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"),
      _e = function (e, t, n) {
        var i = "0x" + t - 65536;
        return i != i || n
          ? t
          : i < 0
          ? String.fromCharCode(i + 65536)
          : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
      },
      Ee = function () {
        P();
      };
    try {
      Z.apply((K = ee.call(B.childNodes)), B.childNodes),
        K[B.childNodes.length].nodeType;
    } catch (e) {
      Z = {
        apply: K.length
          ? function (e, t) {
              Y.apply(e, ee.call(t));
            }
          : function (e, t) {
              for (var n = e.length, i = 0; (e[n++] = t[i++]); );
              e.length = n - 1;
            },
      };
    }
    for (v in ((_ = w.support = {}),
    (C = w.isXML =
      function (e) {
        var t = e && (e.ownerDocument || e).documentElement;
        return !!t && "HTML" !== t.nodeName;
      }),
    (P = w.setDocument =
      function (e) {
        var t,
          n,
          i = e ? e.ownerDocument || e : B;
        return (
          i !== L &&
            9 === i.nodeType &&
            i.documentElement &&
            ((F = (L = i).documentElement),
            (O = !C(L)),
            (n = L.defaultView) &&
              n.top !== n &&
              (n.addEventListener
                ? n.addEventListener("unload", Ee, !1)
                : n.attachEvent && n.attachEvent("onunload", Ee)),
            (_.attributes = r(function (e) {
              return (e.className = "i"), !e.getAttribute("className");
            })),
            (_.getElementsByTagName = r(function (e) {
              return (
                e.appendChild(L.createComment("")),
                !e.getElementsByTagName("*").length
              );
            })),
            (_.getElementsByClassName = ve.test(L.getElementsByClassName)),
            (_.getById = r(function (e) {
              return (
                (F.appendChild(e).id = H),
                !L.getElementsByName || !L.getElementsByName(H).length
              );
            })),
            _.getById
              ? ((E.find.ID = function (e, t) {
                  if ("undefined" != typeof t.getElementById && O) {
                    var n = t.getElementById(e);
                    return n ? [n] : [];
                  }
                }),
                (E.filter.ID = function (e) {
                  var t = e.replace(xe, _e);
                  return function (e) {
                    return e.getAttribute("id") === t;
                  };
                }))
              : (delete E.find.ID,
                (E.filter.ID = function (e) {
                  var n = e.replace(xe, _e);
                  return function (e) {
                    var t =
                      "undefined" != typeof e.getAttributeNode &&
                      e.getAttributeNode("id");
                    return t && t.value === n;
                  };
                })),
            (E.find.TAG = _.getElementsByTagName
              ? function (e, t) {
                  return "undefined" != typeof t.getElementsByTagName
                    ? t.getElementsByTagName(e)
                    : _.qsa
                    ? t.querySelectorAll(e)
                    : void 0;
                }
              : function (e, t) {
                  var n,
                    i = [],
                    r = 0,
                    o = t.getElementsByTagName(e);
                  if ("*" !== e) return o;
                  for (; (n = o[r++]); ) 1 === n.nodeType && i.push(n);
                  return i;
                }),
            (E.find.CLASS =
              _.getElementsByClassName &&
              function (e, t) {
                if ("undefined" != typeof t.getElementsByClassName && O)
                  return t.getElementsByClassName(e);
              }),
            (I = []),
            (R = []),
            (_.qsa = ve.test(L.querySelectorAll)) &&
              (r(function (e) {
                (F.appendChild(e).innerHTML =
                  "<a id='" +
                  H +
                  "'></a><select id='" +
                  H +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  e.querySelectorAll("[msallowcapture^='']").length &&
                    R.push("[*^$]=" + ie + "*(?:''|\"\")"),
                  e.querySelectorAll("[selected]").length ||
                    R.push("\\[" + ie + "*(?:value|" + ne + ")"),
                  e.querySelectorAll("[id~=" + H + "-]").length || R.push("~="),
                  e.querySelectorAll(":checked").length || R.push(":checked"),
                  e.querySelectorAll("a#" + H + "+*").length ||
                    R.push(".#.+[+~]");
              }),
              r(function (e) {
                var t = L.createElement("input");
                t.setAttribute("type", "hidden"),
                  e.appendChild(t).setAttribute("name", "D"),
                  e.querySelectorAll("[name=d]").length &&
                    R.push("name" + ie + "*[*^$|!~]?="),
                  e.querySelectorAll(":enabled").length ||
                    R.push(":enabled", ":disabled"),
                  e.querySelectorAll("*,:x"),
                  R.push(",.*:");
              })),
            (_.matchesSelector = ve.test(
              ($ =
                F.matches ||
                F.webkitMatchesSelector ||
                F.mozMatchesSelector ||
                F.oMatchesSelector ||
                F.msMatchesSelector)
            )) &&
              r(function (e) {
                (_.disconnectedMatch = $.call(e, "div")),
                  $.call(e, "[s!='']:x"),
                  I.push("!=", ae);
              }),
            (R = R.length && new RegExp(R.join("|"))),
            (I = I.length && new RegExp(I.join("|"))),
            (t = ve.test(F.compareDocumentPosition)),
            (M =
              t || ve.test(F.contains)
                ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                      i = t && t.parentNode;
                    return (
                      e === i ||
                      !(
                        !i ||
                        1 !== i.nodeType ||
                        !(n.contains
                          ? n.contains(i)
                          : e.compareDocumentPosition &&
                            16 & e.compareDocumentPosition(i))
                      )
                    );
                  }
                : function (e, t) {
                    if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                    return !1;
                  }),
            (J = t
              ? function (e, t) {
                  if (e === t) return (D = !0), 0;
                  var n =
                    !e.compareDocumentPosition - !t.compareDocumentPosition;
                  return (
                    n ||
                    (1 &
                      (n =
                        (e.ownerDocument || e) === (t.ownerDocument || t)
                          ? e.compareDocumentPosition(t)
                          : 1) ||
                    (!_.sortDetached && t.compareDocumentPosition(e) === n)
                      ? e === L || (e.ownerDocument === B && M(B, e))
                        ? -1
                        : t === L || (t.ownerDocument === B && M(B, t))
                        ? 1
                        : j
                        ? te(j, e) - te(j, t)
                        : 0
                      : 4 & n
                      ? -1
                      : 1)
                  );
                }
              : function (e, t) {
                  if (e === t) return (D = !0), 0;
                  var n,
                    i = 0,
                    r = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                  if (!r || !o)
                    return e === L
                      ? -1
                      : t === L
                      ? 1
                      : r
                      ? -1
                      : o
                      ? 1
                      : j
                      ? te(j, e) - te(j, t)
                      : 0;
                  if (r === o) return c(e, t);
                  for (n = e; (n = n.parentNode); ) a.unshift(n);
                  for (n = t; (n = n.parentNode); ) s.unshift(n);
                  for (; a[i] === s[i]; ) i++;
                  return i
                    ? c(a[i], s[i])
                    : a[i] === B
                    ? -1
                    : s[i] === B
                    ? 1
                    : 0;
                })),
          L
        );
      }),
    (w.matches = function (e, t) {
      return w(e, null, null, t);
    }),
    (w.matchesSelector = function (t, n) {
      if (
        ((t.ownerDocument || t) !== L && P(t),
        (n = n.replace(he, "='$1']")),
        _.matchesSelector &&
          O &&
          !V[n + " "] &&
          (!I || !I.test(n)) &&
          (!R || !R.test(n)))
      )
        try {
          var i = $.call(t, n);
          if (
            i ||
            _.disconnectedMatch ||
            (t.document && 11 !== t.document.nodeType)
          )
            return i;
        } catch (e) {}
      return 0 < w(n, L, null, [t]).length;
    }),
    (w.contains = function (e, t) {
      return (e.ownerDocument || e) !== L && P(e), M(e, t);
    }),
    (w.attr = function (e, t) {
      (e.ownerDocument || e) !== L && P(e);
      var n = E.attrHandle[t.toLowerCase()],
        i =
          n && G.call(E.attrHandle, t.toLowerCase()) ? n(e, t, !O) : undefined;
      return i !== undefined
        ? i
        : _.attributes || !O
        ? e.getAttribute(t)
        : (i = e.getAttributeNode(t)) && i.specified
        ? i.value
        : null;
    }),
    (w.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }),
    (w.uniqueSort = function (e) {
      var t,
        n = [],
        i = 0,
        r = 0;
      if (
        ((D = !_.detectDuplicates),
        (j = !_.sortStable && e.slice(0)),
        e.sort(J),
        D)
      ) {
        for (; (t = e[r++]); ) t === e[r] && (i = n.push(r));
        for (; i--; ) e.splice(n[i], 1);
      }
      return (j = null), e;
    }),
    (S = w.getText =
      function (e) {
        var t,
          n = "",
          i = 0,
          r = e.nodeType;
        if (r) {
          if (1 === r || 9 === r || 11 === r) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) n += S(e);
          } else if (3 === r || 4 === r) return e.nodeValue;
        } else for (; (t = e[i++]); ) n += S(t);
        return n;
      }),
    ((E = w.selectors =
      {
        cacheLength: 50,
        createPseudo: l,
        match: fe,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (e) {
            return (
              (e[1] = e[1].replace(xe, _e)),
              (e[3] = (e[3] || e[4] || e[5] || "").replace(xe, _e)),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
              e.slice(0, 4)
            );
          },
          CHILD: function (e) {
            return (
              (e[1] = e[1].toLowerCase()),
              "nth" === e[1].slice(0, 3)
                ? (e[3] || w.error(e[0]),
                  (e[4] = +(e[4]
                    ? e[5] + (e[6] || 1)
                    : 2 * ("even" === e[3] || "odd" === e[3]))),
                  (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                : e[3] && w.error(e[0]),
              e
            );
          },
          PSEUDO: function (e) {
            var t,
              n = !e[6] && e[2];
            return fe.CHILD.test(e[0])
              ? null
              : (e[3]
                  ? (e[2] = e[4] || e[5] || "")
                  : n &&
                    de.test(n) &&
                    (t = k(n, !0)) &&
                    (t = n.indexOf(")", n.length - t) - n.length) &&
                    ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                e.slice(0, 3));
          },
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(xe, _e).toLowerCase();
            return "*" === e
              ? function () {
                  return !0;
                }
              : function (e) {
                  return e.nodeName && e.nodeName.toLowerCase() === t;
                };
          },
          CLASS: function (e) {
            var t = z[e + " "];
            return (
              t ||
              ((t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) &&
                z(e, function (e) {
                  return t.test(
                    ("string" == typeof e.className && e.className) ||
                      ("undefined" != typeof e.getAttribute &&
                        e.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (n, i, r) {
            return function (e) {
              var t = w.attr(e, n);
              return null == t
                ? "!=" === i
                : !i ||
                    ((t += ""),
                    "=" === i
                      ? t === r
                      : "!=" === i
                      ? t !== r
                      : "^=" === i
                      ? r && 0 === t.indexOf(r)
                      : "*=" === i
                      ? r && -1 < t.indexOf(r)
                      : "$=" === i
                      ? r && t.slice(-r.length) === r
                      : "~=" === i
                      ? -1 < (" " + t.replace(se, " ") + " ").indexOf(r)
                      : "|=" === i &&
                        (t === r || t.slice(0, r.length + 1) === r + "-"));
            };
          },
          CHILD: function (f, e, t, m, g) {
            var v = "nth" !== f.slice(0, 3),
              y = "last" !== f.slice(-4),
              b = "of-type" === e;
            return 1 === m && 0 === g
              ? function (e) {
                  return !!e.parentNode;
                }
              : function (e, t, n) {
                  var i,
                    r,
                    o,
                    a,
                    s,
                    l,
                    c = v !== y ? "nextSibling" : "previousSibling",
                    u = e.parentNode,
                    h = b && e.nodeName.toLowerCase(),
                    d = !n && !b,
                    p = !1;
                  if (u) {
                    if (v) {
                      for (; c; ) {
                        for (a = e; (a = a[c]); )
                          if (
                            b
                              ? a.nodeName.toLowerCase() === h
                              : 1 === a.nodeType
                          )
                            return !1;
                        l = c = "only" === f && !l && "nextSibling";
                      }
                      return !0;
                    }
                    if (((l = [y ? u.firstChild : u.lastChild]), y && d)) {
                      for (
                        p =
                          (s =
                            (i =
                              (r =
                                (o = (a = u)[H] || (a[H] = {}))[a.uniqueID] ||
                                (o[a.uniqueID] = {}))[f] || [])[0] === q &&
                            i[1]) && i[2],
                          a = s && u.childNodes[s];
                        (a = (++s && a && a[c]) || (p = s = 0) || l.pop());

                      )
                        if (1 === a.nodeType && ++p && a === e) {
                          r[f] = [q, s, p];
                          break;
                        }
                    } else if (
                      (d &&
                        (p = s =
                          (i =
                            (r =
                              (o = (a = e)[H] || (a[H] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[f] || [])[0] === q && i[1]),
                      !1 === p)
                    )
                      for (
                        ;
                        (a = (++s && a && a[c]) || (p = s = 0) || l.pop()) &&
                        ((b
                          ? a.nodeName.toLowerCase() !== h
                          : 1 !== a.nodeType) ||
                          !++p ||
                          (d &&
                            ((r =
                              (o = a[H] || (a[H] = {}))[a.uniqueID] ||
                              (o[a.uniqueID] = {}))[f] = [q, p]),
                          a !== e));

                      );
                    return (p -= g) === m || (p % m == 0 && 0 <= p / m);
                  }
                };
          },
          PSEUDO: function (e, o) {
            var t,
              a =
                E.pseudos[e] ||
                E.setFilters[e.toLowerCase()] ||
                w.error("unsupported pseudo: " + e);
            return a[H]
              ? a(o)
              : 1 < a.length
              ? ((t = [e, e, "", o]),
                E.setFilters.hasOwnProperty(e.toLowerCase())
                  ? l(function (e, t) {
                      for (var n, i = a(e, o), r = i.length; r--; )
                        e[(n = te(e, i[r]))] = !(t[n] = i[r]);
                    })
                  : function (e) {
                      return a(e, 0, t);
                    })
              : a;
          },
        },
        pseudos: {
          not: l(function (e) {
            var i = [],
              r = [],
              s = T(e.replace(le, "$1"));
            return s[H]
              ? l(function (e, t, n, i) {
                  for (var r, o = s(e, null, i, []), a = e.length; a--; )
                    (r = o[a]) && (e[a] = !(t[a] = r));
                })
              : function (e, t, n) {
                  return (i[0] = e), s(i, null, n, r), (i[0] = null), !r.pop();
                };
          }),
          has: l(function (t) {
            return function (e) {
              return 0 < w(t, e).length;
            };
          }),
          contains: l(function (t) {
            return (
              (t = t.replace(xe, _e)),
              function (e) {
                return -1 < (e.textContent || e.innerText || S(e)).indexOf(t);
              }
            );
          }),
          lang: l(function (n) {
            return (
              pe.test(n || "") || w.error("unsupported lang: " + n),
              (n = n.replace(xe, _e).toLowerCase()),
              function (e) {
                var t;
                do {
                  if (
                    (t = O
                      ? e.lang
                      : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                  )
                    return (
                      (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                    );
                } while ((e = e.parentNode) && 1 === e.nodeType);
                return !1;
              }
            );
          }),
          target: function (e) {
            var t = n.location && n.location.hash;
            return t && t.slice(1) === e.id;
          },
          root: function (e) {
            return e === F;
          },
          focus: function (e) {
            return (
              e === L.activeElement &&
              (!L.hasFocus || L.hasFocus()) &&
              !!(e.type || e.href || ~e.tabIndex)
            );
          },
          enabled: function (e) {
            return !1 === e.disabled;
          },
          disabled: function (e) {
            return !0 === e.disabled;
          },
          checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return (
              ("input" === t && !!e.checked) || ("option" === t && !!e.selected)
            );
          },
          selected: function (e) {
            return (
              e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
            );
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6) return !1;
            return !0;
          },
          parent: function (e) {
            return !E.pseudos.empty(e);
          },
          header: function (e) {
            return ge.test(e.nodeName);
          },
          input: function (e) {
            return me.test(e.nodeName);
          },
          button: function (e) {
            var t = e.nodeName.toLowerCase();
            return ("input" === t && "button" === e.type) || "button" === t;
          },
          text: function (e) {
            var t;
            return (
              "input" === e.nodeName.toLowerCase() &&
              "text" === e.type &&
              (null == (t = e.getAttribute("type")) ||
                "text" === t.toLowerCase())
            );
          },
          first: s(function () {
            return [0];
          }),
          last: s(function (e, t) {
            return [t - 1];
          }),
          eq: s(function (e, t, n) {
            return [n < 0 ? n + t : n];
          }),
          even: s(function (e, t) {
            for (var n = 0; n < t; n += 2) e.push(n);
            return e;
          }),
          odd: s(function (e, t) {
            for (var n = 1; n < t; n += 2) e.push(n);
            return e;
          }),
          lt: s(function (e, t, n) {
            for (var i = n < 0 ? n + t : n; 0 <= --i; ) e.push(i);
            return e;
          }),
          gt: s(function (e, t, n) {
            for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
            return e;
          }),
        },
      }).pseudos.nth = E.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      E.pseudos[v] = o(v);
    for (v in { submit: !0, reset: !0 }) E.pseudos[v] = a(v);
    return (
      (u.prototype = E.filters = E.pseudos),
      (E.setFilters = new u()),
      (k = w.tokenize =
        function (e, t) {
          var n,
            i,
            r,
            o,
            a,
            s,
            l,
            c = W[e + " "];
          if (c) return t ? 0 : c.slice(0);
          for (a = e, s = [], l = E.preFilter; a; ) {
            for (o in ((n && !(i = ce.exec(a))) ||
              (i && (a = a.slice(i[0].length) || a), s.push((r = []))),
            (n = !1),
            (i = ue.exec(a)) &&
              ((n = i.shift()),
              r.push({ value: n, type: i[0].replace(le, " ") }),
              (a = a.slice(n.length))),
            E.filter))
              !(i = fe[o].exec(a)) ||
                (l[o] && !(i = l[o](i))) ||
                ((n = i.shift()),
                r.push({ value: n, type: o, matches: i }),
                (a = a.slice(n.length)));
            if (!n) break;
          }
          return t ? a.length : a ? w.error(e) : W(e, s).slice(0);
        }),
      (T = w.compile =
        function (e, t) {
          var n,
            i = [],
            r = [],
            o = V[e + " "];
          if (!o) {
            for (t || (t = k(e)), n = t.length; n--; )
              (o = p(t[n]))[H] ? i.push(o) : r.push(o);
            (o = V(e, f(r, i))).selector = e;
          }
          return o;
        }),
      (A = w.select =
        function (e, t, n, i) {
          var r,
            o,
            a,
            s,
            l,
            c = "function" == typeof e && e,
            u = !i && k((e = c.selector || e));
          if (((n = n || []), 1 === u.length)) {
            if (
              2 < (o = u[0] = u[0].slice(0)).length &&
              "ID" === (a = o[0]).type &&
              _.getById &&
              9 === t.nodeType &&
              O &&
              E.relative[o[1].type]
            ) {
              if (!(t = (E.find.ID(a.matches[0].replace(xe, _e), t) || [])[0]))
                return n;
              c && (t = t.parentNode), (e = e.slice(o.shift().value.length));
            }
            for (
              r = fe.needsContext.test(e) ? 0 : o.length;
              r-- && ((a = o[r]), !E.relative[(s = a.type)]);

            )
              if (
                (l = E.find[s]) &&
                (i = l(
                  a.matches[0].replace(xe, _e),
                  (be.test(o[0].type) && m(t.parentNode)) || t
                ))
              ) {
                if ((o.splice(r, 1), !(e = i.length && g(o))))
                  return Z.apply(n, i), n;
                break;
              }
          }
          return (
            (c || T(e, u))(
              i,
              t,
              !O,
              n,
              !t || (be.test(e) && m(t.parentNode)) || t
            ),
            n
          );
        }),
      (_.sortStable = H.split("").sort(J).join("") === H),
      (_.detectDuplicates = !!D),
      P(),
      (_.sortDetached = r(function (e) {
        return 1 & e.compareDocumentPosition(L.createElement("div"));
      })),
      r(function (e) {
        return (
          (e.innerHTML = "<a href='#'></a>"),
          "#" === e.firstChild.getAttribute("href")
        );
      }) ||
        i("type|href|height|width", function (e, t, n) {
          if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }),
      (_.attributes &&
        r(function (e) {
          return (
            (e.innerHTML = "<input/>"),
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
          );
        })) ||
        i("value", function (e, t, n) {
          if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }),
      r(function (e) {
        return null == e.getAttribute("disabled");
      }) ||
        i(ne, function (e, t, n) {
          var i;
          if (!n)
            return !0 === e[t]
              ? t.toLowerCase()
              : (i = e.getAttributeNode(t)) && i.specified
              ? i.value
              : null;
        }),
      w
    );
  })(E);
  (me.find = we),
    (me.expr = we.selectors),
    (me.expr[":"] = me.expr.pseudos),
    (me.uniqueSort = me.unique = we.uniqueSort),
    (me.text = we.getText),
    (me.isXMLDoc = we.isXML),
    (me.contains = we.contains);
  var xe = function (e, t, n) {
      for (var i = [], r = n !== undefined; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (r && me(e).is(n)) break;
          i.push(e);
        }
      return i;
    },
    _e = function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    Ee = me.expr.match.needsContext,
    Se = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    Ce = /^.[^:#\[\.,]*$/;
  (me.filter = function (e, t, n) {
    var i = t[0];
    return (
      n && (e = ":not(" + e + ")"),
      1 === t.length && 1 === i.nodeType
        ? me.find.matchesSelector(i, e)
          ? [i]
          : []
        : me.find.matches(
            e,
            me.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    me.fn.extend({
      find: function (e) {
        var t,
          n = [],
          i = this,
          r = i.length;
        if ("string" != typeof e)
          return this.pushStack(
            me(e).filter(function () {
              for (t = 0; t < r; t++) if (me.contains(i[t], this)) return !0;
            })
          );
        for (t = 0; t < r; t++) me.find(e, i[t], n);
        return (
          ((n = this.pushStack(1 < r ? me.unique(n) : n)).selector = this
            .selector
            ? this.selector + " " + e
            : e),
          n
        );
      },
      filter: function (e) {
        return this.pushStack(n(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(n(this, e || [], !0));
      },
      is: function (e) {
        return !!n(
          this,
          "string" == typeof e && Ee.test(e) ? me(e) : e || [],
          !1
        ).length;
      },
    });
  var ke,
    Te = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  ((me.fn.init = function (e, t, n) {
    var i, r;
    if (!e) return this;
    if (((n = n || ke), "string" != typeof e))
      return e.nodeType
        ? ((this.context = this[0] = e), (this.length = 1), this)
        : me.isFunction(e)
        ? "undefined" != typeof n.ready
          ? n.ready(e)
          : e(me)
        : (e.selector !== undefined &&
            ((this.selector = e.selector), (this.context = e.context)),
          me.makeArray(e, this));
    if (
      !(i =
        "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length
          ? [null, e, null]
          : Te.exec(e)) ||
      (!i[1] && t)
    )
      return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
    if (i[1]) {
      if (
        ((t = t instanceof me ? t[0] : t),
        me.merge(
          this,
          me.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : oe, !0)
        ),
        Se.test(i[1]) && me.isPlainObject(t))
      )
        for (i in t)
          me.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
      return this;
    }
    if ((r = oe.getElementById(i[2])) && r.parentNode) {
      if (r.id !== i[2]) return ke.find(e);
      (this.length = 1), (this[0] = r);
    }
    return (this.context = oe), (this.selector = e), this;
  }).prototype = me.fn),
    (ke = me(oe));
  var Ae = /^(?:parents|prev(?:Until|All))/,
    Ne = { children: !0, contents: !0, next: !0, prev: !0 };
  me.fn.extend({
    has: function (e) {
      var t,
        n = me(e, this),
        i = n.length;
      return this.filter(function () {
        for (t = 0; t < i; t++) if (me.contains(this, n[t])) return !0;
      });
    },
    closest: function (e, t) {
      for (
        var n,
          i = 0,
          r = this.length,
          o = [],
          a = Ee.test(e) || "string" != typeof e ? me(e, t || this.context) : 0;
        i < r;
        i++
      )
        for (n = this[i]; n && n !== t; n = n.parentNode)
          if (
            n.nodeType < 11 &&
            (a
              ? -1 < a.index(n)
              : 1 === n.nodeType && me.find.matchesSelector(n, e))
          ) {
            o.push(n);
            break;
          }
      return this.pushStack(1 < o.length ? me.uniqueSort(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? me.inArray(this[0], me(e))
          : me.inArray(e.jquery ? e[0] : e, this)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      return this.pushStack(me.uniqueSort(me.merge(this.get(), me(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    me.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return xe(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return xe(e, "parentNode", n);
        },
        next: function (e) {
          return i(e, "nextSibling");
        },
        prev: function (e) {
          return i(e, "previousSibling");
        },
        nextAll: function (e) {
          return xe(e, "nextSibling");
        },
        prevAll: function (e) {
          return xe(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return xe(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return xe(e, "previousSibling", n);
        },
        siblings: function (e) {
          return _e((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return _e(e.firstChild);
        },
        contents: function (e) {
          return me.nodeName(e, "iframe")
            ? e.contentDocument || e.contentWindow.document
            : me.merge([], e.childNodes);
        },
      },
      function (i, r) {
        me.fn[i] = function (e, t) {
          var n = me.map(this, r, e);
          return (
            "Until" !== i.slice(-5) && (t = e),
            t && "string" == typeof t && (n = me.filter(t, n)),
            1 < this.length &&
              (Ne[i] || (n = me.uniqueSort(n)),
              Ae.test(i) && (n = n.reverse())),
            this.pushStack(n)
          );
        };
      }
    );
  var je,
    De,
    Pe = /\S+/g;
  for (De in ((me.Callbacks = function (i) {
    i = "string" == typeof i ? u(i) : me.extend({}, i);
    var r,
      e,
      t,
      n,
      o = [],
      a = [],
      s = -1,
      l = function () {
        for (n = i.once, t = r = !0; a.length; s = -1)
          for (e = a.shift(); ++s < o.length; )
            !1 === o[s].apply(e[0], e[1]) &&
              i.stopOnFalse &&
              ((s = o.length), (e = !1));
        i.memory || (e = !1), (r = !1), n && (o = e ? [] : "");
      },
      c = {
        add: function () {
          return (
            o &&
              (e && !r && ((s = o.length - 1), a.push(e)),
              (function n(e) {
                me.each(e, function (e, t) {
                  me.isFunction(t)
                    ? (i.unique && c.has(t)) || o.push(t)
                    : t && t.length && "string" !== me.type(t) && n(t);
                });
              })(arguments),
              e && !r && l()),
            this
          );
        },
        remove: function () {
          return (
            me.each(arguments, function (e, t) {
              for (var n; -1 < (n = me.inArray(t, o, n)); )
                o.splice(n, 1), n <= s && s--;
            }),
            this
          );
        },
        has: function (e) {
          return e ? -1 < me.inArray(e, o) : 0 < o.length;
        },
        empty: function () {
          return o && (o = []), this;
        },
        disable: function () {
          return (n = a = []), (o = e = ""), this;
        },
        disabled: function () {
          return !o;
        },
        lock: function () {
          return (n = !0), e || c.disable(), this;
        },
        locked: function () {
          return !!n;
        },
        fireWith: function (e, t) {
          return (
            n ||
              ((t = [e, (t = t || []).slice ? t.slice() : t]),
              a.push(t),
              r || l()),
            this
          );
        },
        fire: function () {
          return c.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!t;
        },
      };
    return c;
  }),
  me.extend({
    Deferred: function (e) {
      var o = [
          ["resolve", "done", me.Callbacks("once memory"), "resolved"],
          ["reject", "fail", me.Callbacks("once memory"), "rejected"],
          ["notify", "progress", me.Callbacks("memory")],
        ],
        r = "pending",
        a = {
          state: function () {
            return r;
          },
          always: function () {
            return s.done(arguments).fail(arguments), this;
          },
          then: function () {
            var r = arguments;
            return me
              .Deferred(function (i) {
                me.each(o, function (e, t) {
                  var n = me.isFunction(r[e]) && r[e];
                  s[t[1]](function () {
                    var e = n && n.apply(this, arguments);
                    e && me.isFunction(e.promise)
                      ? e
                          .promise()
                          .progress(i.notify)
                          .done(i.resolve)
                          .fail(i.reject)
                      : i[t[0] + "With"](
                          this === a ? i.promise() : this,
                          n ? [e] : arguments
                        );
                  });
                }),
                  (r = null);
              })
              .promise();
          },
          promise: function (e) {
            return null != e ? me.extend(e, a) : a;
          },
        },
        s = {};
      return (
        (a.pipe = a.then),
        me.each(o, function (e, t) {
          var n = t[2],
            i = t[3];
          (a[t[1]] = n.add),
            i &&
              n.add(
                function () {
                  r = i;
                },
                o[1 ^ e][2].disable,
                o[2][2].lock
              ),
            (s[t[0]] = function () {
              return s[t[0] + "With"](this === s ? a : this, arguments), this;
            }),
            (s[t[0] + "With"] = n.fireWith);
        }),
        a.promise(s),
        e && e.call(s, s),
        s
      );
    },
    when: function (e) {
      var r,
        t,
        n,
        i = 0,
        o = ae.call(arguments),
        a = o.length,
        s = 1 !== a || (e && me.isFunction(e.promise)) ? a : 0,
        l = 1 === s ? e : me.Deferred(),
        c = function (t, n, i) {
          return function (e) {
            (n[t] = this),
              (i[t] = 1 < arguments.length ? ae.call(arguments) : e),
              i === r ? l.notifyWith(n, i) : --s || l.resolveWith(n, i);
          };
        };
      if (1 < a)
        for (r = new Array(a), t = new Array(a), n = new Array(a); i < a; i++)
          o[i] && me.isFunction(o[i].promise)
            ? o[i]
                .promise()
                .progress(c(i, t, r))
                .done(c(i, n, o))
                .fail(l.reject)
            : --s;
      return s || l.resolveWith(n, o), l.promise();
    },
  }),
  (me.fn.ready = function (e) {
    return me.ready.promise().done(e), this;
  }),
  me.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (e) {
      e ? me.readyWait++ : me.ready(!0);
    },
    ready: function (e) {
      (!0 === e ? --me.readyWait : me.isReady) ||
        ((me.isReady = !0) !== e && 0 < --me.readyWait) ||
        (je.resolveWith(oe, [me]),
        me.fn.triggerHandler &&
          (me(oe).triggerHandler("ready"), me(oe).off("ready")));
    },
  }),
  (me.ready.promise = function (t) {
    if (!je)
      if (
        ((je = me.Deferred()),
        "complete" === oe.readyState ||
          ("loading" !== oe.readyState && !oe.documentElement.doScroll))
      )
        E.setTimeout(me.ready);
      else if (oe.addEventListener)
        oe.addEventListener("DOMContentLoaded", o),
          E.addEventListener("load", o);
      else {
        oe.attachEvent("onreadystatechange", o), E.attachEvent("onload", o);
        var n = !1;
        try {
          n = null == E.frameElement && oe.documentElement;
        } catch (e) {}
        n &&
          n.doScroll &&
          (function i() {
            if (!me.isReady) {
              try {
                n.doScroll("left");
              } catch (e) {
                return E.setTimeout(i, 50);
              }
              r(), me.ready();
            }
          })();
      }
    return je.promise(t);
  }),
  me.ready.promise(),
  me(pe)))
    break;
  (pe.ownFirst = "0" === De),
    (pe.inlineBlockNeedsLayout = !1),
    me(function () {
      var e, t, n, i;
      (n = oe.getElementsByTagName("body")[0]) &&
        n.style &&
        ((t = oe.createElement("div")),
        ((i = oe.createElement("div")).style.cssText =
          "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
        n.appendChild(i).appendChild(t),
        "undefined" != typeof t.style.zoom &&
          ((t.style.cssText =
            "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
          (pe.inlineBlockNeedsLayout = e = 3 === t.offsetWidth),
          e && (n.style.zoom = 1)),
        n.removeChild(i));
    }),
    (function () {
      var t = oe.createElement("div");
      pe.deleteExpando = !0;
      try {
        delete t.test;
      } catch (e) {
        pe.deleteExpando = !1;
      }
      t = null;
    })();
  var Le,
    Fe = function (e) {
      var t = me.noData[(e.nodeName + " ").toLowerCase()],
        n = +e.nodeType || 1;
      return (
        (1 === n || 9 === n) &&
        (!t || (!0 !== t && e.getAttribute("classid") === t))
      );
    },
    Oe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Re = /([A-Z])/g;
  me.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    },
    hasData: function (e) {
      return (
        !!(e = e.nodeType ? me.cache[e[me.expando]] : e[me.expando]) && !c(e)
      );
    },
    data: function (e, t, n) {
      return a(e, t, n);
    },
    removeData: function (e, t) {
      return h(e, t);
    },
    _data: function (e, t, n) {
      return a(e, t, n, !0);
    },
    _removeData: function (e, t) {
      return h(e, t, !0);
    },
  }),
    me.fn.extend({
      data: function (e, t) {
        var n,
          i,
          r,
          o = this[0],
          a = o && o.attributes;
        if (e !== undefined)
          return "object" == typeof e
            ? this.each(function () {
                me.data(this, e);
              })
            : 1 < arguments.length
            ? this.each(function () {
                me.data(this, e, t);
              })
            : o
            ? l(o, e, me.data(o, e))
            : undefined;
        if (
          this.length &&
          ((r = me.data(o)), 1 === o.nodeType && !me._data(o, "parsedAttrs"))
        ) {
          for (n = a.length; n--; )
            a[n] &&
              0 === (i = a[n].name).indexOf("data-") &&
              l(o, (i = me.camelCase(i.slice(5))), r[i]);
          me._data(o, "parsedAttrs", !0);
        }
        return r;
      },
      removeData: function (e) {
        return this.each(function () {
          me.removeData(this, e);
        });
      },
    }),
    me.extend({
      queue: function (e, t, n) {
        var i;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (i = me._data(e, t)),
            n &&
              (!i || me.isArray(n)
                ? (i = me._data(e, t, me.makeArray(n)))
                : i.push(n)),
            i || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = me.queue(e, t),
          i = n.length,
          r = n.shift(),
          o = me._queueHooks(e, t),
          a = function () {
            me.dequeue(e, t);
          };
        "inprogress" === r && ((r = n.shift()), i--),
          r &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            r.call(e, a, o)),
          !i && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          me._data(e, n) ||
          me._data(e, n, {
            empty: me.Callbacks("once memory").add(function () {
              me._removeData(e, t + "queue"), me._removeData(e, n);
            }),
          })
        );
      },
    }),
    me.fn.extend({
      queue: function (t, n) {
        var e = 2;
        return (
          "string" != typeof t && ((n = t), (t = "fx"), e--),
          arguments.length < e
            ? me.queue(this[0], t)
            : n === undefined
            ? this
            : this.each(function () {
                var e = me.queue(this, t, n);
                me._queueHooks(this, t),
                  "fx" === t && "inprogress" !== e[0] && me.dequeue(this, t);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          me.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var n,
          i = 1,
          r = me.Deferred(),
          o = this,
          a = this.length,
          s = function () {
            --i || r.resolveWith(o, [o]);
          };
        for (
          "string" != typeof e && ((t = e), (e = undefined)), e = e || "fx";
          a--;

        )
          (n = me._data(o[a], e + "queueHooks")) &&
            n.empty &&
            (i++, n.empty.add(s));
        return s(), r.promise(t);
      },
    }),
    (pe.shrinkWrapBlocks = function () {
      return null != Le
        ? Le
        : ((Le = !1),
          (t = oe.getElementsByTagName("body")[0]) && t.style
            ? ((e = oe.createElement("div")),
              ((n = oe.createElement("div")).style.cssText =
                "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
              t.appendChild(n).appendChild(e),
              "undefined" != typeof e.style.zoom &&
                ((e.style.cssText =
                  "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                (e.appendChild(oe.createElement("div")).style.width = "5px"),
                (Le = 3 !== e.offsetWidth)),
              t.removeChild(n),
              Le)
            : void 0);
      var e, t, n;
    });
  var Ie,
    $e,
    Me,
    He = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    Be = new RegExp("^(?:([+-])=|)(" + He + ")([a-z%]*)$", "i"),
    qe = ["Top", "Right", "Bottom", "Left"],
    Ue = function (e, t) {
      return (
        (e = t || e),
        "none" === me.css(e, "display") || !me.contains(e.ownerDocument, e)
      );
    },
    ze = function (e, t, n, i, r, o, a) {
      var s = 0,
        l = e.length,
        c = null == n;
      if ("object" === me.type(n))
        for (s in ((r = !0), n)) ze(e, t, s, n[s], !0, o, a);
      else if (
        i !== undefined &&
        ((r = !0),
        me.isFunction(i) || (a = !0),
        c &&
          (a
            ? (t.call(e, i), (t = null))
            : ((c = t),
              (t = function (e, t, n) {
                return c.call(me(e), n);
              }))),
        t)
      )
        for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
      return r ? e : c ? t.call(e) : l ? t(e[0], n) : o;
    },
    We = /^(?:checkbox|radio)$/i,
    Ve = /<([\w:-]+)/,
    Je = /^$|\/(?:java|ecma)script/i,
    Xe = /^\s+/,
    Ge =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
  (Ie = oe.createElement("div")),
    ($e = oe.createDocumentFragment()),
    (Me = oe.createElement("input")),
    (Ie.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
    (pe.leadingWhitespace = 3 === Ie.firstChild.nodeType),
    (pe.tbody = !Ie.getElementsByTagName("tbody").length),
    (pe.htmlSerialize = !!Ie.getElementsByTagName("link").length),
    (pe.html5Clone =
      "<:nav></:nav>" !== oe.createElement("nav").cloneNode(!0).outerHTML),
    (Me.type = "checkbox"),
    (Me.checked = !0),
    $e.appendChild(Me),
    (pe.appendChecked = Me.checked),
    (Ie.innerHTML = "<textarea>x</textarea>"),
    (pe.noCloneChecked = !!Ie.cloneNode(!0).lastChild.defaultValue),
    $e.appendChild(Ie),
    (Me = oe.createElement("input")).setAttribute("type", "radio"),
    Me.setAttribute("checked", "checked"),
    Me.setAttribute("name", "t"),
    Ie.appendChild(Me),
    (pe.checkClone = Ie.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (pe.noCloneEvent = !!Ie.addEventListener),
    (Ie[me.expando] = 1),
    (pe.attributes = !Ie.getAttribute(me.expando));
  var Ke = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    area: [1, "<map>", "</map>"],
    param: [1, "<object>", "</object>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: pe.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
  };
  (Ke.optgroup = Ke.option),
    (Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead),
    (Ke.th = Ke.td);
  var Qe = /<|&#?\w+;/,
    Ye = /<tbody/i;
  !(function () {
    var e,
      t,
      n = oe.createElement("div");
    for (e in { submit: !0, change: !0, focusin: !0 })
      (t = "on" + e),
        (pe[e] = t in E) ||
          (n.setAttribute(t, "t"), (pe[e] = !1 === n.attributes[t].expando));
    n = null;
  })();
  var Ze = /^(?:input|select|textarea)$/i,
    et = /^key/,
    tt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    nt = /^(?:focusinfocus|focusoutblur)$/,
    it = /^([^.]*)(?:\.(.+)|)/;
  (me.event = {
    global: {},
    add: function (e, t, n, i, r) {
      var o,
        a,
        s,
        l,
        c,
        u,
        h,
        d,
        p,
        f,
        m,
        g = me._data(e);
      if (g) {
        for (
          n.handler && ((n = (l = n).handler), (r = l.selector)),
            n.guid || (n.guid = me.guid++),
            (a = g.events) || (a = g.events = {}),
            (u = g.handle) ||
              ((u = g.handle =
                function (e) {
                  return void 0 === me || (e && me.event.triggered === e.type)
                    ? undefined
                    : me.event.dispatch.apply(u.elem, arguments);
                }).elem = e),
            s = (t = (t || "").match(Pe) || [""]).length;
          s--;

        )
          (p = m = (o = it.exec(t[s]) || [])[1]),
            (f = (o[2] || "").split(".").sort()),
            p &&
              ((c = me.event.special[p] || {}),
              (p = (r ? c.delegateType : c.bindType) || p),
              (c = me.event.special[p] || {}),
              (h = me.extend(
                {
                  type: p,
                  origType: m,
                  data: i,
                  handler: n,
                  guid: n.guid,
                  selector: r,
                  needsContext: r && me.expr.match.needsContext.test(r),
                  namespace: f.join("."),
                },
                l
              )),
              (d = a[p]) ||
                (((d = a[p] = []).delegateCount = 0),
                (c.setup && !1 !== c.setup.call(e, i, f, u)) ||
                  (e.addEventListener
                    ? e.addEventListener(p, u, !1)
                    : e.attachEvent && e.attachEvent("on" + p, u))),
              c.add &&
                (c.add.call(e, h), h.handler.guid || (h.handler.guid = n.guid)),
              r ? d.splice(d.delegateCount++, 0, h) : d.push(h),
              (me.event.global[p] = !0));
        e = null;
      }
    },
    remove: function (e, t, n, i, r) {
      var o,
        a,
        s,
        l,
        c,
        u,
        h,
        d,
        p,
        f,
        m,
        g = me.hasData(e) && me._data(e);
      if (g && (u = g.events)) {
        for (c = (t = (t || "").match(Pe) || [""]).length; c--; )
          if (
            ((p = m = (s = it.exec(t[c]) || [])[1]),
            (f = (s[2] || "").split(".").sort()),
            p)
          ) {
            for (
              h = me.event.special[p] || {},
                d = u[(p = (i ? h.delegateType : h.bindType) || p)] || [],
                s =
                  s[2] &&
                  new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                l = o = d.length;
              o--;

            )
              (a = d[o]),
                (!r && m !== a.origType) ||
                  (n && n.guid !== a.guid) ||
                  (s && !s.test(a.namespace)) ||
                  (i && i !== a.selector && ("**" !== i || !a.selector)) ||
                  (d.splice(o, 1),
                  a.selector && d.delegateCount--,
                  h.remove && h.remove.call(e, a));
            l &&
              !d.length &&
              ((h.teardown && !1 !== h.teardown.call(e, f, g.handle)) ||
                me.removeEvent(e, p, g.handle),
              delete u[p]);
          } else for (p in u) me.event.remove(e, p + t[c], n, i, !0);
        me.isEmptyObject(u) && (delete g.handle, me._removeData(e, "events"));
      }
    },
    trigger: function (t, n, i, r) {
      var o,
        a,
        s,
        l,
        c,
        u,
        h,
        d = [i || oe],
        p = de.call(t, "type") ? t.type : t,
        f = de.call(t, "namespace") ? t.namespace.split(".") : [];
      if (
        ((s = u = i = i || oe),
        3 !== i.nodeType &&
          8 !== i.nodeType &&
          !nt.test(p + me.event.triggered) &&
          (-1 < p.indexOf(".") && ((p = (f = p.split(".")).shift()), f.sort()),
          (a = p.indexOf(":") < 0 && "on" + p),
          ((t = t[me.expando]
            ? t
            : new me.Event(p, "object" == typeof t && t)).isTrigger = r
            ? 2
            : 3),
          (t.namespace = f.join(".")),
          (t.rnamespace = t.namespace
            ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (t.result = undefined),
          t.target || (t.target = i),
          (n = null == n ? [t] : me.makeArray(n, [t])),
          (c = me.event.special[p] || {}),
          r || !c.trigger || !1 !== c.trigger.apply(i, n)))
      ) {
        if (!r && !c.noBubble && !me.isWindow(i)) {
          for (
            l = c.delegateType || p, nt.test(l + p) || (s = s.parentNode);
            s;
            s = s.parentNode
          )
            d.push(s), (u = s);
          u === (i.ownerDocument || oe) &&
            d.push(u.defaultView || u.parentWindow || E);
        }
        for (h = 0; (s = d[h++]) && !t.isPropagationStopped(); )
          (t.type = 1 < h ? l : c.bindType || p),
            (o =
              (me._data(s, "events") || {})[t.type] && me._data(s, "handle")) &&
              o.apply(s, n),
            (o = a && s[a]) &&
              o.apply &&
              Fe(s) &&
              ((t.result = o.apply(s, n)),
              !1 === t.result && t.preventDefault());
        if (
          ((t.type = p),
          !r &&
            !t.isDefaultPrevented() &&
            (!c._default || !1 === c._default.apply(d.pop(), n)) &&
            Fe(i) &&
            a &&
            i[p] &&
            !me.isWindow(i))
        ) {
          (u = i[a]) && (i[a] = null), (me.event.triggered = p);
          try {
            i[p]();
          } catch (e) {}
          (me.event.triggered = undefined), u && (i[a] = u);
        }
        return t.result;
      }
    },
    dispatch: function (e) {
      e = me.event.fix(e);
      var t,
        n,
        i,
        r,
        o,
        a = [],
        s = ae.call(arguments),
        l = (me._data(this, "events") || {})[e.type] || [],
        c = me.event.special[e.type] || {};
      if (
        (((s[0] = e).delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, e))
      ) {
        for (
          a = me.event.handlers.call(this, e, l), t = 0;
          (r = a[t++]) && !e.isPropagationStopped();

        )
          for (
            e.currentTarget = r.elem, n = 0;
            (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();

          )
            (e.rnamespace && !e.rnamespace.test(o.namespace)) ||
              ((e.handleObj = o),
              (e.data = o.data),
              (i = (
                (me.event.special[o.origType] || {}).handle || o.handler
              ).apply(r.elem, s)) !== undefined &&
                !1 === (e.result = i) &&
                (e.preventDefault(), e.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, e), e.result;
      }
    },
    handlers: function (e, t) {
      var n,
        i,
        r,
        o,
        a = [],
        s = t.delegateCount,
        l = e.target;
      if (
        s &&
        l.nodeType &&
        ("click" !== e.type || isNaN(e.button) || e.button < 1)
      )
        for (; l != this; l = l.parentNode || this)
          if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
            for (i = [], n = 0; n < s; n++)
              i[(r = (o = t[n]).selector + " ")] === undefined &&
                (i[r] = o.needsContext
                  ? -1 < me(r, this).index(l)
                  : me.find(r, this, null, [l]).length),
                i[r] && i.push(o);
            i.length && a.push({ elem: l, handlers: i });
          }
      return s < t.length && a.push({ elem: this, handlers: t.slice(s) }), a;
    },
    fix: function (e) {
      if (e[me.expando]) return e;
      var t,
        n,
        i,
        r = e.type,
        o = e,
        a = this.fixHooks[r];
      for (
        a ||
          (this.fixHooks[r] = a =
            tt.test(r) ? this.mouseHooks : et.test(r) ? this.keyHooks : {}),
          i = a.props ? this.props.concat(a.props) : this.props,
          e = new me.Event(o),
          t = i.length;
        t--;

      )
        e[(n = i[t])] = o[n];
      return (
        e.target || (e.target = o.srcElement || oe),
        3 === e.target.nodeType && (e.target = e.target.parentNode),
        (e.metaKey = !!e.metaKey),
        a.filter ? a.filter(e, o) : e
      );
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (e, t) {
        return (
          null == e.which &&
            (e.which = null != t.charCode ? t.charCode : t.keyCode),
          e
        );
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (e, t) {
        var n,
          i,
          r,
          o = t.button,
          a = t.fromElement;
        return (
          null == e.pageX &&
            null != t.clientX &&
            ((r = (i = e.target.ownerDocument || oe).documentElement),
            (n = i.body),
            (e.pageX =
              t.clientX +
              ((r && r.scrollLeft) || (n && n.scrollLeft) || 0) -
              ((r && r.clientLeft) || (n && n.clientLeft) || 0)),
            (e.pageY =
              t.clientY +
              ((r && r.scrollTop) || (n && n.scrollTop) || 0) -
              ((r && r.clientTop) || (n && n.clientTop) || 0))),
          !e.relatedTarget &&
            a &&
            (e.relatedTarget = a === e.target ? t.toElement : a),
          e.which ||
            o === undefined ||
            (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
          e
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== w() && this.focus)
            try {
              return this.focus(), !1;
            } catch (e) {}
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          if (this === w() && this.blur) return this.blur(), !1;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          if (
            me.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
          )
            return this.click(), !1;
        },
        _default: function (e) {
          return me.nodeName(e.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          e.result !== undefined &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
    simulate: function (e, t, n) {
      var i = me.extend(new me.Event(), n, { type: e, isSimulated: !0 });
      me.event.trigger(i, null, t),
        i.isDefaultPrevented() && n.preventDefault();
    },
  }),
    (me.removeEvent = oe.removeEventListener
      ? function (e, t, n) {
          e.removeEventListener && e.removeEventListener(t, n);
        }
      : function (e, t, n) {
          var i = "on" + t;
          e.detachEvent &&
            ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n));
        }),
    (me.Event = function (e, t) {
      if (!(this instanceof me.Event)) return new me.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (e.defaultPrevented === undefined && !1 === e.returnValue)
              ? p
              : f))
        : (this.type = e),
        t && me.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || me.now()),
        (this[me.expando] = !0);
    }),
    (me.Event.prototype = {
      constructor: me.Event,
      isDefaultPrevented: f,
      isPropagationStopped: f,
      isImmediatePropagationStopped: f,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = p),
          e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = p),
          e &&
            !this.isSimulated &&
            (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = p),
          e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    me.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, o) {
        me.event.special[e] = {
          delegateType: o,
          bindType: o,
          handle: function (e) {
            var t,
              n = this,
              i = e.relatedTarget,
              r = e.handleObj;
            return (
              (i && (i === n || me.contains(n, i))) ||
                ((e.type = r.origType),
                (t = r.handler.apply(this, arguments)),
                (e.type = o)),
              t
            );
          },
        };
      }
    ),
    pe.submit ||
      (me.event.special.submit = {
        setup: function () {
          if (me.nodeName(this, "form")) return !1;
          me.event.add(this, "click._submit keypress._submit", function (e) {
            var t = e.target,
              n =
                me.nodeName(t, "input") || me.nodeName(t, "button")
                  ? me.prop(t, "form")
                  : undefined;
            n &&
              !me._data(n, "submit") &&
              (me.event.add(n, "submit._submit", function (e) {
                e._submitBubble = !0;
              }),
              me._data(n, "submit", !0));
          });
        },
        postDispatch: function (e) {
          e._submitBubble &&
            (delete e._submitBubble,
            this.parentNode &&
              !e.isTrigger &&
              me.event.simulate("submit", this.parentNode, e));
        },
        teardown: function () {
          if (me.nodeName(this, "form")) return !1;
          me.event.remove(this, "._submit");
        },
      }),
    pe.change ||
      (me.event.special.change = {
        setup: function () {
          if (Ze.test(this.nodeName))
            return (
              ("checkbox" !== this.type && "radio" !== this.type) ||
                (me.event.add(this, "propertychange._change", function (e) {
                  "checked" === e.originalEvent.propertyName &&
                    (this._justChanged = !0);
                }),
                me.event.add(this, "click._change", function (e) {
                  this._justChanged && !e.isTrigger && (this._justChanged = !1),
                    me.event.simulate("change", this, e);
                })),
              !1
            );
          me.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            Ze.test(t.nodeName) &&
              !me._data(t, "change") &&
              (me.event.add(t, "change._change", function (e) {
                !this.parentNode ||
                  e.isSimulated ||
                  e.isTrigger ||
                  me.event.simulate("change", this.parentNode, e);
              }),
              me._data(t, "change", !0));
          });
        },
        handle: function (e) {
          var t = e.target;
          if (
            this !== t ||
            e.isSimulated ||
            e.isTrigger ||
            ("radio" !== t.type && "checkbox" !== t.type)
          )
            return e.handleObj.handler.apply(this, arguments);
        },
        teardown: function () {
          return me.event.remove(this, "._change"), !Ze.test(this.nodeName);
        },
      }),
    pe.focusin ||
      me.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
        var r = function (e) {
          me.event.simulate(i, e.target, me.event.fix(e));
        };
        me.event.special[i] = {
          setup: function () {
            var e = this.ownerDocument || this,
              t = me._data(e, i);
            t || e.addEventListener(n, r, !0), me._data(e, i, (t || 0) + 1);
          },
          teardown: function () {
            var e = this.ownerDocument || this,
              t = me._data(e, i) - 1;
            t
              ? me._data(e, i, t)
              : (e.removeEventListener(n, r, !0), me._removeData(e, i));
          },
        };
      }),
    me.fn.extend({
      on: function (e, t, n, i) {
        return x(this, e, t, n, i);
      },
      one: function (e, t, n, i) {
        return x(this, e, t, n, i, 1);
      },
      off: function (e, t, n) {
        var i, r;
        if (e && e.preventDefault && e.handleObj)
          return (
            (i = e.handleObj),
            me(e.delegateTarget).off(
              i.namespace ? i.origType + "." + i.namespace : i.origType,
              i.selector,
              i.handler
            ),
            this
          );
        if ("object" != typeof e)
          return (
            (!1 !== t && "function" != typeof t) || ((n = t), (t = undefined)),
            !1 === n && (n = f),
            this.each(function () {
              me.event.remove(this, e, n, t);
            })
          );
        for (r in e) this.off(r, t, e[r]);
        return this;
      },
      trigger: function (e, t) {
        return this.each(function () {
          me.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        if (n) return me.event.trigger(e, t, n, !0);
      },
    });
  var rt = / jQuery\d+="(?:null|\d+)"/g,
    ot = new RegExp("<(?:" + Ge + ")[\\s/>]", "i"),
    at =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    st = /<script|<style|<link/i,
    lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ct = /^true\/(.*)/,
    ut = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    ht = g(oe).appendChild(oe.createElement("div"));
  me.extend({
    htmlPrefilter: function (e) {
      return e.replace(at, "<$1></$2>");
    },
    clone: function (e, t, n) {
      var i,
        r,
        o,
        a,
        s,
        l = me.contains(e.ownerDocument, e);
      if (
        (pe.html5Clone || me.isXMLDoc(e) || !ot.test("<" + e.nodeName + ">")
          ? (o = e.cloneNode(!0))
          : ((ht.innerHTML = e.outerHTML), ht.removeChild((o = ht.firstChild))),
        !(
          (pe.noCloneEvent && pe.noCloneChecked) ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          me.isXMLDoc(e)
        ))
      )
        for (i = v(o), s = v(e), a = 0; null != (r = s[a]); ++a)
          i[a] && A(r, i[a]);
      if (t)
        if (n)
          for (s = s || v(e), i = i || v(o), a = 0; null != (r = s[a]); a++)
            T(r, i[a]);
        else T(e, o);
      return (
        0 < (i = v(o, "script")).length && y(i, !l && v(e, "script")),
        (i = s = r = null),
        o
      );
    },
    cleanData: function (e, t) {
      for (
        var n,
          i,
          r,
          o,
          a = 0,
          s = me.expando,
          l = me.cache,
          c = pe.attributes,
          u = me.event.special;
        null != (n = e[a]);
        a++
      )
        if ((t || Fe(n)) && (o = (r = n[s]) && l[r])) {
          if (o.events)
            for (i in o.events)
              u[i] ? me.event.remove(n, i) : me.removeEvent(n, i, o.handle);
          l[r] &&
            (delete l[r],
            c || "undefined" == typeof n.removeAttribute
              ? (n[s] = undefined)
              : n.removeAttribute(s),
            re.push(r));
        }
    },
  }),
    me.fn.extend({
      domManip: N,
      detach: function (e) {
        return j(this, e, !0);
      },
      remove: function (e) {
        return j(this, e);
      },
      text: function (e) {
        return ze(
          this,
          function (e) {
            return e === undefined
              ? me.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || oe).createTextNode(e)
                );
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return N(this, arguments, function (e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            S(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return N(this, arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = S(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return N(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return N(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++) {
          for (1 === e.nodeType && me.cleanData(v(e, !1)); e.firstChild; )
            e.removeChild(e.firstChild);
          e.options && me.nodeName(e, "select") && (e.options.length = 0);
        }
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return me.clone(this, e, t);
          })
        );
      },
      html: function (t) {
        return ze(
          this,
          function (t) {
            var n = this[0] || {},
              i = 0,
              r = this.length;
            if (t === undefined)
              return 1 === n.nodeType ? n.innerHTML.replace(rt, "") : undefined;
            if (
              "string" == typeof t &&
              !st.test(t) &&
              (pe.htmlSerialize || !ot.test(t)) &&
              (pe.leadingWhitespace || !Xe.test(t)) &&
              !Ke[(Ve.exec(t) || ["", ""])[1].toLowerCase()]
            ) {
              t = me.htmlPrefilter(t);
              try {
                for (; i < r; i++)
                  1 === (n = this[i] || {}).nodeType &&
                    (me.cleanData(v(n, !1)), (n.innerHTML = t));
                n = 0;
              } catch (e) {}
            }
            n && this.empty().append(t);
          },
          null,
          t,
          arguments.length
        );
      },
      replaceWith: function () {
        var n = [];
        return N(
          this,
          arguments,
          function (e) {
            var t = this.parentNode;
            me.inArray(this, n) < 0 &&
              (me.cleanData(v(this)), t && t.replaceChild(e, this));
          },
          n
        );
      },
    }),
    me.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, a) {
        me.fn[e] = function (e) {
          for (var t, n = 0, i = [], r = me(e), o = r.length - 1; n <= o; n++)
            (t = n === o ? this : this.clone(!0)),
              me(r[n])[a](t),
              le.apply(i, t.get());
          return this.pushStack(i);
        };
      }
    );
  var dt,
    pt = { HTML: "block", BODY: "block" },
    ft = /^margin/,
    mt = new RegExp("^(" + He + ")(?!px)[a-z%]+$", "i"),
    gt = function (e, t, n, i) {
      var r,
        o,
        a = {};
      for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
      for (o in ((r = n.apply(e, i || [])), t)) e.style[o] = a[o];
      return r;
    },
    vt = oe.documentElement;
  !(function () {
    function e() {
      var e,
        t,
        n = oe.documentElement;
      n.appendChild(c),
        (u.style.cssText =
          "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
        (i = o = l = !1),
        (r = s = !0),
        E.getComputedStyle &&
          ((t = E.getComputedStyle(u)),
          (i = "1%" !== (t || {}).top),
          (l = "2px" === (t || {}).marginLeft),
          (o = "4px" === (t || { width: "4px" }).width),
          (u.style.marginRight = "50%"),
          (r = "4px" === (t || { marginRight: "4px" }).marginRight),
          ((e = u.appendChild(oe.createElement("div"))).style.cssText =
            u.style.cssText =
              "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
          (e.style.marginRight = e.style.width = "0"),
          (u.style.width = "1px"),
          (s = !parseFloat((E.getComputedStyle(e) || {}).marginRight)),
          u.removeChild(e)),
        (u.style.display = "none"),
        (a = 0 === u.getClientRects().length) &&
          ((u.style.display = ""),
          (u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
          (u.childNodes[0].style.borderCollapse = "separate"),
          ((e = u.getElementsByTagName("td"))[0].style.cssText =
            "margin:0;border:0;padding:0;display:none"),
          (a = 0 === e[0].offsetHeight) &&
            ((e[0].style.display = ""),
            (e[1].style.display = "none"),
            (a = 0 === e[0].offsetHeight))),
        n.removeChild(c);
    }
    var i,
      r,
      o,
      a,
      s,
      l,
      c = oe.createElement("div"),
      u = oe.createElement("div");
    u.style &&
      ((u.style.cssText = "float:left;opacity:.5"),
      (pe.opacity = "0.5" === u.style.opacity),
      (pe.cssFloat = !!u.style.cssFloat),
      (u.style.backgroundClip = "content-box"),
      (u.cloneNode(!0).style.backgroundClip = ""),
      (pe.clearCloneStyle = "content-box" === u.style.backgroundClip),
      ((c = oe.createElement("div")).style.cssText =
        "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
      (u.innerHTML = ""),
      c.appendChild(u),
      (pe.boxSizing =
        "" === u.style.boxSizing ||
        "" === u.style.MozBoxSizing ||
        "" === u.style.WebkitBoxSizing),
      me.extend(pe, {
        reliableHiddenOffsets: function () {
          return null == i && e(), a;
        },
        boxSizingReliable: function () {
          return null == i && e(), o;
        },
        pixelMarginRight: function () {
          return null == i && e(), r;
        },
        pixelPosition: function () {
          return null == i && e(), i;
        },
        reliableMarginRight: function () {
          return null == i && e(), s;
        },
        reliableMarginLeft: function () {
          return null == i && e(), l;
        },
      }));
  })();
  var yt,
    bt,
    wt = /^(top|right|bottom|left)$/;
  E.getComputedStyle
    ? ((yt = function (e) {
        var t = e.ownerDocument.defaultView;
        return (t && t.opener) || (t = E), t.getComputedStyle(e);
      }),
      (bt = function (e, t, n) {
        var i,
          r,
          o,
          a,
          s = e.style;
        return (
          ("" !==
            (a = (n = n || yt(e))
              ? n.getPropertyValue(t) || n[t]
              : undefined) &&
            a !== undefined) ||
            me.contains(e.ownerDocument, e) ||
            (a = me.style(e, t)),
          n &&
            !pe.pixelMarginRight() &&
            mt.test(a) &&
            ft.test(t) &&
            ((i = s.width),
            (r = s.minWidth),
            (o = s.maxWidth),
            (s.minWidth = s.maxWidth = s.width = a),
            (a = n.width),
            (s.width = i),
            (s.minWidth = r),
            (s.maxWidth = o)),
          a === undefined ? a : a + ""
        );
      }))
    : vt.currentStyle &&
      ((yt = function (e) {
        return e.currentStyle;
      }),
      (bt = function (e, t, n) {
        var i,
          r,
          o,
          a,
          s = e.style;
        return (
          null == (a = (n = n || yt(e)) ? n[t] : undefined) &&
            s &&
            s[t] &&
            (a = s[t]),
          mt.test(a) &&
            !wt.test(t) &&
            ((i = s.left),
            (o = (r = e.runtimeStyle) && r.left) &&
              (r.left = e.currentStyle.left),
            (s.left = "fontSize" === t ? "1em" : a),
            (a = s.pixelLeft + "px"),
            (s.left = i),
            o && (r.left = o)),
          a === undefined ? a : a + "" || "auto"
        );
      }));
  var xt = /alpha\([^)]*\)/i,
    _t = /opacity\s*=\s*([^)]*)/i,
    Et = /^(none|table(?!-c[ea]).+)/,
    St = new RegExp("^(" + He + ")(.*)$", "i"),
    Ct = { position: "absolute", visibility: "hidden", display: "block" },
    kt = { letterSpacing: "0", fontWeight: "400" },
    Tt = ["Webkit", "O", "Moz", "ms"],
    At = oe.createElement("div").style;
  me.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = bt(e, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: pe.cssFloat ? "cssFloat" : "styleFloat" },
    style: function (t, n, i, r) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var o,
          a,
          s,
          l = me.camelCase(n),
          c = t.style;
        if (
          ((n = me.cssProps[l] || (me.cssProps[l] = F(l) || l)),
          (s = me.cssHooks[n] || me.cssHooks[l]),
          i === undefined)
        )
          return s && "get" in s && (o = s.get(t, !1, r)) !== undefined
            ? o
            : c[n];
        if (
          ("string" === (a = typeof i) &&
            (o = Be.exec(i)) &&
            o[1] &&
            ((i = d(t, n, o)), (a = "number")),
          null != i &&
            i == i &&
            ("number" === a &&
              (i += (o && o[3]) || (me.cssNumber[l] ? "" : "px")),
            pe.clearCloneStyle ||
              "" !== i ||
              0 !== n.indexOf("background") ||
              (c[n] = "inherit"),
            !(s && "set" in s && (i = s.set(t, i, r)) === undefined)))
        )
          try {
            c[n] = i;
          } catch (e) {}
      }
    },
    css: function (e, t, n, i) {
      var r,
        o,
        a,
        s = me.camelCase(t);
      return (
        (t = me.cssProps[s] || (me.cssProps[s] = F(s) || s)),
        (a = me.cssHooks[t] || me.cssHooks[s]) &&
          "get" in a &&
          (o = a.get(e, !0, n)),
        o === undefined && (o = bt(e, t, i)),
        "normal" === o && t in kt && (o = kt[t]),
        "" === n || n
          ? ((r = parseFloat(o)), !0 === n || isFinite(r) ? r || 0 : o)
          : o
      );
    },
  }),
    me.each(["height", "width"], function (e, r) {
      me.cssHooks[r] = {
        get: function (e, t, n) {
          if (t)
            return Et.test(me.css(e, "display")) && 0 === e.offsetWidth
              ? gt(e, Ct, function () {
                  return $(e, r, n);
                })
              : $(e, r, n);
        },
        set: function (e, t, n) {
          var i = n && yt(e);
          return R(
            e,
            t,
            n
              ? I(
                  e,
                  r,
                  n,
                  pe.boxSizing &&
                    "border-box" === me.css(e, "boxSizing", !1, i),
                  i
                )
              : 0
          );
        },
      };
    }),
    pe.opacity ||
      (me.cssHooks.opacity = {
        get: function (e, t) {
          return _t.test(
            (t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : t
            ? "1"
            : "";
        },
        set: function (e, t) {
          var n = e.style,
            i = e.currentStyle,
            r = me.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
            o = (i && i.filter) || n.filter || "";
          (((n.zoom = 1) <= t || "" === t) &&
            "" === me.trim(o.replace(xt, "")) &&
            n.removeAttribute &&
            (n.removeAttribute("filter"), "" === t || (i && !i.filter))) ||
            (n.filter = xt.test(o) ? o.replace(xt, r) : o + " " + r);
        },
      }),
    (me.cssHooks.marginRight = L(pe.reliableMarginRight, function (e, t) {
      if (t) return gt(e, { display: "inline-block" }, bt, [e, "marginRight"]);
    })),
    (me.cssHooks.marginLeft = L(pe.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(bt(e, "marginLeft")) ||
            (me.contains(e.ownerDocument, e)
              ? e.getBoundingClientRect().left -
                gt(e, { marginLeft: 0 }, function () {
                  return e.getBoundingClientRect().left;
                })
              : 0)) + "px"
        );
    })),
    me.each({ margin: "", padding: "", border: "Width" }, function (r, o) {
      (me.cssHooks[r + o] = {
        expand: function (e) {
          for (
            var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e];
            t < 4;
            t++
          )
            n[r + qe[t] + o] = i[t] || i[t - 2] || i[0];
          return n;
        },
      }),
        ft.test(r) || (me.cssHooks[r + o].set = R);
    }),
    me.fn.extend({
      css: function (e, t) {
        return ze(
          this,
          function (e, t, n) {
            var i,
              r,
              o = {},
              a = 0;
            if (me.isArray(t)) {
              for (i = yt(e), r = t.length; a < r; a++)
                o[t[a]] = me.css(e, t[a], !1, i);
              return o;
            }
            return n !== undefined ? me.style(e, t, n) : me.css(e, t);
          },
          e,
          t,
          1 < arguments.length
        );
      },
      show: function () {
        return O(this, !0);
      },
      hide: function () {
        return O(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              Ue(this) ? me(this).show() : me(this).hide();
            });
      },
    }),
    ((me.Tween = M).prototype = {
      constructor: M,
      init: function (e, t, n, i, r, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = r || me.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = i),
          (this.unit = o || (me.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = M.propHooks[this.prop];
        return e && e.get ? e.get(this) : M.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = M.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t =
                me.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : M.propHooks._default.set(this),
          this
        );
      },
    }),
    (M.prototype.init.prototype = M.prototype),
    (M.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return 1 !== e.elem.nodeType ||
            (null != e.elem[e.prop] && null == e.elem.style[e.prop])
            ? e.elem[e.prop]
            : (t = me.css(e.elem, e.prop, "")) && "auto" !== t
            ? t
            : 0;
        },
        set: function (e) {
          me.fx.step[e.prop]
            ? me.fx.step[e.prop](e)
            : 1 !== e.elem.nodeType ||
              (null == e.elem.style[me.cssProps[e.prop]] &&
                !me.cssHooks[e.prop])
            ? (e.elem[e.prop] = e.now)
            : me.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }),
    (M.propHooks.scrollTop = M.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (me.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (me.fx = M.prototype.init),
    (me.fx.step = {});
  var Nt,
    jt,
    Dt,
    Pt,
    Lt,
    Ft,
    Ot,
    Rt = /^(?:toggle|show|hide)$/,
    It = /queueHooks$/;
  (me.Animation = me.extend(W, {
    tweeners: {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t);
          return d(n.elem, e, Be.exec(t), n), n;
        },
      ],
    },
    tweener: function (e, t) {
      me.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.match(Pe));
      for (var n, i = 0, r = e.length; i < r; i++)
        (n = e[i]),
          (W.tweeners[n] = W.tweeners[n] || []),
          W.tweeners[n].unshift(t);
    },
    prefilters: [U],
    prefilter: function (e, t) {
      t ? W.prefilters.unshift(e) : W.prefilters.push(e);
    },
  })),
    (me.speed = function (e, t, n) {
      var i =
        e && "object" == typeof e
          ? me.extend({}, e)
          : {
              complete: n || (!n && t) || (me.isFunction(e) && e),
              duration: e,
              easing: (n && t) || (t && !me.isFunction(t) && t),
            };
      return (
        (i.duration = me.fx.off
          ? 0
          : "number" == typeof i.duration
          ? i.duration
          : i.duration in me.fx.speeds
          ? me.fx.speeds[i.duration]
          : me.fx.speeds._default),
        (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
        (i.old = i.complete),
        (i.complete = function () {
          me.isFunction(i.old) && i.old.call(this),
            i.queue && me.dequeue(this, i.queue);
        }),
        i
      );
    }),
    me.fn.extend({
      fadeTo: function (e, t, n, i) {
        return this.filter(Ue)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, i);
      },
      animate: function (t, e, n, i) {
        var r = me.isEmptyObject(t),
          o = me.speed(e, n, i),
          a = function () {
            var e = W(this, me.extend({}, t), o);
            (r || me._data(this, "finish")) && e.stop(!0);
          };
        return (
          (a.finish = a),
          r || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        );
      },
      stop: function (r, e, o) {
        var a = function (e) {
          var t = e.stop;
          delete e.stop, t(o);
        };
        return (
          "string" != typeof r && ((o = e), (e = r), (r = undefined)),
          e && !1 !== r && this.queue(r || "fx", []),
          this.each(function () {
            var e = !0,
              t = null != r && r + "queueHooks",
              n = me.timers,
              i = me._data(this);
            if (t) i[t] && i[t].stop && a(i[t]);
            else for (t in i) i[t] && i[t].stop && It.test(t) && a(i[t]);
            for (t = n.length; t--; )
              n[t].elem !== this ||
                (null != r && n[t].queue !== r) ||
                (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
            (!e && o) || me.dequeue(this, r);
          })
        );
      },
      finish: function (a) {
        return (
          !1 !== a && (a = a || "fx"),
          this.each(function () {
            var e,
              t = me._data(this),
              n = t[a + "queue"],
              i = t[a + "queueHooks"],
              r = me.timers,
              o = n ? n.length : 0;
            for (
              t.finish = !0,
                me.queue(this, a, []),
                i && i.stop && i.stop.call(this, !0),
                e = r.length;
              e--;

            )
              r[e].elem === this &&
                r[e].queue === a &&
                (r[e].anim.stop(!0), r.splice(e, 1));
            for (e = 0; e < o; e++)
              n[e] && n[e].finish && n[e].finish.call(this);
            delete t.finish;
          })
        );
      },
    }),
    me.each(["toggle", "show", "hide"], function (e, i) {
      var r = me.fn[i];
      me.fn[i] = function (e, t, n) {
        return null == e || "boolean" == typeof e
          ? r.apply(this, arguments)
          : this.animate(B(i, !0), e, t, n);
      };
    }),
    me.each(
      {
        slideDown: B("show"),
        slideUp: B("hide"),
        slideToggle: B("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, i) {
        me.fn[e] = function (e, t, n) {
          return this.animate(i, e, t, n);
        };
      }
    ),
    (me.timers = []),
    (me.fx.tick = function () {
      var e,
        t = me.timers,
        n = 0;
      for (Nt = me.now(); n < t.length; n++)
        (e = t[n])() || t[n] !== e || t.splice(n--, 1);
      t.length || me.fx.stop(), (Nt = undefined);
    }),
    (me.fx.timer = function (e) {
      me.timers.push(e), e() ? me.fx.start() : me.timers.pop();
    }),
    (me.fx.interval = 13),
    (me.fx.start = function () {
      jt || (jt = E.setInterval(me.fx.tick, me.fx.interval));
    }),
    (me.fx.stop = function () {
      E.clearInterval(jt), (jt = null);
    }),
    (me.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (me.fn.delay = function (i, e) {
      return (
        (i = (me.fx && me.fx.speeds[i]) || i),
        (e = e || "fx"),
        this.queue(e, function (e, t) {
          var n = E.setTimeout(e, i);
          t.stop = function () {
            E.clearTimeout(n);
          };
        })
      );
    }),
    (Pt = oe.createElement("input")),
    (Lt = oe.createElement("div")),
    (Ft = oe.createElement("select")),
    (Ot = Ft.appendChild(oe.createElement("option"))),
    (Lt = oe.createElement("div")).setAttribute("className", "t"),
    (Lt.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
    (Dt = Lt.getElementsByTagName("a")[0]),
    Pt.setAttribute("type", "checkbox"),
    Lt.appendChild(Pt),
    ((Dt = Lt.getElementsByTagName("a")[0]).style.cssText = "top:1px"),
    (pe.getSetAttribute = "t" !== Lt.className),
    (pe.style = /top/.test(Dt.getAttribute("style"))),
    (pe.hrefNormalized = "/a" === Dt.getAttribute("href")),
    (pe.checkOn = !!Pt.value),
    (pe.optSelected = Ot.selected),
    (pe.enctype = !!oe.createElement("form").enctype),
    (Ft.disabled = !0),
    (pe.optDisabled = !Ot.disabled),
    (Pt = oe.createElement("input")).setAttribute("value", ""),
    (pe.input = "" === Pt.getAttribute("value")),
    (Pt.value = "t"),
    Pt.setAttribute("type", "radio"),
    (pe.radioValue = "t" === Pt.value);
  var $t = /\r/g,
    Mt = /[\x20\t\r\n\f]+/g;
  me.fn.extend({
    val: function (n) {
      var i,
        e,
        r,
        t = this[0];
      return arguments.length
        ? ((r = me.isFunction(n)),
          this.each(function (e) {
            var t;
            1 === this.nodeType &&
              (null == (t = r ? n.call(this, e, me(this).val()) : n)
                ? (t = "")
                : "number" == typeof t
                ? (t += "")
                : me.isArray(t) &&
                  (t = me.map(t, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((i =
                me.valHooks[this.type] ||
                me.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in i &&
                i.set(this, t, "value") !== undefined) ||
                (this.value = t));
          }))
        : t
        ? (i = me.valHooks[t.type] || me.valHooks[t.nodeName.toLowerCase()]) &&
          "get" in i &&
          (e = i.get(t, "value")) !== undefined
          ? e
          : "string" == typeof (e = t.value)
          ? e.replace($t, "")
          : null == e
          ? ""
          : e
        : void 0;
    },
  }),
    me.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = me.find.attr(e, "value");
            return null != t ? t : me.trim(me.text(e)).replace(Mt, " ");
          },
        },
        select: {
          get: function (e) {
            for (
              var t,
                n,
                i = e.options,
                r = e.selectedIndex,
                o = "select-one" === e.type || r < 0,
                a = o ? null : [],
                s = o ? r + 1 : i.length,
                l = r < 0 ? s : o ? r : 0;
              l < s;
              l++
            )
              if (
                ((n = i[l]).selected || l === r) &&
                (pe.optDisabled
                  ? !n.disabled
                  : null === n.getAttribute("disabled")) &&
                (!n.parentNode.disabled ||
                  !me.nodeName(n.parentNode, "optgroup"))
              ) {
                if (((t = me(n).val()), o)) return t;
                a.push(t);
              }
            return a;
          },
          set: function (e, t) {
            for (
              var n, i, r = e.options, o = me.makeArray(t), a = r.length;
              a--;

            )
              if (((i = r[a]), -1 < me.inArray(me.valHooks.option.get(i), o)))
                try {
                  i.selected = n = !0;
                } catch (_) {
                  i.scrollHeight;
                }
              else i.selected = !1;
            return n || (e.selectedIndex = -1), r;
          },
        },
      },
    }),
    me.each(["radio", "checkbox"], function () {
      (me.valHooks[this] = {
        set: function (e, t) {
          if (me.isArray(t))
            return (e.checked = -1 < me.inArray(me(e).val(), t));
        },
      }),
        pe.checkOn ||
          (me.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    });
  var Ht,
    Bt,
    qt = me.expr.attrHandle,
    Ut = /^(?:checked|selected)$/i,
    zt = pe.getSetAttribute,
    Wt = pe.input;
  me.fn.extend({
    attr: function (e, t) {
      return ze(this, me.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function (e) {
      return this.each(function () {
        me.removeAttr(this, e);
      });
    },
  }),
    me.extend({
      attr: function (e, t, n) {
        var i,
          r,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return "undefined" == typeof e.getAttribute
            ? me.prop(e, t, n)
            : ((1 === o && me.isXMLDoc(e)) ||
                ((t = t.toLowerCase()),
                (r =
                  me.attrHooks[t] || (me.expr.match.bool.test(t) ? Bt : Ht))),
              n !== undefined
                ? null === n
                  ? void me.removeAttr(e, t)
                  : r && "set" in r && (i = r.set(e, n, t)) !== undefined
                  ? i
                  : (e.setAttribute(t, n + ""), n)
                : r && "get" in r && null !== (i = r.get(e, t))
                ? i
                : null == (i = me.find.attr(e, t))
                ? undefined
                : i);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!pe.radioValue && "radio" === t && me.nodeName(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var n,
          i,
          r = 0,
          o = t && t.match(Pe);
        if (o && 1 === e.nodeType)
          for (; (n = o[r++]); )
            (i = me.propFix[n] || n),
              me.expr.match.bool.test(n)
                ? (Wt && zt) || !Ut.test(n)
                  ? (e[i] = !1)
                  : (e[me.camelCase("default-" + n)] = e[i] = !1)
                : me.attr(e, n, ""),
              e.removeAttribute(zt ? n : i);
      },
    }),
    (Bt = {
      set: function (e, t, n) {
        return (
          !1 === t
            ? me.removeAttr(e, n)
            : (Wt && zt) || !Ut.test(n)
            ? e.setAttribute((!zt && me.propFix[n]) || n, n)
            : (e[me.camelCase("default-" + n)] = e[n] = !0),
          n
        );
      },
    }),
    me.each(me.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var o = qt[t] || me.find.attr;
      (Wt && zt) || !Ut.test(t)
        ? (qt[t] = function (e, t, n) {
            var i, r;
            return (
              n ||
                ((r = qt[t]),
                (qt[t] = i),
                (i = null != o(e, t, n) ? t.toLowerCase() : null),
                (qt[t] = r)),
              i
            );
          })
        : (qt[t] = function (e, t, n) {
            if (!n)
              return e[me.camelCase("default-" + t)] ? t.toLowerCase() : null;
          });
    }),
    (Wt && zt) ||
      (me.attrHooks.value = {
        set: function (e, t, n) {
          if (!me.nodeName(e, "input")) return Ht && Ht.set(e, t, n);
          e.defaultValue = t;
        },
      }),
    zt ||
      ((Ht = {
        set: function (e, t, n) {
          var i = e.getAttributeNode(n);
          if (
            (i || e.setAttributeNode((i = e.ownerDocument.createAttribute(n))),
            (i.value = t += ""),
            "value" === n || t === e.getAttribute(n))
          )
            return t;
        },
      }),
      (qt.id =
        qt.name =
        qt.coords =
          function (e, t, n) {
            var i;
            if (!n)
              return (i = e.getAttributeNode(t)) && "" !== i.value
                ? i.value
                : null;
          }),
      (me.valHooks.button = {
        get: function (e, t) {
          var n = e.getAttributeNode(t);
          if (n && n.specified) return n.value;
        },
        set: Ht.set,
      }),
      (me.attrHooks.contenteditable = {
        set: function (e, t, n) {
          Ht.set(e, "" !== t && t, n);
        },
      }),
      me.each(["width", "height"], function (e, n) {
        me.attrHooks[n] = {
          set: function (e, t) {
            if ("" === t) return e.setAttribute(n, "auto"), t;
          },
        };
      })),
    pe.style ||
      (me.attrHooks.style = {
        get: function (e) {
          return e.style.cssText || undefined;
        },
        set: function (e, t) {
          return (e.style.cssText = t + "");
        },
      });
  var Vt = /^(?:input|select|textarea|button|object)$/i,
    Jt = /^(?:a|area)$/i;
  me.fn.extend({
    prop: function (e, t) {
      return ze(this, me.prop, e, t, 1 < arguments.length);
    },
    removeProp: function (t) {
      return (
        (t = me.propFix[t] || t),
        this.each(function () {
          try {
            (this[t] = undefined), delete this[t];
          } catch (e) {}
        })
      );
    },
  }),
    me.extend({
      prop: function (e, t, n) {
        var i,
          r,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && me.isXMLDoc(e)) ||
              ((t = me.propFix[t] || t), (r = me.propHooks[t])),
            n !== undefined
              ? r && "set" in r && (i = r.set(e, n, t)) !== undefined
                ? i
                : (e[t] = n)
              : r && "get" in r && null !== (i = r.get(e, t))
              ? i
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = me.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : Vt.test(e.nodeName) || (Jt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    pe.hrefNormalized ||
      me.each(["href", "src"], function (e, t) {
        me.propHooks[t] = {
          get: function (e) {
            return e.getAttribute(t, 4);
          },
        };
      }),
    pe.optSelected ||
      (me.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return (
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
          );
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    me.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        me.propFix[this.toLowerCase()] = this;
      }
    ),
    pe.enctype || (me.propFix.enctype = "encoding");
  var Xt = /[\t\r\n\f]/g;
  me.fn.extend({
    addClass: function (t) {
      var e,
        n,
        i,
        r,
        o,
        a,
        s,
        l = 0;
      if (me.isFunction(t))
        return this.each(function (e) {
          me(this).addClass(t.call(this, e, V(this)));
        });
      if ("string" == typeof t && t)
        for (e = t.match(Pe) || []; (n = this[l++]); )
          if (
            ((r = V(n)),
            (i = 1 === n.nodeType && (" " + r + " ").replace(Xt, " ")))
          ) {
            for (a = 0; (o = e[a++]); )
              i.indexOf(" " + o + " ") < 0 && (i += o + " ");
            r !== (s = me.trim(i)) && me.attr(n, "class", s);
          }
      return this;
    },
    removeClass: function (t) {
      var e,
        n,
        i,
        r,
        o,
        a,
        s,
        l = 0;
      if (me.isFunction(t))
        return this.each(function (e) {
          me(this).removeClass(t.call(this, e, V(this)));
        });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof t && t)
        for (e = t.match(Pe) || []; (n = this[l++]); )
          if (
            ((r = V(n)),
            (i = 1 === n.nodeType && (" " + r + " ").replace(Xt, " ")))
          ) {
            for (a = 0; (o = e[a++]); )
              for (; -1 < i.indexOf(" " + o + " "); )
                i = i.replace(" " + o + " ", " ");
            r !== (s = me.trim(i)) && me.attr(n, "class", s);
          }
      return this;
    },
    toggleClass: function (r, t) {
      var o = typeof r;
      return "boolean" == typeof t && "string" === o
        ? t
          ? this.addClass(r)
          : this.removeClass(r)
        : me.isFunction(r)
        ? this.each(function (e) {
            me(this).toggleClass(r.call(this, e, V(this), t), t);
          })
        : this.each(function () {
            var e, t, n, i;
            if ("string" === o)
              for (t = 0, n = me(this), i = r.match(Pe) || []; (e = i[t++]); )
                n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
            else
              (r !== undefined && "boolean" !== o) ||
                ((e = V(this)) && me._data(this, "__className__", e),
                me.attr(
                  this,
                  "class",
                  e || !1 === r ? "" : me._data(this, "__className__") || ""
                ));
          });
    },
    hasClass: function (e) {
      var t,
        n,
        i = 0;
      for (t = " " + e + " "; (n = this[i++]); )
        if (
          1 === n.nodeType &&
          -1 < (" " + V(n) + " ").replace(Xt, " ").indexOf(t)
        )
          return !0;
      return !1;
    },
  }),
    me.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (e, n) {
        me.fn[n] = function (e, t) {
          return 0 < arguments.length
            ? this.on(n, null, e, t)
            : this.trigger(n);
        };
      }
    ),
    me.fn.extend({
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
    });
  var Gt = E.location,
    Kt = me.now(),
    Qt = /\?/,
    Yt =
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (me.parseJSON = function (e) {
    if (E.JSON && E.JSON.parse) return E.JSON.parse(e + "");
    var r,
      o = null,
      t = me.trim(e + "");
    return t &&
      !me.trim(
        t.replace(Yt, function (e, t, n, i) {
          return (
            r && t && (o = 0), 0 === o ? e : ((r = n || t), (o += !i - !n), "")
          );
        })
      )
      ? Function("return " + t)()
      : me.error("Invalid JSON: " + e);
  }),
    (me.parseXML = function (t) {
      var n;
      if (!t || "string" != typeof t) return null;
      try {
        E.DOMParser
          ? (n = new E.DOMParser().parseFromString(t, "text/xml"))
          : (((n = new E.ActiveXObject("Microsoft.XMLDOM")).async = "false"),
            n.loadXML(t));
      } catch (e) {
        n = undefined;
      }
      return (
        (n &&
          n.documentElement &&
          !n.getElementsByTagName("parsererror").length) ||
          me.error("Invalid XML: " + t),
        n
      );
    });
  var Zt = /#.*$/,
    en = /([?&])_=[^&]*/,
    tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    nn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rn = /^(?:GET|HEAD)$/,
    on = /^\/\//,
    an = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    sn = {},
    ln = {},
    cn = "*/".concat("*"),
    un = Gt.href,
    hn = an.exec(un.toLowerCase()) || [];
  me.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: un,
      type: "GET",
      isLocal: nn.test(hn[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": cn,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON",
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": me.parseJSON,
        "text xml": me.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (e, t) {
      return t ? G(G(e, me.ajaxSettings), t) : G(me.ajaxSettings, e);
    },
    ajaxPrefilter: J(sn),
    ajaxTransport: J(ln),
    ajax: function (t, n) {
      function i(e, t, n, i) {
        var r,
          o,
          a,
          s,
          l,
          c = t;
        2 !== x &&
          ((x = 2),
          d && E.clearTimeout(d),
          (f = undefined),
          (h = i || ""),
          (_.readyState = 0 < e ? 4 : 0),
          (r = (200 <= e && e < 300) || 304 === e),
          n && (s = K(m, _, n)),
          (s = Q(m, s, _, r)),
          r
            ? (m.ifModified &&
                ((l = _.getResponseHeader("Last-Modified")) &&
                  (me.lastModified[u] = l),
                (l = _.getResponseHeader("etag")) && (me.etag[u] = l)),
              204 === e || "HEAD" === m.type
                ? (c = "nocontent")
                : 304 === e
                ? (c = "notmodified")
                : ((c = s.state), (o = s.data), (r = !(a = s.error))))
            : ((a = c), (!e && c) || ((c = "error"), e < 0 && (e = 0))),
          (_.status = e),
          (_.statusText = (t || c) + ""),
          r ? y.resolveWith(g, [o, c, _]) : y.rejectWith(g, [_, c, a]),
          _.statusCode(w),
          (w = undefined),
          p && v.trigger(r ? "ajaxSuccess" : "ajaxError", [_, m, r ? o : a]),
          b.fireWith(g, [_, c]),
          p &&
            (v.trigger("ajaxComplete", [_, m]),
            --me.active || me.event.trigger("ajaxStop")));
      }
      "object" == typeof t && ((n = t), (t = undefined)), (n = n || {});
      var r,
        o,
        u,
        h,
        d,
        p,
        f,
        a,
        m = me.ajaxSetup({}, n),
        g = m.context || m,
        v = m.context && (g.nodeType || g.jquery) ? me(g) : me.event,
        y = me.Deferred(),
        b = me.Callbacks("once memory"),
        w = m.statusCode || {},
        s = {},
        l = {},
        x = 0,
        c = "canceled",
        _ = {
          readyState: 0,
          getResponseHeader: function (e) {
            var t;
            if (2 === x) {
              if (!a)
                for (a = {}; (t = tn.exec(h)); ) a[t[1].toLowerCase()] = t[2];
              t = a[e.toLowerCase()];
            }
            return null == t ? null : t;
          },
          getAllResponseHeaders: function () {
            return 2 === x ? h : null;
          },
          setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return x || ((e = l[n] = l[n] || e), (s[e] = t)), this;
          },
          overrideMimeType: function (e) {
            return x || (m.mimeType = e), this;
          },
          statusCode: function (e) {
            var t;
            if (e)
              if (x < 2) for (t in e) w[t] = [w[t], e[t]];
              else _.always(e[_.status]);
            return this;
          },
          abort: function (e) {
            var t = e || c;
            return f && f.abort(t), i(0, t), this;
          },
        };
      if (
        ((y.promise(_).complete = b.add),
        (_.success = _.done),
        (_.error = _.fail),
        (m.url = ((t || m.url || un) + "")
          .replace(Zt, "")
          .replace(on, hn[1] + "//")),
        (m.type = n.method || n.type || m.method || m.type),
        (m.dataTypes = me
          .trim(m.dataType || "*")
          .toLowerCase()
          .match(Pe) || [""]),
        null == m.crossDomain &&
          ((r = an.exec(m.url.toLowerCase())),
          (m.crossDomain = !(
            !r ||
            (r[1] === hn[1] &&
              r[2] === hn[2] &&
              (r[3] || ("http:" === r[1] ? "80" : "443")) ===
                (hn[3] || ("http:" === hn[1] ? "80" : "443")))
          ))),
        m.data &&
          m.processData &&
          "string" != typeof m.data &&
          (m.data = me.param(m.data, m.traditional)),
        X(sn, m, n, _),
        2 === x)
      )
        return _;
      for (o in ((p = me.event && m.global) &&
        0 == me.active++ &&
        me.event.trigger("ajaxStart"),
      (m.type = m.type.toUpperCase()),
      (m.hasContent = !rn.test(m.type)),
      (u = m.url),
      m.hasContent ||
        (m.data &&
          ((u = m.url += (Qt.test(u) ? "&" : "?") + m.data), delete m.data),
        !1 === m.cache &&
          (m.url = en.test(u)
            ? u.replace(en, "$1_=" + Kt++)
            : u + (Qt.test(u) ? "&" : "?") + "_=" + Kt++)),
      m.ifModified &&
        (me.lastModified[u] &&
          _.setRequestHeader("If-Modified-Since", me.lastModified[u]),
        me.etag[u] && _.setRequestHeader("If-None-Match", me.etag[u])),
      ((m.data && m.hasContent && !1 !== m.contentType) || n.contentType) &&
        _.setRequestHeader("Content-Type", m.contentType),
      _.setRequestHeader(
        "Accept",
        m.dataTypes[0] && m.accepts[m.dataTypes[0]]
          ? m.accepts[m.dataTypes[0]] +
              ("*" !== m.dataTypes[0] ? ", " + cn + "; q=0.01" : "")
          : m.accepts["*"]
      ),
      m.headers))
        _.setRequestHeader(o, m.headers[o]);
      if (m.beforeSend && (!1 === m.beforeSend.call(g, _, m) || 2 === x))
        return _.abort();
      for (o in ((c = "abort"), { success: 1, error: 1, complete: 1 }))
        _[o](m[o]);
      if ((f = X(ln, m, n, _))) {
        if (((_.readyState = 1), p && v.trigger("ajaxSend", [_, m]), 2 === x))
          return _;
        m.async &&
          0 < m.timeout &&
          (d = E.setTimeout(function () {
            _.abort("timeout");
          }, m.timeout));
        try {
          (x = 1), f.send(s, i);
        } catch (e) {
          if (!(x < 2)) throw e;
          i(-1, e);
        }
      } else i(-1, "No Transport");
      return _;
    },
    getJSON: function (e, t, n) {
      return me.get(e, t, n, "json");
    },
    getScript: function (e, t) {
      return me.get(e, undefined, t, "script");
    },
  }),
    me.each(["get", "post"], function (e, r) {
      me[r] = function (e, t, n, i) {
        return (
          me.isFunction(t) && ((i = i || n), (n = t), (t = undefined)),
          me.ajax(
            me.extend(
              { url: e, type: r, dataType: i, data: t, success: n },
              me.isPlainObject(e) && e
            )
          )
        );
      };
    }),
    (me._evalUrl = function (e) {
      return me.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    me.fn.extend({
      wrapAll: function (t) {
        if (me.isFunction(t))
          return this.each(function (e) {
            me(this).wrapAll(t.call(this, e));
          });
        if (this[0]) {
          var e = me(t, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && e.insertBefore(this[0]),
            e
              .map(function () {
                for (
                  var e = this;
                  e.firstChild && 1 === e.firstChild.nodeType;

                )
                  e = e.firstChild;
                return e;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (n) {
        return me.isFunction(n)
          ? this.each(function (e) {
              me(this).wrapInner(n.call(this, e));
            })
          : this.each(function () {
              var e = me(this),
                t = e.contents();
              t.length ? t.wrapAll(n) : e.append(n);
            });
      },
      wrap: function (t) {
        var n = me.isFunction(t);
        return this.each(function (e) {
          me(this).wrapAll(n ? t.call(this, e) : t);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            me.nodeName(this, "body") || me(this).replaceWith(this.childNodes);
          })
          .end();
      },
    }),
    (me.expr.filters.hidden = function (e) {
      return pe.reliableHiddenOffsets()
        ? e.offsetWidth <= 0 &&
            e.offsetHeight <= 0 &&
            !e.getClientRects().length
        : Z(e);
    }),
    (me.expr.filters.visible = function (e) {
      return !me.expr.filters.hidden(e);
    });
  var dn = /%20/g,
    pn = /\[\]$/,
    fn = /\r?\n/g,
    mn = /^(?:submit|button|image|reset|file)$/i,
    gn = /^(?:input|select|textarea|keygen)/i;
  (me.param = function (e, t) {
    var n,
      i = [],
      r = function (e, t) {
        (t = me.isFunction(t) ? t() : null == t ? "" : t),
          (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
      };
    if (
      (t === undefined && (t = me.ajaxSettings && me.ajaxSettings.traditional),
      me.isArray(e) || (e.jquery && !me.isPlainObject(e)))
    )
      me.each(e, function () {
        r(this.name, this.value);
      });
    else for (n in e) ee(n, e[n], t, r);
    return i.join("&").replace(dn, "+");
  }),
    me.fn.extend({
      serialize: function () {
        return me.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = me.prop(this, "elements");
          return e ? me.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !me(this).is(":disabled") &&
              gn.test(this.nodeName) &&
              !mn.test(e) &&
              (this.checked || !We.test(e))
            );
          })
          .map(function (e, t) {
            var n = me(this).val();
            return null == n
              ? null
              : me.isArray(n)
              ? me.map(n, function (e) {
                  return { name: t.name, value: e.replace(fn, "\r\n") };
                })
              : { name: t.name, value: n.replace(fn, "\r\n") };
          })
          .get();
      },
    }),
    (me.ajaxSettings.xhr =
      E.ActiveXObject !== undefined
        ? function () {
            return this.isLocal
              ? ne()
              : 8 < oe.documentMode
              ? te()
              : (/^(get|post|head|put|delete|options)$/i.test(this.type) &&
                  te()) ||
                ne();
          }
        : te);
  var vn = 0,
    yn = {},
    bn = me.ajaxSettings.xhr();
  E.attachEvent &&
    E.attachEvent("onunload", function () {
      for (var e in yn) yn[e](undefined, !0);
    }),
    (pe.cors = !!bn && "withCredentials" in bn),
    (bn = pe.ajax = !!bn) &&
      me.ajaxTransport(function (c) {
        var u;
        if (!c.crossDomain || pe.cors)
          return {
            send: function (t, a) {
              var n,
                s = c.xhr(),
                l = ++vn;
              if (
                (s.open(c.type, c.url, c.async, c.username, c.password),
                c.xhrFields)
              )
                for (n in c.xhrFields) s[n] = c.xhrFields[n];
              for (n in (c.mimeType &&
                s.overrideMimeType &&
                s.overrideMimeType(c.mimeType),
              c.crossDomain ||
                t["X-Requested-With"] ||
                (t["X-Requested-With"] = "XMLHttpRequest"),
              t))
                t[n] !== undefined && s.setRequestHeader(n, t[n] + "");
              s.send((c.hasContent && c.data) || null),
                (u = function (t, n) {
                  var i, r, o;
                  if (u && (n || 4 === s.readyState))
                    if (
                      (delete yn[l],
                      (u = undefined),
                      (s.onreadystatechange = me.noop),
                      n)
                    )
                      4 !== s.readyState && s.abort();
                    else {
                      (o = {}),
                        (i = s.status),
                        "string" == typeof s.responseText &&
                          (o.text = s.responseText);
                      try {
                        r = s.statusText;
                      } catch (e) {
                        r = "";
                      }
                      i || !c.isLocal || c.crossDomain
                        ? 1223 === i && (i = 204)
                        : (i = o.text ? 200 : 404);
                    }
                  o && a(i, r, o, s.getAllResponseHeaders());
                }),
                c.async
                  ? 4 === s.readyState
                    ? E.setTimeout(u)
                    : (s.onreadystatechange = yn[l] = u)
                  : u();
            },
            abort: function () {
              u && u(undefined, !0);
            },
          };
      }),
    me.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return me.globalEval(e), e;
        },
      },
    }),
    me.ajaxPrefilter("script", function (e) {
      e.cache === undefined && (e.cache = !1),
        e.crossDomain && ((e.type = "GET"), (e.global = !1));
    }),
    me.ajaxTransport("script", function (t) {
      if (t.crossDomain) {
        var i,
          r = oe.head || me("head")[0] || oe.documentElement;
        return {
          send: function (e, n) {
            ((i = oe.createElement("script")).async = !0),
              t.scriptCharset && (i.charset = t.scriptCharset),
              (i.src = t.url),
              (i.onload = i.onreadystatechange =
                function (e, t) {
                  (t ||
                    !i.readyState ||
                    /loaded|complete/.test(i.readyState)) &&
                    ((i.onload = i.onreadystatechange = null),
                    i.parentNode && i.parentNode.removeChild(i),
                    (i = null),
                    t || n(200, "success"));
                }),
              r.insertBefore(i, r.firstChild);
          },
          abort: function () {
            i && i.onload(undefined, !0);
          },
        };
      }
    });
  var wn = [],
    xn = /(=)\?(?=&|$)|\?\?/;
  me.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = wn.pop() || me.expando + "_" + Kt++;
      return (this[e] = !0), e;
    },
  }),
    me.ajaxPrefilter("json jsonp", function (e, t, n) {
      var i,
        r,
        o,
        a =
          !1 !== e.jsonp &&
          (xn.test(e.url)
            ? "url"
            : "string" == typeof e.data &&
              0 ===
                (e.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              xn.test(e.data) &&
              "data");
      if (a || "jsonp" === e.dataTypes[0])
        return (
          (i = e.jsonpCallback =
            me.isFunction(e.jsonpCallback)
              ? e.jsonpCallback()
              : e.jsonpCallback),
          a
            ? (e[a] = e[a].replace(xn, "$1" + i))
            : !1 !== e.jsonp &&
              (e.url += (Qt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
          (e.converters["script json"] = function () {
            return o || me.error(i + " was not called"), o[0];
          }),
          (e.dataTypes[0] = "json"),
          (r = E[i]),
          (E[i] = function () {
            o = arguments;
          }),
          n.always(function () {
            r === undefined ? me(E).removeProp(i) : (E[i] = r),
              e[i] && ((e.jsonpCallback = t.jsonpCallback), wn.push(i)),
              o && me.isFunction(r) && r(o[0]),
              (o = r = undefined);
          }),
          "script"
        );
    }),
    (me.parseHTML = function (e, t, n) {
      if (!e || "string" != typeof e) return null;
      "boolean" == typeof t && ((n = t), (t = !1)), (t = t || oe);
      var i = Se.exec(e),
        r = !n && [];
      return i
        ? [t.createElement(i[1])]
        : ((i = m([e], t, r)),
          r && r.length && me(r).remove(),
          me.merge([], i.childNodes));
    });
  var _n = me.fn.load;
  (me.fn.load = function (e, t, n) {
    if ("string" != typeof e && _n) return _n.apply(this, arguments);
    var i,
      r,
      o,
      a = this,
      s = e.indexOf(" ");
    return (
      -1 < s && ((i = me.trim(e.slice(s, e.length))), (e = e.slice(0, s))),
      me.isFunction(t)
        ? ((n = t), (t = undefined))
        : t && "object" == typeof t && (r = "POST"),
      0 < a.length &&
        me
          .ajax({ url: e, type: r || "GET", dataType: "html", data: t })
          .done(function (e) {
            (o = arguments),
              a.html(i ? me("<div>").append(me.parseHTML(e)).find(i) : e);
          })
          .always(
            n &&
              function (e, t) {
                a.each(function () {
                  n.apply(this, o || [e.responseText, t, e]);
                });
              }
          ),
      this
    );
  }),
    me.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        me.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    (me.expr.filters.animated = function (t) {
      return me.grep(me.timers, function (e) {
        return t === e.elem;
      }).length;
    }),
    (me.offset = {
      setOffset: function (e, t, n) {
        var i,
          r,
          o,
          a,
          s,
          l,
          c = me.css(e, "position"),
          u = me(e),
          h = {};
        "static" === c && (e.style.position = "relative"),
          (s = u.offset()),
          (o = me.css(e, "top")),
          (l = me.css(e, "left")),
          ("absolute" === c || "fixed" === c) && -1 < me.inArray("auto", [o, l])
            ? ((a = (i = u.position()).top), (r = i.left))
            : ((a = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
          me.isFunction(t) && (t = t.call(e, n, me.extend({}, s))),
          null != t.top && (h.top = t.top - s.top + a),
          null != t.left && (h.left = t.left - s.left + r),
          "using" in t ? t.using.call(e, h) : u.css(h);
      },
    }),
    me.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return t === undefined
            ? this
            : this.each(function (e) {
                me.offset.setOffset(this, t, e);
              });
        var e,
          n,
          i = { top: 0, left: 0 },
          r = this[0],
          o = r && r.ownerDocument;
        return o
          ? ((e = o.documentElement),
            me.contains(e, r)
              ? ("undefined" != typeof r.getBoundingClientRect &&
                  (i = r.getBoundingClientRect()),
                (n = ie(o)),
                {
                  top:
                    i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                  left:
                    i.left +
                    (n.pageXOffset || e.scrollLeft) -
                    (e.clientLeft || 0),
                })
              : i)
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            n = { top: 0, left: 0 },
            i = this[0];
          return (
            "fixed" === me.css(i, "position")
              ? (t = i.getBoundingClientRect())
              : ((e = this.offsetParent()),
                (t = this.offset()),
                me.nodeName(e[0], "html") || (n = e.offset()),
                (n.top += me.css(e[0], "borderTopWidth", !0)),
                (n.left += me.css(e[0], "borderLeftWidth", !0))),
            {
              top: t.top - n.top - me.css(i, "marginTop", !0),
              left: t.left - n.left - me.css(i, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent;
            e && !me.nodeName(e, "html") && "static" === me.css(e, "position");

          )
            e = e.offsetParent;
          return e || vt;
        });
      },
    }),
    me.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (t, r) {
        var o = /Y/.test(r);
        me.fn[t] = function (e) {
          return ze(
            this,
            function (e, t, n) {
              var i = ie(e);
              if (n === undefined)
                return i
                  ? r in i
                    ? i[r]
                    : i.document.documentElement[t]
                  : e[t];
              i
                ? i.scrollTo(
                    o ? me(i).scrollLeft() : n,
                    o ? n : me(i).scrollTop()
                  )
                : (e[t] = n);
            },
            t,
            e,
            arguments.length,
            null
          );
        };
      }
    ),
    me.each(["top", "left"], function (e, n) {
      me.cssHooks[n] = L(pe.pixelPosition, function (e, t) {
        if (t)
          return (t = bt(e, n)), mt.test(t) ? me(e).position()[n] + "px" : t;
      });
    }),
    me.each({ Height: "height", Width: "width" }, function (o, a) {
      me.each(
        { padding: "inner" + o, content: a, "": "outer" + o },
        function (i, e) {
          me.fn[e] = function (e, t) {
            var n = arguments.length && (i || "boolean" != typeof e),
              r = i || (!0 === e || !0 === t ? "margin" : "border");
            return ze(
              this,
              function (e, t, n) {
                var i;
                return me.isWindow(e)
                  ? e.document.documentElement["client" + o]
                  : 9 === e.nodeType
                  ? ((i = e.documentElement),
                    Math.max(
                      e.body["scroll" + o],
                      i["scroll" + o],
                      e.body["offset" + o],
                      i["offset" + o],
                      i["client" + o]
                    ))
                  : n === undefined
                  ? me.css(e, t, r)
                  : me.style(e, t, n, r);
              },
              a,
              n ? e : undefined,
              n,
              null
            );
          };
        }
      );
    }),
    me.fn.extend({
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, i) {
        return this.on(t, e, n, i);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
    }),
    (me.fn.size = function () {
      return this.length;
    }),
    (me.fn.andSelf = me.fn.addBack),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return me;
      });
  var En = E.jQuery,
    Sn = E.$;
  return (
    (me.noConflict = function (e) {
      return (
        E.$ === me && (E.$ = Sn), e && E.jQuery === me && (E.jQuery = En), me
      );
    }),
    t || (E.jQuery = E.$ = me),
    me
  );
}),
  (function (u, l) {
    "use strict";
    var c;
    u.rails !== l && u.error("jquery-ujs has already been loaded!");
    var t = u(document);
    (u.rails = c =
      {
        linkClickSelector:
          "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector:
          "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector:
          "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector:
          "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector:
          "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector:
          "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector:
          "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector:
          "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function () {
          return u("meta[name=csrf-token]").attr("content");
        },
        csrfParam: function () {
          return u("meta[name=csrf-param]").attr("content");
        },
        CSRFProtection: function (e) {
          var t = c.csrfToken();
          t && e.setRequestHeader("X-CSRF-Token", t);
        },
        refreshCSRFTokens: function () {
          u('form input[name="' + c.csrfParam() + '"]').val(c.csrfToken());
        },
        fire: function (e, t, n) {
          var i = u.Event(t);
          return e.trigger(i, n), !1 !== i.result;
        },
        confirm: function (e) {
          return confirm(e);
        },
        ajax: function (e) {
          return u.ajax(e);
        },
        href: function (e) {
          return e[0].href;
        },
        isRemote: function (e) {
          return e.data("remote") !== l && !1 !== e.data("remote");
        },
        handleRemote: function (i) {
          var e, t, n, r, o, a;
          if (c.fire(i, "ajax:before")) {
            if (
              ((r = i.data("with-credentials") || null),
              (o =
                i.data("type") || (u.ajaxSettings && u.ajaxSettings.dataType)),
              i.is("form"))
            ) {
              (e = i.data("ujs:submit-button-formmethod") || i.attr("method")),
                (t =
                  i.data("ujs:submit-button-formaction") || i.attr("action")),
                (n = u(i[0]).serializeArray());
              var s = i.data("ujs:submit-button");
              s && (n.push(s), i.data("ujs:submit-button", null)),
                i.data("ujs:submit-button-formmethod", null),
                i.data("ujs:submit-button-formaction", null);
            } else
              i.is(c.inputChangeSelector)
                ? ((e = i.data("method")),
                  (t = i.data("url")),
                  (n = i.serialize()),
                  i.data("params") && (n = n + "&" + i.data("params")))
                : i.is(c.buttonClickSelector)
                ? ((e = i.data("method") || "get"),
                  (t = i.data("url")),
                  (n = i.serialize()),
                  i.data("params") && (n = n + "&" + i.data("params")))
                : ((e = i.data("method")),
                  (t = c.href(i)),
                  (n = i.data("params") || null));
            return (
              (a = {
                type: e || "GET",
                data: n,
                dataType: o,
                beforeSend: function (e, t) {
                  if (
                    (t.dataType === l &&
                      e.setRequestHeader(
                        "accept",
                        "*/*;q=0.5, " + t.accepts.script
                      ),
                    !c.fire(i, "ajax:beforeSend", [e, t]))
                  )
                    return !1;
                  i.trigger("ajax:send", e);
                },
                success: function (e, t, n) {
                  i.trigger("ajax:success", [e, t, n]);
                },
                complete: function (e, t) {
                  i.trigger("ajax:complete", [e, t]);
                },
                error: function (e, t, n) {
                  i.trigger("ajax:error", [e, t, n]);
                },
                crossDomain: c.isCrossDomain(t),
              }),
              r && (a.xhrFields = { withCredentials: r }),
              t && (a.url = t),
              c.ajax(a)
            );
          }
          return !1;
        },
        isCrossDomain: function (t) {
          var n = document.createElement("a");
          n.href = location.href;
          var i = document.createElement("a");
          try {
            return (
              (i.href = t),
              (i.href = i.href),
              !(
                ((!i.protocol || ":" === i.protocol) && !i.host) ||
                n.protocol + "//" + n.host == i.protocol + "//" + i.host
              )
            );
          } catch (e) {
            return !0;
          }
        },
        handleMethod: function (e) {
          var t = c.href(e),
            n = e.data("method"),
            i = e.attr("target"),
            r = c.csrfToken(),
            o = c.csrfParam(),
            a = u('<form method="post" action="' + t + '"></form>'),
            s = '<input name="_method" value="' + n + '" type="hidden" />';
          o === l ||
            r === l ||
            c.isCrossDomain(t) ||
            (s += '<input name="' + o + '" value="' + r + '" type="hidden" />'),
            i && a.attr("target", i),
            a.hide().append(s).appendTo("body"),
            a.submit();
        },
        formElements: function (e, t) {
          return e.is("form") ? u(e[0].elements).filter(t) : e.find(t);
        },
        disableFormElements: function (e) {
          c.formElements(e, c.disableSelector).each(function () {
            c.disableFormElement(u(this));
          });
        },
        disableFormElement: function (e) {
          var t, n;
          (t = e.is("button") ? "html" : "val"),
            (n = e.data("disable-with")) !== l &&
              (e.data("ujs:enable-with", e[t]()), e[t](n)),
            e.prop("disabled", !0),
            e.data("ujs:disabled", !0);
        },
        enableFormElements: function (e) {
          c.formElements(e, c.enableSelector).each(function () {
            c.enableFormElement(u(this));
          });
        },
        enableFormElement: function (e) {
          var t = e.is("button") ? "html" : "val";
          e.data("ujs:enable-with") !== l &&
            (e[t](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")),
            e.prop("disabled", !1),
            e.removeData("ujs:disabled");
        },
        allowAction: function (t) {
          var n,
            i = t.data("confirm"),
            r = !1;
          if (!i) return !0;
          if (c.fire(t, "confirm")) {
            try {
              r = c.confirm(i);
            } catch (e) {
              (console.error || console.log).call(console, e.stack || e);
            }
            n = c.fire(t, "confirm:complete", [r]);
          }
          return r && n;
        },
        blankInputs: function (e, t, n) {
          var i,
            r,
            o,
            a = u(),
            s = t || "input,textarea",
            l = e.find(s),
            c = {};
          return (
            l.each(function () {
              (i = u(this)).is("input[type=radio]")
                ? ((o = i.attr("name")),
                  c[o] ||
                    (0 ===
                      e.find('input[type=radio]:checked[name="' + o + '"]')
                        .length &&
                      ((r = e.find('input[type=radio][name="' + o + '"]')),
                      (a = a.add(r))),
                    (c[o] = o)))
                : (i.is("input[type=checkbox],input[type=radio]")
                    ? i.is(":checked")
                    : !!i.val()) === n && (a = a.add(i));
            }),
            !!a.length && a
          );
        },
        nonBlankInputs: function (e, t) {
          return c.blankInputs(e, t, !0);
        },
        stopEverything: function (e) {
          return (
            u(e.target).trigger("ujs:everythingStopped"),
            e.stopImmediatePropagation(),
            !1
          );
        },
        disableElement: function (e) {
          var t = e.data("disable-with");
          t !== l && (e.data("ujs:enable-with", e.html()), e.html(t)),
            e.bind("click.railsDisable", function (e) {
              return c.stopEverything(e);
            }),
            e.data("ujs:disabled", !0);
        },
        enableElement: function (e) {
          e.data("ujs:enable-with") !== l &&
            (e.html(e.data("ujs:enable-with")),
            e.removeData("ujs:enable-with")),
            e.unbind("click.railsDisable"),
            e.removeData("ujs:disabled");
        },
      }),
      c.fire(t, "rails:attachBindings") &&
        (u.ajaxPrefilter(function (e, t, n) {
          e.crossDomain || c.CSRFProtection(n);
        }),
        u(window).on("pageshow.rails", function () {
          u(u.rails.enableSelector).each(function () {
            var e = u(this);
            e.data("ujs:disabled") && u.rails.enableFormElement(e);
          }),
            u(u.rails.linkDisableSelector).each(function () {
              var e = u(this);
              e.data("ujs:disabled") && u.rails.enableElement(e);
            });
        }),
        t.on("ajax:complete", c.linkDisableSelector, function () {
          c.enableElement(u(this));
        }),
        t.on("ajax:complete", c.buttonDisableSelector, function () {
          c.enableFormElement(u(this));
        }),
        t.on("click.rails", c.linkClickSelector, function (e) {
          var t = u(this),
            n = t.data("method"),
            i = t.data("params"),
            r = e.metaKey || e.ctrlKey;
          if (!c.allowAction(t)) return c.stopEverything(e);
          if (
            (!r && t.is(c.linkDisableSelector) && c.disableElement(t),
            c.isRemote(t))
          ) {
            if (r && (!n || "GET" === n) && !i) return !0;
            var o = c.handleRemote(t);
            return (
              !1 === o
                ? c.enableElement(t)
                : o.fail(function () {
                    c.enableElement(t);
                  }),
              !1
            );
          }
          return n ? (c.handleMethod(t), !1) : void 0;
        }),
        t.on("click.rails", c.buttonClickSelector, function (e) {
          var t = u(this);
          if (!c.allowAction(t) || !c.isRemote(t)) return c.stopEverything(e);
          t.is(c.buttonDisableSelector) && c.disableFormElement(t);
          var n = c.handleRemote(t);
          return (
            !1 === n
              ? c.enableFormElement(t)
              : n.fail(function () {
                  c.enableFormElement(t);
                }),
            !1
          );
        }),
        t.on("change.rails", c.inputChangeSelector, function (e) {
          var t = u(this);
          return c.allowAction(t) && c.isRemote(t)
            ? (c.handleRemote(t), !1)
            : c.stopEverything(e);
        }),
        t.on("submit.rails", c.formSubmitSelector, function (e) {
          var t,
            n,
            i = u(this),
            r = c.isRemote(i);
          if (!c.allowAction(i)) return c.stopEverything(e);
          if (i.attr("novalidate") === l)
            if (i.data("ujs:formnovalidate-button") === l) {
              if (
                (t = c.blankInputs(i, c.requiredInputSelector, !1)) &&
                c.fire(i, "ajax:aborted:required", [t])
              )
                return c.stopEverything(e);
            } else i.data("ujs:formnovalidate-button", l);
          if (r) {
            if ((n = c.nonBlankInputs(i, c.fileInputSelector))) {
              setTimeout(function () {
                c.disableFormElements(i);
              }, 13);
              var o = c.fire(i, "ajax:aborted:file", [n]);
              return (
                o ||
                  setTimeout(function () {
                    c.enableFormElements(i);
                  }, 13),
                o
              );
            }
            return c.handleRemote(i), !1;
          }
          setTimeout(function () {
            c.disableFormElements(i);
          }, 13);
        }),
        t.on("click.rails", c.formInputClickSelector, function (e) {
          var t = u(this);
          if (!c.allowAction(t)) return c.stopEverything(e);
          var n = t.attr("name"),
            i = n ? { name: n, value: t.val() } : null,
            r = t.closest("form");
          0 === r.length && (r = u("#" + t.attr("form"))),
            r.data("ujs:submit-button", i),
            r.data("ujs:formnovalidate-button", t.attr("formnovalidate")),
            r.data("ujs:submit-button-formaction", t.attr("formaction")),
            r.data("ujs:submit-button-formmethod", t.attr("formmethod"));
        }),
        t.on("ajax:send.rails", c.formSubmitSelector, function (e) {
          this === e.target && c.disableFormElements(u(this));
        }),
        t.on("ajax:complete.rails", c.formSubmitSelector, function (e) {
          this === e.target && c.enableFormElements(u(this));
        }),
        u(function () {
          c.refreshCSRFTokens();
        }));
  })(jQuery),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e("undefined" != typeof jQuery ? jQuery : window.Zepto);
  })(function (F) {
    "use strict";
    function n(e) {
      var t = e.data;
      e.isDefaultPrevented() || (e.preventDefault(), F(e.target).ajaxSubmit(t));
    }
    function i(e) {
      var t = e.target,
        n = F(t);
      if (!n.is("[type=submit],[type=image]")) {
        var i = n.closest("[type=submit]");
        if (0 === i.length) return;
        t = i[0];
      }
      var r = this;
      if ("image" == (r.clk = t).type)
        if (e.offsetX !== undefined)
          (r.clk_x = e.offsetX), (r.clk_y = e.offsetY);
        else if ("function" == typeof F.fn.offset) {
          var o = n.offset();
          (r.clk_x = e.pageX - o.left), (r.clk_y = e.pageY - o.top);
        } else
          (r.clk_x = e.pageX - t.offsetLeft), (r.clk_y = e.pageY - t.offsetTop);
      setTimeout(function () {
        r.clk = r.clk_x = r.clk_y = null;
      }, 100);
    }
    function O() {
      if (F.fn.ajaxSubmit.debug) {
        var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        window.console && window.console.log
          ? window.console.log(e)
          : window.opera && window.opera.postError && window.opera.postError(e);
      }
    }
    var _ = {};
    (_.fileapi = F("<input type='file'/>").get(0).files !== undefined),
      (_.formdata = window.FormData !== undefined);
    var R = !!F.fn.prop;
    (F.fn.attr2 = function () {
      if (!R) return this.attr.apply(this, arguments);
      var e = this.prop.apply(this, arguments);
      return (e && e.jquery) || "string" == typeof e
        ? e
        : this.attr.apply(this, arguments);
    }),
      (F.fn.ajaxSubmit = function (j) {
        function a(e) {
          var t,
            n,
            i = F.param(e, j.traditional).split("&"),
            r = i.length,
            o = [];
          for (t = 0; t < r; t++)
            (i[t] = i[t].replace(/\+/g, " ")),
              (n = i[t].split("=")),
              o.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
          return o;
        }
        function t(e) {
          for (var n = new FormData(), t = 0; t < e.length; t++)
            n.append(e[t].name, e[t].value);
          if (j.extraData) {
            var i = a(j.extraData);
            for (t = 0; t < i.length; t++) i[t] && n.append(i[t][0], i[t][1]);
          }
          j.data = null;
          var r = F.extend(!0, {}, F.ajaxSettings, j, {
            contentType: !1,
            processData: !1,
            cache: !1,
            type: D || "POST",
          });
          j.uploadProgress &&
            (r.xhr = function () {
              var e = F.ajaxSettings.xhr();
              return (
                e.upload &&
                  e.upload.addEventListener(
                    "progress",
                    function (e) {
                      var t = 0,
                        n = e.loaded || e.position,
                        i = e.total;
                      e.lengthComputable && (t = Math.ceil((n / i) * 100)),
                        j.uploadProgress(e, n, i, t);
                    },
                    !1
                  ),
                e
              );
            }),
            (r.data = null);
          var o = r.beforeSend;
          return (
            (r.beforeSend = function (e, t) {
              j.formData ? (t.data = j.formData) : (t.data = n),
                o && o.call(this, e, t);
            }),
            F.ajax(r)
          );
        }
        function n(t) {
          function h(e) {
            var t = null;
            try {
              e.contentWindow && (t = e.contentWindow.document);
            } catch (n) {
              O("cannot get iframe.contentWindow document: " + n);
            }
            if (t) return t;
            try {
              t = e.contentDocument ? e.contentDocument : e.document;
            } catch (n) {
              O("cannot get iframe.contentDocument: " + n), (t = e.document);
            }
            return t;
          }
          function n() {
            function n() {
              try {
                var t = h(g).readyState;
                O("state = " + t),
                  t && "uninitialized" == t.toLowerCase() && setTimeout(n, 50);
              } catch (e) {
                O("Server abort: ", e, " (", e.name, ")"),
                  d(E),
                  b && clearTimeout(b),
                  (b = undefined);
              }
            }
            var t = P.attr2("target"),
              i = P.attr2("action"),
              r = "multipart/form-data",
              o = P.attr("enctype") || P.attr("encoding") || r;
            w.setAttribute("target", u),
              (D && !/post/i.test(D)) || w.setAttribute("method", "POST"),
              i != p.url && w.setAttribute("action", p.url),
              p.skipEncodingOverride ||
                (D && !/post/i.test(D)) ||
                P.attr({
                  encoding: "multipart/form-data",
                  enctype: "multipart/form-data",
                }),
              p.timeout &&
                (b = setTimeout(function () {
                  (y = !0), d(_);
                }, p.timeout));
            var a = [];
            try {
              if (p.extraData)
                for (var s in p.extraData)
                  p.extraData.hasOwnProperty(s) &&
                    (F.isPlainObject(p.extraData[s]) &&
                    p.extraData[s].hasOwnProperty("name") &&
                    p.extraData[s].hasOwnProperty("value")
                      ? a.push(
                          F(
                            '<input type="hidden" name="' +
                              p.extraData[s].name +
                              '">'
                          )
                            .val(p.extraData[s].value)
                            .appendTo(w)[0]
                        )
                      : a.push(
                          F('<input type="hidden" name="' + s + '">')
                            .val(p.extraData[s])
                            .appendTo(w)[0]
                        ));
              p.iframeTarget || m.appendTo("body"),
                g.attachEvent
                  ? g.attachEvent("onload", d)
                  : g.addEventListener("load", d, !1),
                setTimeout(n, 15);
              try {
                w.submit();
              } catch (c) {
                var l = document.createElement("form").submit;
                l.apply(w);
              }
            } finally {
              w.setAttribute("action", i),
                w.setAttribute("enctype", o),
                t ? w.setAttribute("target", t) : P.removeAttr("target"),
                F(a).remove();
            }
          }
          function d(e) {
            if (!v.aborted && !k) {
              if (
                ((C = h(g)) || (O("cannot access response document"), (e = E)),
                e === _ && v)
              )
                return v.abort("timeout"), void x.reject(v, "timeout");
              if (e == E && v)
                return (
                  v.abort("server abort"),
                  void x.reject(v, "error", "server abort")
                );
              if ((C && C.location.href != p.iframeSrc) || y) {
                g.detachEvent
                  ? g.detachEvent("onload", d)
                  : g.removeEventListener("load", d, !1);
                var t,
                  n = "success";
                try {
                  if (y) throw "timeout";
                  var i = "xml" == p.dataType || C.XMLDocument || F.isXMLDoc(C);
                  if (
                    (O("isXml=" + i),
                    !i &&
                      window.opera &&
                      (null === C.body || !C.body.innerHTML) &&
                      --T)
                  )
                    return (
                      O("requeing onLoad callback, DOM not available"),
                      void setTimeout(d, 250)
                    );
                  var r = C.body ? C.body : C.documentElement;
                  (v.responseText = r ? r.innerHTML : null),
                    (v.responseXML = C.XMLDocument ? C.XMLDocument : C),
                    i && (p.dataType = "xml"),
                    (v.getResponseHeader = function (e) {
                      return { "content-type": p.dataType }[e.toLowerCase()];
                    }),
                    r &&
                      ((v.status =
                        Number(r.getAttribute("status")) || v.status),
                      (v.statusText =
                        r.getAttribute("statusText") || v.statusText));
                  var o = (p.dataType || "").toLowerCase(),
                    a = /(json|script|text)/.test(o);
                  if (a || p.textarea) {
                    var s = C.getElementsByTagName("textarea")[0];
                    if (s)
                      (v.responseText = s.value),
                        (v.status =
                          Number(s.getAttribute("status")) || v.status),
                        (v.statusText =
                          s.getAttribute("statusText") || v.statusText);
                    else if (a) {
                      var l = C.getElementsByTagName("pre")[0],
                        c = C.getElementsByTagName("body")[0];
                      l
                        ? (v.responseText = l.textContent
                            ? l.textContent
                            : l.innerText)
                        : c &&
                          (v.responseText = c.textContent
                            ? c.textContent
                            : c.innerText);
                    }
                  } else
                    "xml" == o &&
                      !v.responseXML &&
                      v.responseText &&
                      (v.responseXML = A(v.responseText));
                  try {
                    S = N(v, o, p);
                  } catch (u) {
                    (n = "parsererror"), (v.error = t = u || n);
                  }
                } catch (u) {
                  O("error caught: ", u), (n = "error"), (v.error = t = u || n);
                }
                v.aborted && (O("upload aborted"), (n = null)),
                  v.status &&
                    (n =
                      (200 <= v.status && v.status < 300) || 304 === v.status
                        ? "success"
                        : "error"),
                  "success" === n
                    ? (p.success && p.success.call(p.context, S, "success", v),
                      x.resolve(v.responseText, "success", v),
                      f && F.event.trigger("ajaxSuccess", [v, p]))
                    : n &&
                      (t === undefined && (t = v.statusText),
                      p.error && p.error.call(p.context, v, n, t),
                      x.reject(v, "error", t),
                      f && F.event.trigger("ajaxError", [v, p, t])),
                  f && F.event.trigger("ajaxComplete", [v, p]),
                  f && !--F.active && F.event.trigger("ajaxStop"),
                  p.complete && p.complete.call(p.context, v, n),
                  (k = !0),
                  p.timeout && clearTimeout(b),
                  setTimeout(function () {
                    p.iframeTarget ? m.attr("src", p.iframeSrc) : m.remove(),
                      (v.responseXML = null);
                  }, 100);
              }
            }
          }
          var i,
            r,
            p,
            f,
            u,
            m,
            g,
            v,
            o,
            a,
            y,
            b,
            w = P[0],
            x = F.Deferred();
          if (
            ((x.abort = function (e) {
              v.abort(e);
            }),
            t)
          )
            for (r = 0; r < L.length; r++)
              (i = F(L[r])),
                R ? i.prop("disabled", !1) : i.removeAttr("disabled");
          if (
            (((p = F.extend(!0, {}, F.ajaxSettings, j)).context =
              p.context || p),
            (u = "jqFormIO" + new Date().getTime()),
            p.iframeTarget
              ? (a = (m = F(p.iframeTarget)).attr2("name"))
                ? (u = a)
                : m.attr2("name", u)
              : (m = F(
                  '<iframe name="' + u + '" src="' + p.iframeSrc + '" />'
                )).css({
                  position: "absolute",
                  top: "-1000px",
                  left: "-1000px",
                }),
            (g = m[0]),
            (v = {
              aborted: 0,
              responseText: null,
              responseXML: null,
              status: 0,
              statusText: "n/a",
              getAllResponseHeaders: function () {},
              getResponseHeader: function () {},
              setRequestHeader: function () {},
              abort: function (e) {
                var t = "timeout" === e ? "timeout" : "aborted";
                O("aborting upload... " + t), (this.aborted = 1);
                try {
                  g.contentWindow.document.execCommand &&
                    g.contentWindow.document.execCommand("Stop");
                } catch (n) {}
                m.attr("src", p.iframeSrc),
                  (v.error = t),
                  p.error && p.error.call(p.context, v, t, e),
                  f && F.event.trigger("ajaxError", [v, p, t]),
                  p.complete && p.complete.call(p.context, v, t);
              },
            }),
            (f = p.global) && 0 == F.active++ && F.event.trigger("ajaxStart"),
            f && F.event.trigger("ajaxSend", [v, p]),
            p.beforeSend && !1 === p.beforeSend.call(p.context, v, p))
          )
            return p.global && F.active--, x.reject(), x;
          if (v.aborted) return x.reject(), x;
          (o = w.clk) &&
            (a = o.name) &&
            !o.disabled &&
            ((p.extraData = p.extraData || {}),
            (p.extraData[a] = o.value),
            "image" == o.type &&
              ((p.extraData[a + ".x"] = w.clk_x),
              (p.extraData[a + ".y"] = w.clk_y)));
          var _ = 1,
            E = 2,
            s = F("meta[name=csrf-token]").attr("content"),
            l = F("meta[name=csrf-param]").attr("content");
          l && s && ((p.extraData = p.extraData || {}), (p.extraData[l] = s)),
            p.forceSync ? n() : setTimeout(n, 10);
          var S,
            C,
            k,
            T = 50,
            A =
              F.parseXML ||
              function (e, t) {
                return (
                  window.ActiveXObject
                    ? (((t = new ActiveXObject("Microsoft.XMLDOM")).async =
                        "false"),
                      t.loadXML(e))
                    : (t = new DOMParser().parseFromString(e, "text/xml")),
                  t &&
                  t.documentElement &&
                  "parsererror" != t.documentElement.nodeName
                    ? t
                    : null
                );
              },
            c =
              F.parseJSON ||
              function (e) {
                return window.eval("(" + e + ")");
              },
            N = function (e, t, n) {
              var i = e.getResponseHeader("content-type") || "",
                r = "xml" === t || (!t && 0 <= i.indexOf("xml")),
                o = r ? e.responseXML : e.responseText;
              return (
                r &&
                  "parsererror" === o.documentElement.nodeName &&
                  F.error &&
                  F.error("parsererror"),
                n && n.dataFilter && (o = n.dataFilter(o, t)),
                "string" == typeof o &&
                  ("json" === t || (!t && 0 <= i.indexOf("json"))
                    ? (o = c(o))
                    : ("script" === t ||
                        (!t && 0 <= i.indexOf("javascript"))) &&
                      F.globalEval(o)),
                o
              );
            };
          return x;
        }
        if (!this.length)
          return (
            O("ajaxSubmit: skipping submit process - no element selected"), this
          );
        var D,
          i,
          r,
          P = this;
        "function" == typeof j
          ? (j = { success: j })
          : j === undefined && (j = {}),
          (D = j.type || this.attr2("method")),
          (r =
            (r =
              "string" == typeof (i = j.url || this.attr2("action"))
                ? F.trim(i)
                : "") ||
            window.location.href ||
            "") && (r = (r.match(/^([^#]+)/) || [])[1]),
          (j = F.extend(
            !0,
            {
              url: r,
              success: F.ajaxSettings.success,
              type: D || F.ajaxSettings.type,
              iframeSrc: /^https/i.test(window.location.href || "")
                ? "javascript:false"
                : "about:blank",
            },
            j
          ));
        var o = {};
        if ((this.trigger("form-pre-serialize", [this, j, o]), o.veto))
          return (
            O("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this
          );
        if (j.beforeSerialize && !1 === j.beforeSerialize(this, j))
          return (
            O("ajaxSubmit: submit aborted via beforeSerialize callback"), this
          );
        var s = j.traditional;
        s === undefined && (s = F.ajaxSettings.traditional);
        var l,
          L = [],
          c = this.formToArray(j.semantic, L);
        if (
          (j.data && ((j.extraData = j.data), (l = F.param(j.data, s))),
          j.beforeSubmit && !1 === j.beforeSubmit(c, this, j))
        )
          return (
            O("ajaxSubmit: submit aborted via beforeSubmit callback"), this
          );
        if ((this.trigger("form-submit-validate", [c, this, j, o]), o.veto))
          return (
            O("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
            this
          );
        var u = F.param(c, s);
        l && (u = u ? u + "&" + l : l),
          "GET" == j.type.toUpperCase()
            ? ((j.url += (0 <= j.url.indexOf("?") ? "&" : "?") + u),
              (j.data = null))
            : (j.data = u);
        var h = [];
        if (
          (j.resetForm &&
            h.push(function () {
              P.resetForm();
            }),
          j.clearForm &&
            h.push(function () {
              P.clearForm(j.includeHidden);
            }),
          !j.dataType && j.target)
        ) {
          var d = j.success || function () {};
          h.push(function (e) {
            var t = j.replaceTarget ? "replaceWith" : "html";
            F(j.target)[t](e).each(d, arguments);
          });
        } else j.success && h.push(j.success);
        if (
          ((j.success = function (e, t, n) {
            for (var i = j.context || this, r = 0, o = h.length; r < o; r++)
              h[r].apply(i, [e, t, n || P, P]);
          }),
          j.error)
        ) {
          var p = j.error;
          j.error = function (e, t, n) {
            var i = j.context || this;
            p.apply(i, [e, t, n, P]);
          };
        }
        if (j.complete) {
          var f = j.complete;
          j.complete = function (e, t) {
            var n = j.context || this;
            f.apply(n, [e, t, P]);
          };
        }
        var m =
            0 <
            F("input[type=file]:enabled", this).filter(function () {
              return "" !== F(this).val();
            }).length,
          g = "multipart/form-data",
          v = P.attr("enctype") == g || P.attr("encoding") == g,
          y = _.fileapi && _.formdata;
        O("fileAPI :" + y);
        var b,
          w = (m || v) && !y;
        !1 !== j.iframe && (j.iframe || w)
          ? j.closeKeepAlive
            ? F.get(j.closeKeepAlive, function () {
                b = n(c);
              })
            : (b = n(c))
          : (b = (m || v) && y ? t(c) : F.ajax(j)),
          P.removeData("jqxhr").data("jqxhr", b);
        for (var x = 0; x < L.length; x++) L[x] = null;
        return this.trigger("form-submit-notify", [this, j]), this;
      }),
      (F.fn.ajaxForm = function (e) {
        if (
          (((e = e || {}).delegation = e.delegation && F.isFunction(F.fn.on)),
          e.delegation || 0 !== this.length)
        )
          return e.delegation
            ? (F(document)
                .off("submit.form-plugin", this.selector, n)
                .off("click.form-plugin", this.selector, i)
                .on("submit.form-plugin", this.selector, e, n)
                .on("click.form-plugin", this.selector, e, i),
              this)
            : this.ajaxFormUnbind()
                .bind("submit.form-plugin", e, n)
                .bind("click.form-plugin", e, i);
        var t = { s: this.selector, c: this.context };
        return (
          !F.isReady && t.s
            ? (O("DOM not ready, queuing ajaxForm"),
              F(function () {
                F(t.s, t.c).ajaxForm(e);
              }))
            : O(
                "terminating; zero elements found by selector" +
                  (F.isReady ? "" : " (DOM not ready)")
              ),
          this
        );
      }),
      (F.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin");
      }),
      (F.fn.formToArray = function (e, t) {
        var n = [];
        if (0 === this.length) return n;
        var i,
          r,
          o,
          a,
          s,
          l,
          c,
          u,
          h = this[0],
          d = this.attr("id"),
          p = e ? h.getElementsByTagName("*") : h.elements;
        if (
          (p && !/MSIE 8/.test(navigator.userAgent) && (p = F(p).get()),
          d &&
            (i = F(":input[form=" + d + "]").get()).length &&
            (p = (p || []).concat(i)),
          !p || !p.length)
        )
          return n;
        for (r = 0, c = p.length; r < c; r++)
          if ((a = (l = p[r]).name) && !l.disabled)
            if (e && h.clk && "image" == l.type)
              h.clk == l &&
                (n.push({ name: a, value: F(l).val(), type: l.type }),
                n.push(
                  { name: a + ".x", value: h.clk_x },
                  { name: a + ".y", value: h.clk_y }
                ));
            else if ((s = F.fieldValue(l, !0)) && s.constructor == Array)
              for (t && t.push(l), o = 0, u = s.length; o < u; o++)
                n.push({ name: a, value: s[o] });
            else if (_.fileapi && "file" == l.type) {
              t && t.push(l);
              var f = l.files;
              if (f.length)
                for (o = 0; o < f.length; o++)
                  n.push({ name: a, value: f[o], type: l.type });
              else n.push({ name: a, value: "", type: l.type });
            } else
              null != s &&
                (t && t.push(l),
                n.push({
                  name: a,
                  value: s,
                  type: l.type,
                  required: l.required,
                }));
        if (!e && h.clk) {
          var m = F(h.clk),
            g = m[0];
          (a = g.name) &&
            !g.disabled &&
            "image" == g.type &&
            (n.push({ name: a, value: m.val() }),
            n.push(
              { name: a + ".x", value: h.clk_x },
              { name: a + ".y", value: h.clk_y }
            ));
        }
        return n;
      }),
      (F.fn.formSerialize = function (e) {
        return F.param(this.formToArray(e));
      }),
      (F.fn.fieldSerialize = function (r) {
        var o = [];
        return (
          this.each(function () {
            var e = this.name;
            if (e) {
              var t = F.fieldValue(this, r);
              if (t && t.constructor == Array)
                for (var n = 0, i = t.length; n < i; n++)
                  o.push({ name: e, value: t[n] });
              else null != t && o.push({ name: this.name, value: t });
            }
          }),
          F.param(o)
        );
      }),
      (F.fn.fieldValue = function (e) {
        for (var t = [], n = 0, i = this.length; n < i; n++) {
          var r = this[n],
            o = F.fieldValue(r, e);
          null == o ||
            (o.constructor == Array && !o.length) ||
            (o.constructor == Array ? F.merge(t, o) : t.push(o));
        }
        return t;
      }),
      (F.fieldValue = function (e, t) {
        var n = e.name,
          i = e.type,
          r = e.tagName.toLowerCase();
        if (
          (t === undefined && (t = !0),
          t &&
            (!n ||
              e.disabled ||
              "reset" == i ||
              "button" == i ||
              (("checkbox" == i || "radio" == i) && !e.checked) ||
              (("submit" == i || "image" == i) && e.form && e.form.clk != e) ||
              ("select" == r && -1 == e.selectedIndex)))
        )
          return null;
        if ("select" != r) return F(e).val();
        var o = e.selectedIndex;
        if (o < 0) return null;
        for (
          var a = [],
            s = e.options,
            l = "select-one" == i,
            c = l ? o + 1 : s.length,
            u = l ? o : 0;
          u < c;
          u++
        ) {
          var h = s[u];
          if (h.selected) {
            var d = h.value;
            if (
              (d ||
                (d =
                  h.attributes &&
                  h.attributes.value &&
                  !h.attributes.value.specified
                    ? h.text
                    : h.value),
              l)
            )
              return d;
            a.push(d);
          }
        }
        return a;
      }),
      (F.fn.clearForm = function (e) {
        return this.each(function () {
          F("input,select,textarea", this).clearFields(e);
        });
      }),
      (F.fn.clearFields = F.fn.clearInputs =
        function (n) {
          var i =
            /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
          return this.each(function () {
            var e = this.type,
              t = this.tagName.toLowerCase();
            i.test(e) || "textarea" == t
              ? (this.value = "")
              : "checkbox" == e || "radio" == e
              ? (this.checked = !1)
              : "select" == t
              ? (this.selectedIndex = -1)
              : "file" == e
              ? /MSIE/.test(navigator.userAgent)
                ? F(this).replaceWith(F(this).clone(!0))
                : F(this).val("")
              : n &&
                ((!0 === n && /hidden/.test(e)) ||
                  ("string" == typeof n && F(this).is(n))) &&
                (this.value = "");
          });
        }),
      (F.fn.resetForm = function () {
        return this.each(function () {
          ("function" == typeof this.reset ||
            ("object" == typeof this.reset && !this.reset.nodeType)) &&
            this.reset();
        });
      }),
      (F.fn.enable = function (e) {
        return (
          e === undefined && (e = !0),
          this.each(function () {
            this.disabled = !e;
          })
        );
      }),
      (F.fn.selected = function (n) {
        return (
          n === undefined && (n = !0),
          this.each(function () {
            var e = this.type;
            if ("checkbox" == e || "radio" == e) this.checked = n;
            else if ("option" == this.tagName.toLowerCase()) {
              var t = F(this).parent("select");
              n &&
                t[0] &&
                "select-one" == t[0].type &&
                t.find("option").selected(!1),
                (this.selected = n);
            }
          })
        );
      }),
      (F.fn.ajaxSubmit.debug = !1);
  }),
  function () {
    function t(s) {
      function l(e, t, n, i, r, o) {
        for (; 0 <= r && r < o; r += s) {
          var a = i ? i[r] : r;
          n = t(n, e[a], a, e);
        }
        return n;
      }
      return function (e, t, n, i) {
        t = w(t, i, 4);
        var r = !T(e) && b.keys(e),
          o = (r || e).length,
          a = 0 < s ? 0 : o - 1;
        return (
          arguments.length < 3 && ((n = e[r ? r[a] : a]), (a += s)),
          l(e, t, n, r, a, o)
        );
      };
    }
    function n(o) {
      return function (e, t, n) {
        t = x(t, n);
        for (var i = k(e), r = 0 < o ? 0 : i - 1; 0 <= r && r < i; r += o)
          if (t(e[r], r, e)) return r;
        return -1;
      };
    }
    function i(o, a, s) {
      return function (e, t, n) {
        var i = 0,
          r = k(e);
        if ("number" == typeof n)
          0 < o
            ? (i = 0 <= n ? n : Math.max(n + r, i))
            : (r = 0 <= n ? Math.min(n + 1, r) : n + r + 1);
        else if (s && n && r) return e[(n = s(e, t))] === t ? n : -1;
        if (t != t) return 0 <= (n = a(h.call(e, i, r), b.isNaN)) ? n + i : -1;
        for (n = 0 < o ? i : r - 1; 0 <= n && n < r; n += o)
          if (e[n] === t) return n;
        return -1;
      };
    }
    function r(e, t) {
      var n = P.length,
        i = e.constructor,
        r = (b.isFunction(i) && i.prototype) || l,
        o = "constructor";
      for (b.has(e, o) && !b.contains(t, o) && t.push(o); n--; )
        (o = P[n]) in e && e[o] !== r[o] && !b.contains(t, o) && t.push(o);
    }
    var o = this,
      a = o._,
      s = Array.prototype,
      l = Object.prototype,
      c = Function.prototype,
      u = s.push,
      h = s.slice,
      d = l.toString,
      p = l.hasOwnProperty,
      f = Array.isArray,
      m = Object.keys,
      g = c.bind,
      v = Object.create,
      y = function () {},
      b = function (e) {
        return e instanceof b
          ? e
          : this instanceof b
          ? void (this._wrapped = e)
          : new b(e);
      };
    "undefined" != typeof exports
      ? ("undefined" != typeof module &&
          module.exports &&
          (exports = module.exports = b),
        (exports._ = b))
      : (o._ = b),
      (b.VERSION = "1.8.3");
    var w = function (r, o, e) {
        if (void 0 === o) return r;
        switch (null == e ? 3 : e) {
          case 1:
            return function (e) {
              return r.call(o, e);
            };
          case 2:
            return function (e, t) {
              return r.call(o, e, t);
            };
          case 3:
            return function (e, t, n) {
              return r.call(o, e, t, n);
            };
          case 4:
            return function (e, t, n, i) {
              return r.call(o, e, t, n, i);
            };
        }
        return function () {
          return r.apply(o, arguments);
        };
      },
      x = function (e, t, n) {
        return null == e
          ? b.identity
          : b.isFunction(e)
          ? w(e, t, n)
          : b.isObject(e)
          ? b.matcher(e)
          : b.property(e);
      };
    b.iteratee = function (e, t) {
      return x(e, t, Infinity);
    };
    var _ = function (l, c) {
        return function (e) {
          var t = arguments.length;
          if (t < 2 || null == e) return e;
          for (var n = 1; n < t; n++)
            for (
              var i = arguments[n], r = l(i), o = r.length, a = 0;
              a < o;
              a++
            ) {
              var s = r[a];
              (c && void 0 !== e[s]) || (e[s] = i[s]);
            }
          return e;
        };
      },
      E = function (e) {
        if (!b.isObject(e)) return {};
        if (v) return v(e);
        y.prototype = e;
        var t = new y();
        return (y.prototype = null), t;
      },
      S = function (t) {
        return function (e) {
          return null == e ? void 0 : e[t];
        };
      },
      C = Math.pow(2, 53) - 1,
      k = S("length"),
      T = function (e) {
        var t = k(e);
        return "number" == typeof t && 0 <= t && t <= C;
      };
    (b.each = b.forEach =
      function (e, t, n) {
        var i, r;
        if (((t = w(t, n)), T(e)))
          for (i = 0, r = e.length; i < r; i++) t(e[i], i, e);
        else {
          var o = b.keys(e);
          for (i = 0, r = o.length; i < r; i++) t(e[o[i]], o[i], e);
        }
        return e;
      }),
      (b.map = b.collect =
        function (e, t, n) {
          t = x(t, n);
          for (
            var i = !T(e) && b.keys(e),
              r = (i || e).length,
              o = Array(r),
              a = 0;
            a < r;
            a++
          ) {
            var s = i ? i[a] : a;
            o[a] = t(e[s], s, e);
          }
          return o;
        }),
      (b.reduce = b.foldl = b.inject = t(1)),
      (b.reduceRight = b.foldr = t(-1)),
      (b.find = b.detect =
        function (e, t, n) {
          var i;
          if (
            void 0 !== (i = T(e) ? b.findIndex(e, t, n) : b.findKey(e, t, n)) &&
            -1 !== i
          )
            return e[i];
        }),
      (b.filter = b.select =
        function (e, i, t) {
          var r = [];
          return (
            (i = x(i, t)),
            b.each(e, function (e, t, n) {
              i(e, t, n) && r.push(e);
            }),
            r
          );
        }),
      (b.reject = function (e, t, n) {
        return b.filter(e, b.negate(x(t)), n);
      }),
      (b.every = b.all =
        function (e, t, n) {
          t = x(t, n);
          for (
            var i = !T(e) && b.keys(e), r = (i || e).length, o = 0;
            o < r;
            o++
          ) {
            var a = i ? i[o] : o;
            if (!t(e[a], a, e)) return !1;
          }
          return !0;
        }),
      (b.some = b.any =
        function (e, t, n) {
          t = x(t, n);
          for (
            var i = !T(e) && b.keys(e), r = (i || e).length, o = 0;
            o < r;
            o++
          ) {
            var a = i ? i[o] : o;
            if (t(e[a], a, e)) return !0;
          }
          return !1;
        }),
      (b.contains =
        b.includes =
        b.include =
          function (e, t, n, i) {
            return (
              T(e) || (e = b.values(e)),
              ("number" != typeof n || i) && (n = 0),
              0 <= b.indexOf(e, t, n)
            );
          }),
      (b.invoke = function (e, n) {
        var i = h.call(arguments, 2),
          r = b.isFunction(n);
        return b.map(e, function (e) {
          var t = r ? n : e[n];
          return null == t ? t : t.apply(e, i);
        });
      }),
      (b.pluck = function (e, t) {
        return b.map(e, b.property(t));
      }),
      (b.where = function (e, t) {
        return b.filter(e, b.matcher(t));
      }),
      (b.findWhere = function (e, t) {
        return b.find(e, b.matcher(t));
      }),
      (b.max = function (e, i, t) {
        var n,
          r,
          o = -Infinity,
          a = -Infinity;
        if (null == i && null != e)
          for (var s = 0, l = (e = T(e) ? e : b.values(e)).length; s < l; s++)
            (n = e[s]), o < n && (o = n);
        else
          (i = x(i, t)),
            b.each(e, function (e, t, n) {
              (r = i(e, t, n)),
                (a < r || (r === -Infinity && o === -Infinity)) &&
                  ((o = e), (a = r));
            });
        return o;
      }),
      (b.min = function (e, i, t) {
        var n,
          r,
          o = Infinity,
          a = Infinity;
        if (null == i && null != e)
          for (var s = 0, l = (e = T(e) ? e : b.values(e)).length; s < l; s++)
            (n = e[s]) < o && (o = n);
        else
          (i = x(i, t)),
            b.each(e, function (e, t, n) {
              ((r = i(e, t, n)) < a || (r === Infinity && o === Infinity)) &&
                ((o = e), (a = r));
            });
        return o;
      }),
      (b.shuffle = function (e) {
        for (
          var t, n = T(e) ? e : b.values(e), i = n.length, r = Array(i), o = 0;
          o < i;
          o++
        )
          (t = b.random(0, o)) !== o && (r[o] = r[t]), (r[t] = n[o]);
        return r;
      }),
      (b.sample = function (e, t, n) {
        return null == t || n
          ? (T(e) || (e = b.values(e)), e[b.random(e.length - 1)])
          : b.shuffle(e).slice(0, Math.max(0, t));
      }),
      (b.sortBy = function (e, i, t) {
        return (
          (i = x(i, t)),
          b.pluck(
            b
              .map(e, function (e, t, n) {
                return { value: e, index: t, criteria: i(e, t, n) };
              })
              .sort(function (e, t) {
                var n = e.criteria,
                  i = t.criteria;
                if (n !== i) {
                  if (i < n || void 0 === n) return 1;
                  if (n < i || void 0 === i) return -1;
                }
                return e.index - t.index;
              }),
            "value"
          )
        );
      });
    var A = function (a) {
      return function (i, r, e) {
        var o = {};
        return (
          (r = x(r, e)),
          b.each(i, function (e, t) {
            var n = r(e, t, i);
            a(o, e, n);
          }),
          o
        );
      };
    };
    (b.groupBy = A(function (e, t, n) {
      b.has(e, n) ? e[n].push(t) : (e[n] = [t]);
    })),
      (b.indexBy = A(function (e, t, n) {
        e[n] = t;
      })),
      (b.countBy = A(function (e, t, n) {
        b.has(e, n) ? e[n]++ : (e[n] = 1);
      })),
      (b.toArray = function (e) {
        return e
          ? b.isArray(e)
            ? h.call(e)
            : T(e)
            ? b.map(e, b.identity)
            : b.values(e)
          : [];
      }),
      (b.size = function (e) {
        return null == e ? 0 : T(e) ? e.length : b.keys(e).length;
      }),
      (b.partition = function (e, i, t) {
        i = x(i, t);
        var r = [],
          o = [];
        return (
          b.each(e, function (e, t, n) {
            (i(e, t, n) ? r : o).push(e);
          }),
          [r, o]
        );
      }),
      (b.first =
        b.head =
        b.take =
          function (e, t, n) {
            if (null != e)
              return null == t || n ? e[0] : b.initial(e, e.length - t);
          }),
      (b.initial = function (e, t, n) {
        return h.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)));
      }),
      (b.last = function (e, t, n) {
        if (null != e)
          return null == t || n
            ? e[e.length - 1]
            : b.rest(e, Math.max(0, e.length - t));
      }),
      (b.rest =
        b.tail =
        b.drop =
          function (e, t, n) {
            return h.call(e, null == t || n ? 1 : t);
          }),
      (b.compact = function (e) {
        return b.filter(e, b.identity);
      });
    var N = function (e, t, n, i) {
      for (var r = [], o = 0, a = i || 0, s = k(e); a < s; a++) {
        var l = e[a];
        if (T(l) && (b.isArray(l) || b.isArguments(l))) {
          t || (l = N(l, t, n));
          var c = 0,
            u = l.length;
          for (r.length += u; c < u; ) r[o++] = l[c++];
        } else n || (r[o++] = l);
      }
      return r;
    };
    (b.flatten = function (e, t) {
      return N(e, t, !1);
    }),
      (b.without = function (e) {
        return b.difference(e, h.call(arguments, 1));
      }),
      (b.uniq = b.unique =
        function (e, t, n, i) {
          b.isBoolean(t) || ((i = n), (n = t), (t = !1)),
            null != n && (n = x(n, i));
          for (var r = [], o = [], a = 0, s = k(e); a < s; a++) {
            var l = e[a],
              c = n ? n(l, a, e) : l;
            t
              ? ((a && o === c) || r.push(l), (o = c))
              : n
              ? b.contains(o, c) || (o.push(c), r.push(l))
              : b.contains(r, l) || r.push(l);
          }
          return r;
        }),
      (b.union = function () {
        return b.uniq(N(arguments, !0, !0));
      }),
      (b.intersection = function (e) {
        for (var t = [], n = arguments.length, i = 0, r = k(e); i < r; i++) {
          var o = e[i];
          if (!b.contains(t, o)) {
            for (var a = 1; a < n && b.contains(arguments[a], o); a++);
            a === n && t.push(o);
          }
        }
        return t;
      }),
      (b.difference = function (e) {
        var t = N(arguments, !0, !0, 1);
        return b.filter(e, function (e) {
          return !b.contains(t, e);
        });
      }),
      (b.zip = function () {
        return b.unzip(arguments);
      }),
      (b.unzip = function (e) {
        for (
          var t = (e && b.max(e, k).length) || 0, n = Array(t), i = 0;
          i < t;
          i++
        )
          n[i] = b.pluck(e, i);
        return n;
      }),
      (b.object = function (e, t) {
        for (var n = {}, i = 0, r = k(e); i < r; i++)
          t ? (n[e[i]] = t[i]) : (n[e[i][0]] = e[i][1]);
        return n;
      }),
      (b.findIndex = n(1)),
      (b.findLastIndex = n(-1)),
      (b.sortedIndex = function (e, t, n, i) {
        for (var r = (n = x(n, i, 1))(t), o = 0, a = k(e); o < a; ) {
          var s = Math.floor((o + a) / 2);
          n(e[s]) < r ? (o = s + 1) : (a = s);
        }
        return o;
      }),
      (b.indexOf = i(1, b.findIndex, b.sortedIndex)),
      (b.lastIndexOf = i(-1, b.findLastIndex)),
      (b.range = function (e, t, n) {
        null == t && ((t = e || 0), (e = 0)), (n = n || 1);
        for (
          var i = Math.max(Math.ceil((t - e) / n), 0), r = Array(i), o = 0;
          o < i;
          o++, e += n
        )
          r[o] = e;
        return r;
      });
    var j = function (e, t, n, i, r) {
      if (!(i instanceof t)) return e.apply(n, r);
      var o = E(e.prototype),
        a = e.apply(o, r);
      return b.isObject(a) ? a : o;
    };
    (b.bind = function (e, t) {
      if (g && e.bind === g) return g.apply(e, h.call(arguments, 1));
      if (!b.isFunction(e))
        throw new TypeError("Bind must be called on a function");
      var n = h.call(arguments, 2),
        i = function () {
          return j(e, i, t, this, n.concat(h.call(arguments)));
        };
      return i;
    }),
      (b.partial = function (r) {
        var o = h.call(arguments, 1),
          a = function () {
            for (var e = 0, t = o.length, n = Array(t), i = 0; i < t; i++)
              n[i] = o[i] === b ? arguments[e++] : o[i];
            for (; e < arguments.length; ) n.push(arguments[e++]);
            return j(r, a, this, this, n);
          };
        return a;
      }),
      (b.bindAll = function (e) {
        var t,
          n,
          i = arguments.length;
        if (i <= 1) throw new Error("bindAll must be passed function names");
        for (t = 1; t < i; t++) e[(n = arguments[t])] = b.bind(e[n], e);
        return e;
      }),
      (b.memoize = function (i, r) {
        var o = function (e) {
          var t = o.cache,
            n = "" + (r ? r.apply(this, arguments) : e);
          return b.has(t, n) || (t[n] = i.apply(this, arguments)), t[n];
        };
        return (o.cache = {}), o;
      }),
      (b.delay = function (e, t) {
        var n = h.call(arguments, 2);
        return setTimeout(function () {
          return e.apply(null, n);
        }, t);
      }),
      (b.defer = b.partial(b.delay, b, 1)),
      (b.throttle = function (n, i, r) {
        var o,
          a,
          s,
          l = null,
          c = 0;
        r || (r = {});
        var u = function () {
          (c = !1 === r.leading ? 0 : b.now()),
            (l = null),
            (s = n.apply(o, a)),
            l || (o = a = null);
        };
        return function () {
          var e = b.now();
          c || !1 !== r.leading || (c = e);
          var t = i - (e - c);
          return (
            (o = this),
            (a = arguments),
            t <= 0 || i < t
              ? (l && (clearTimeout(l), (l = null)),
                (c = e),
                (s = n.apply(o, a)),
                l || (o = a = null))
              : l || !1 === r.trailing || (l = setTimeout(u, t)),
            s
          );
        };
      }),
      (b.debounce = function (t, n, i) {
        var r,
          o,
          a,
          s,
          l,
          c = function () {
            var e = b.now() - s;
            e < n && 0 <= e
              ? (r = setTimeout(c, n - e))
              : ((r = null), i || ((l = t.apply(a, o)), r || (a = o = null)));
          };
        return function () {
          (a = this), (o = arguments), (s = b.now());
          var e = i && !r;
          return (
            r || (r = setTimeout(c, n)),
            e && ((l = t.apply(a, o)), (a = o = null)),
            l
          );
        };
      }),
      (b.wrap = function (e, t) {
        return b.partial(t, e);
      }),
      (b.negate = function (e) {
        return function () {
          return !e.apply(this, arguments);
        };
      }),
      (b.compose = function () {
        var n = arguments,
          i = n.length - 1;
        return function () {
          for (var e = i, t = n[i].apply(this, arguments); e--; )
            t = n[e].call(this, t);
          return t;
        };
      }),
      (b.after = function (e, t) {
        return function () {
          if (--e < 1) return t.apply(this, arguments);
        };
      }),
      (b.before = function (e, t) {
        var n;
        return function () {
          return (
            0 < --e && (n = t.apply(this, arguments)), e <= 1 && (t = null), n
          );
        };
      }),
      (b.once = b.partial(b.before, 2));
    var D = !{ toString: null }.propertyIsEnumerable("toString"),
      P = [
        "valueOf",
        "isPrototypeOf",
        "toString",
        "propertyIsEnumerable",
        "hasOwnProperty",
        "toLocaleString",
      ];
    (b.keys = function (e) {
      if (!b.isObject(e)) return [];
      if (m) return m(e);
      var t = [];
      for (var n in e) b.has(e, n) && t.push(n);
      return D && r(e, t), t;
    }),
      (b.allKeys = function (e) {
        if (!b.isObject(e)) return [];
        var t = [];
        for (var n in e) t.push(n);
        return D && r(e, t), t;
      }),
      (b.values = function (e) {
        for (var t = b.keys(e), n = t.length, i = Array(n), r = 0; r < n; r++)
          i[r] = e[t[r]];
        return i;
      }),
      (b.mapObject = function (e, t, n) {
        t = x(t, n);
        for (var i, r = b.keys(e), o = r.length, a = {}, s = 0; s < o; s++)
          a[(i = r[s])] = t(e[i], i, e);
        return a;
      }),
      (b.pairs = function (e) {
        for (var t = b.keys(e), n = t.length, i = Array(n), r = 0; r < n; r++)
          i[r] = [t[r], e[t[r]]];
        return i;
      }),
      (b.invert = function (e) {
        for (var t = {}, n = b.keys(e), i = 0, r = n.length; i < r; i++)
          t[e[n[i]]] = n[i];
        return t;
      }),
      (b.functions = b.methods =
        function (e) {
          var t = [];
          for (var n in e) b.isFunction(e[n]) && t.push(n);
          return t.sort();
        }),
      (b.extend = _(b.allKeys)),
      (b.extendOwn = b.assign = _(b.keys)),
      (b.findKey = function (e, t, n) {
        t = x(t, n);
        for (var i, r = b.keys(e), o = 0, a = r.length; o < a; o++)
          if (t(e[(i = r[o])], i, e)) return i;
      }),
      (b.pick = function (e, t, n) {
        var i,
          r,
          o = {},
          a = e;
        if (null == a) return o;
        b.isFunction(t)
          ? ((r = b.allKeys(a)), (i = w(t, n)))
          : ((r = N(arguments, !1, !1, 1)),
            (i = function (e, t, n) {
              return t in n;
            }),
            (a = Object(a)));
        for (var s = 0, l = r.length; s < l; s++) {
          var c = r[s],
            u = a[c];
          i(u, c, a) && (o[c] = u);
        }
        return o;
      }),
      (b.omit = function (e, t, n) {
        if (b.isFunction(t)) t = b.negate(t);
        else {
          var i = b.map(N(arguments, !1, !1, 1), String);
          t = function (e, t) {
            return !b.contains(i, t);
          };
        }
        return b.pick(e, t, n);
      }),
      (b.defaults = _(b.allKeys, !0)),
      (b.create = function (e, t) {
        var n = E(e);
        return t && b.extendOwn(n, t), n;
      }),
      (b.clone = function (e) {
        return b.isObject(e) ? (b.isArray(e) ? e.slice() : b.extend({}, e)) : e;
      }),
      (b.tap = function (e, t) {
        return t(e), e;
      }),
      (b.isMatch = function (e, t) {
        var n = b.keys(t),
          i = n.length;
        if (null == e) return !i;
        for (var r = Object(e), o = 0; o < i; o++) {
          var a = n[o];
          if (t[a] !== r[a] || !(a in r)) return !1;
        }
        return !0;
      });
    var L = function (e, t, n, i) {
      if (e === t) return 0 !== e || 1 / e == 1 / t;
      if (null == e || null == t) return e === t;
      e instanceof b && (e = e._wrapped), t instanceof b && (t = t._wrapped);
      var r = d.call(e);
      if (r !== d.call(t)) return !1;
      switch (r) {
        case "[object RegExp]":
        case "[object String]":
          return "" + e == "" + t;
        case "[object Number]":
          return +e != +e ? +t != +t : 0 == +e ? 1 / +e == 1 / t : +e == +t;
        case "[object Date]":
        case "[object Boolean]":
          return +e == +t;
      }
      var o = "[object Array]" === r;
      if (!o) {
        if ("object" != typeof e || "object" != typeof t) return !1;
        var a = e.constructor,
          s = t.constructor;
        if (
          a !== s &&
          !(
            b.isFunction(a) &&
            a instanceof a &&
            b.isFunction(s) &&
            s instanceof s
          ) &&
          "constructor" in e &&
          "constructor" in t
        )
          return !1;
      }
      i = i || [];
      for (var l = (n = n || []).length; l--; )
        if (n[l] === e) return i[l] === t;
      if ((n.push(e), i.push(t), o)) {
        if ((l = e.length) !== t.length) return !1;
        for (; l--; ) if (!L(e[l], t[l], n, i)) return !1;
      } else {
        var c,
          u = b.keys(e);
        if (((l = u.length), b.keys(t).length !== l)) return !1;
        for (; l--; )
          if (((c = u[l]), !b.has(t, c) || !L(e[c], t[c], n, i))) return !1;
      }
      return n.pop(), i.pop(), !0;
    };
    (b.isEqual = function (e, t) {
      return L(e, t);
    }),
      (b.isEmpty = function (e) {
        return (
          null == e ||
          (T(e) && (b.isArray(e) || b.isString(e) || b.isArguments(e))
            ? 0 === e.length
            : 0 === b.keys(e).length)
        );
      }),
      (b.isElement = function (e) {
        return !(!e || 1 !== e.nodeType);
      }),
      (b.isArray =
        f ||
        function (e) {
          return "[object Array]" === d.call(e);
        }),
      (b.isObject = function (e) {
        var t = typeof e;
        return "function" === t || ("object" === t && !!e);
      }),
      b.each(
        [
          "Arguments",
          "Function",
          "String",
          "Number",
          "Date",
          "RegExp",
          "Error",
        ],
        function (t) {
          b["is" + t] = function (e) {
            return d.call(e) === "[object " + t + "]";
          };
        }
      ),
      b.isArguments(arguments) ||
        (b.isArguments = function (e) {
          return b.has(e, "callee");
        }),
      "function" != typeof /./ &&
        "object" != typeof Int8Array &&
        (b.isFunction = function (e) {
          return "function" == typeof e || !1;
        }),
      (b.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e));
      }),
      (b.isNaN = function (e) {
        return b.isNumber(e) && e !== +e;
      }),
      (b.isBoolean = function (e) {
        return !0 === e || !1 === e || "[object Boolean]" === d.call(e);
      }),
      (b.isNull = function (e) {
        return null === e;
      }),
      (b.isUndefined = function (e) {
        return void 0 === e;
      }),
      (b.has = function (e, t) {
        return null != e && p.call(e, t);
      }),
      (b.noConflict = function () {
        return (o._ = a), this;
      }),
      (b.identity = function (e) {
        return e;
      }),
      (b.constant = function (e) {
        return function () {
          return e;
        };
      }),
      (b.noop = function () {}),
      (b.property = S),
      (b.propertyOf = function (t) {
        return null == t
          ? function () {}
          : function (e) {
              return t[e];
            };
      }),
      (b.matcher = b.matches =
        function (t) {
          return (
            (t = b.extendOwn({}, t)),
            function (e) {
              return b.isMatch(e, t);
            }
          );
        }),
      (b.times = function (e, t, n) {
        var i = Array(Math.max(0, e));
        t = w(t, n, 1);
        for (var r = 0; r < e; r++) i[r] = t(r);
        return i;
      }),
      (b.random = function (e, t) {
        return (
          null == t && ((t = e), (e = 0)),
          e + Math.floor(Math.random() * (t - e + 1))
        );
      }),
      (b.now =
        Date.now ||
        function () {
          return new Date().getTime();
        });
    var F = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
      },
      O = b.invert(F),
      R = function (t) {
        var n = function (e) {
            return t[e];
          },
          e = "(?:" + b.keys(t).join("|") + ")",
          i = RegExp(e),
          r = RegExp(e, "g");
        return function (e) {
          return (e = null == e ? "" : "" + e), i.test(e) ? e.replace(r, n) : e;
        };
      };
    (b.escape = R(F)),
      (b.unescape = R(O)),
      (b.result = function (e, t, n) {
        var i = null == e ? void 0 : e[t];
        return void 0 === i && (i = n), b.isFunction(i) ? i.call(e) : i;
      });
    var I = 0;
    (b.uniqueId = function (e) {
      var t = ++I + "";
      return e ? e + t : t;
    }),
      (b.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g,
      });
    var $ = /(.)^/,
      M = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      H = /\\|'|\r|\n|\u2028|\u2029/g,
      B = function (e) {
        return "\\" + M[e];
      };
    (b.template = function (o, t, n) {
      !t && n && (t = n), (t = b.defaults({}, t, b.templateSettings));
      var i = RegExp(
          [
            (t.escape || $).source,
            (t.interpolate || $).source,
            (t.evaluate || $).source,
          ].join("|") + "|$",
          "g"
        ),
        a = 0,
        s = "__p+='";
      o.replace(i, function (e, t, n, i, r) {
        return (
          (s += o.slice(a, r).replace(H, B)),
          (a = r + e.length),
          t
            ? (s += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'")
            : n
            ? (s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'")
            : i && (s += "';\n" + i + "\n__p+='"),
          e
        );
      }),
        (s += "';\n"),
        t.variable || (s = "with(obj||{}){\n" + s + "}\n"),
        (s =
          "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
          s +
          "return __p;\n");
      try {
        var r = new Function(t.variable || "obj", "_", s);
      } catch (e) {
        throw ((e.source = s), e);
      }
      var l = function (e) {
          return r.call(this, e, b);
        },
        c = t.variable || "obj";
      return (l.source = "function(" + c + "){\n" + s + "}"), l;
    }),
      (b.chain = function (e) {
        var t = b(e);
        return (t._chain = !0), t;
      });
    var q = function (e, t) {
      return e._chain ? b(t).chain() : t;
    };
    (b.mixin = function (n) {
      b.each(b.functions(n), function (e) {
        var t = (b[e] = n[e]);
        b.prototype[e] = function () {
          var e = [this._wrapped];
          return u.apply(e, arguments), q(this, t.apply(b, e));
        };
      });
    }),
      b.mixin(b),
      b.each(
        ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        function (t) {
          var n = s[t];
          b.prototype[t] = function () {
            var e = this._wrapped;
            return (
              n.apply(e, arguments),
              ("shift" !== t && "splice" !== t) ||
                0 !== e.length ||
                delete e[0],
              q(this, e)
            );
          };
        }
      ),
      b.each(["concat", "join", "slice"], function (e) {
        var t = s[e];
        b.prototype[e] = function () {
          return q(this, t.apply(this._wrapped, arguments));
        };
      }),
      (b.prototype.value = function () {
        return this._wrapped;
      }),
      (b.prototype.valueOf = b.prototype.toJSON = b.prototype.value),
      (b.prototype.toString = function () {
        return "" + this._wrapped;
      }),
      "function" == typeof define &&
        define.amd &&
        define("underscore", [], function () {
          return b;
        });
  }.call(this);
var Message,
  Handlebars = {};
!(function (c, s) {
  (c.VERSION = "1.0.0"),
    (c.COMPILER_REVISION = 4),
    (c.REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: ">= 1.0.0",
    }),
    (c.helpers = {}),
    (c.partials = {});
  var u = Object.prototype.toString,
    h = "[object Function]",
    i = "[object Object]";
  (c.registerHelper = function (e, t, n) {
    if (u.call(e) === i) {
      if (n || t)
        throw new c.Exception("Arg not supported with multiple helpers");
      c.Utils.extend(this.helpers, e);
    } else n && (t.not = n), (this.helpers[e] = t);
  }),
    (c.registerPartial = function (e, t) {
      u.call(e) === i
        ? c.Utils.extend(this.partials, e)
        : (this.partials[e] = t);
    }),
    c.registerHelper("helperMissing", function (e) {
      if (2 === arguments.length) return s;
      throw new Error("Missing helper: '" + e + "'");
    }),
    c.registerHelper("blockHelperMissing", function (e, t) {
      var n = t.inverse || function () {},
        i = t.fn,
        r = u.call(e);
      return (
        r === h && (e = e.call(this)),
        !0 === e
          ? i(this)
          : !1 === e || null == e
          ? n(this)
          : "[object Array]" === r
          ? 0 < e.length
            ? c.helpers.each(e, t)
            : n(this)
          : i(e)
      );
    }),
    (c.K = function () {}),
    (c.createFrame =
      Object.create ||
      function (e) {
        c.K.prototype = e;
        var t = new c.K();
        return (c.K.prototype = null), t;
      }),
    (c.logger = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      level: 3,
      methodMap: { 0: "debug", 1: "info", 2: "warn", 3: "error" },
      log: function (e, t) {
        if (c.logger.level <= e) {
          var n = c.logger.methodMap[e];
          "undefined" != typeof console &&
            console[n] &&
            console[n].call(console, t);
        }
      },
    }),
    (c.log = function (e, t) {
      c.logger.log(e, t);
    }),
    c.registerHelper("each", function (e, t) {
      var n,
        i = t.fn,
        r = t.inverse,
        o = 0,
        a = "";
      if (
        (u.call(e) === h && (e = e.call(this)),
        t.data && (n = c.createFrame(t.data)),
        e && "object" == typeof e)
      )
        if (e instanceof Array)
          for (var s = e.length; o < s; o++)
            n && (n.index = o), (a += i(e[o], { data: n }));
        else
          for (var l in e)
            e.hasOwnProperty(l) &&
              (n && (n.key = l), (a += i(e[l], { data: n })), o++);
      return 0 === o && (a = r(this)), a;
    }),
    c.registerHelper("if", function (e, t) {
      return (
        u.call(e) === h && (e = e.call(this)),
        !e || c.Utils.isEmpty(e) ? t.inverse(this) : t.fn(this)
      );
    }),
    c.registerHelper("unless", function (e, t) {
      return c.helpers["if"].call(this, e, { fn: t.inverse, inverse: t.fn });
    }),
    c.registerHelper("with", function (e, t) {
      if ((u.call(e) === h && (e = e.call(this)), !c.Utils.isEmpty(e)))
        return t.fn(e);
    }),
    c.registerHelper("log", function (e, t) {
      var n = t.data && null != t.data.level ? parseInt(t.data.level, 10) : 1;
      c.log(n, e);
    });
  var e = (function () {
    function e() {
      this.yy = {};
    }
    var t = {
        trace: function i() {},
        yy: {},
        symbols_: {
          error: 2,
          root: 3,
          program: 4,
          EOF: 5,
          simpleInverse: 6,
          statements: 7,
          statement: 8,
          openInverse: 9,
          closeBlock: 10,
          openBlock: 11,
          mustache: 12,
          partial: 13,
          CONTENT: 14,
          COMMENT: 15,
          OPEN_BLOCK: 16,
          inMustache: 17,
          CLOSE: 18,
          OPEN_INVERSE: 19,
          OPEN_ENDBLOCK: 20,
          path: 21,
          OPEN: 22,
          OPEN_UNESCAPED: 23,
          CLOSE_UNESCAPED: 24,
          OPEN_PARTIAL: 25,
          partialName: 26,
          params: 27,
          hash: 28,
          dataName: 29,
          param: 30,
          STRING: 31,
          INTEGER: 32,
          BOOLEAN: 33,
          hashSegments: 34,
          hashSegment: 35,
          ID: 36,
          EQUALS: 37,
          DATA: 38,
          pathSegments: 39,
          SEP: 40,
          $accept: 0,
          $end: 1,
        },
        terminals_: {
          2: "error",
          5: "EOF",
          14: "CONTENT",
          15: "COMMENT",
          16: "OPEN_BLOCK",
          18: "CLOSE",
          19: "OPEN_INVERSE",
          20: "OPEN_ENDBLOCK",
          22: "OPEN",
          23: "OPEN_UNESCAPED",
          24: "CLOSE_UNESCAPED",
          25: "OPEN_PARTIAL",
          31: "STRING",
          32: "INTEGER",
          33: "BOOLEAN",
          36: "ID",
          37: "EQUALS",
          38: "DATA",
          40: "SEP",
        },
        productions_: [
          0,
          [3, 2],
          [4, 2],
          [4, 3],
          [4, 2],
          [4, 1],
          [4, 1],
          [4, 0],
          [7, 1],
          [7, 2],
          [8, 3],
          [8, 3],
          [8, 1],
          [8, 1],
          [8, 1],
          [8, 1],
          [11, 3],
          [9, 3],
          [10, 3],
          [12, 3],
          [12, 3],
          [13, 3],
          [13, 4],
          [6, 2],
          [17, 3],
          [17, 2],
          [17, 2],
          [17, 1],
          [17, 1],
          [27, 2],
          [27, 1],
          [30, 1],
          [30, 1],
          [30, 1],
          [30, 1],
          [30, 1],
          [28, 1],
          [34, 2],
          [34, 1],
          [35, 3],
          [35, 3],
          [35, 3],
          [35, 3],
          [35, 3],
          [26, 1],
          [26, 1],
          [26, 1],
          [29, 2],
          [21, 1],
          [39, 3],
          [39, 1],
        ],
        performAction: function s(e, t, n, i, r, o) {
          var a = o.length - 1;
          switch (r) {
            case 1:
              return o[a - 1];
            case 2:
              this.$ = new i.ProgramNode([], o[a]);
              break;
            case 3:
              this.$ = new i.ProgramNode(o[a - 2], o[a]);
              break;
            case 4:
              this.$ = new i.ProgramNode(o[a - 1], []);
              break;
            case 5:
              this.$ = new i.ProgramNode(o[a]);
              break;
            case 6:
              this.$ = new i.ProgramNode([], []);
              break;
            case 7:
              this.$ = new i.ProgramNode([]);
              break;
            case 8:
              this.$ = [o[a]];
              break;
            case 9:
              o[a - 1].push(o[a]), (this.$ = o[a - 1]);
              break;
            case 10:
              this.$ = new i.BlockNode(
                o[a - 2],
                o[a - 1].inverse,
                o[a - 1],
                o[a]
              );
              break;
            case 11:
              this.$ = new i.BlockNode(
                o[a - 2],
                o[a - 1],
                o[a - 1].inverse,
                o[a]
              );
              break;
            case 12:
            case 13:
              this.$ = o[a];
              break;
            case 14:
              this.$ = new i.ContentNode(o[a]);
              break;
            case 15:
              this.$ = new i.CommentNode(o[a]);
              break;
            case 16:
            case 17:
              this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
              break;
            case 18:
              this.$ = o[a - 1];
              break;
            case 19:
              this.$ = new i.MustacheNode(
                o[a - 1][0],
                o[a - 1][1],
                "&" === o[a - 2][2]
              );
              break;
            case 20:
              this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1], !0);
              break;
            case 21:
              this.$ = new i.PartialNode(o[a - 1]);
              break;
            case 22:
              this.$ = new i.PartialNode(o[a - 2], o[a - 1]);
              break;
            case 23:
              break;
            case 24:
              this.$ = [[o[a - 2]].concat(o[a - 1]), o[a]];
              break;
            case 25:
              this.$ = [[o[a - 1]].concat(o[a]), null];
              break;
            case 26:
              this.$ = [[o[a - 1]], o[a]];
              break;
            case 27:
            case 28:
              this.$ = [[o[a]], null];
              break;
            case 29:
              o[a - 1].push(o[a]), (this.$ = o[a - 1]);
              break;
            case 30:
              this.$ = [o[a]];
              break;
            case 31:
              this.$ = o[a];
              break;
            case 32:
              this.$ = new i.StringNode(o[a]);
              break;
            case 33:
              this.$ = new i.IntegerNode(o[a]);
              break;
            case 34:
              this.$ = new i.BooleanNode(o[a]);
              break;
            case 35:
              this.$ = o[a];
              break;
            case 36:
              this.$ = new i.HashNode(o[a]);
              break;
            case 37:
              o[a - 1].push(o[a]), (this.$ = o[a - 1]);
              break;
            case 38:
              this.$ = [o[a]];
              break;
            case 39:
              this.$ = [o[a - 2], o[a]];
              break;
            case 40:
              this.$ = [o[a - 2], new i.StringNode(o[a])];
              break;
            case 41:
              this.$ = [o[a - 2], new i.IntegerNode(o[a])];
              break;
            case 42:
              this.$ = [o[a - 2], new i.BooleanNode(o[a])];
              break;
            case 43:
              this.$ = [o[a - 2], o[a]];
              break;
            case 44:
              this.$ = new i.PartialNameNode(o[a]);
              break;
            case 45:
              this.$ = new i.PartialNameNode(new i.StringNode(o[a]));
              break;
            case 46:
              this.$ = new i.PartialNameNode(new i.IntegerNode(o[a]));
              break;
            case 47:
              this.$ = new i.DataNode(o[a]);
              break;
            case 48:
              this.$ = new i.IdNode(o[a]);
              break;
            case 49:
              o[a - 2].push({ part: o[a], separator: o[a - 1] }),
                (this.$ = o[a - 2]);
              break;
            case 50:
              this.$ = [{ part: o[a] }];
          }
        },
        table: [
          {
            3: 1,
            4: 2,
            5: [2, 7],
            6: 3,
            7: 4,
            8: 6,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 5],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          { 1: [3] },
          { 5: [1, 17] },
          {
            5: [2, 6],
            7: 18,
            8: 6,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 19],
            20: [2, 6],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          {
            5: [2, 5],
            6: 20,
            8: 21,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 5],
            20: [2, 5],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          {
            17: 23,
            18: [1, 22],
            21: 24,
            29: 25,
            36: [1, 28],
            38: [1, 27],
            39: 26,
          },
          {
            5: [2, 8],
            14: [2, 8],
            15: [2, 8],
            16: [2, 8],
            19: [2, 8],
            20: [2, 8],
            22: [2, 8],
            23: [2, 8],
            25: [2, 8],
          },
          {
            4: 29,
            6: 3,
            7: 4,
            8: 6,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 5],
            20: [2, 7],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          {
            4: 30,
            6: 3,
            7: 4,
            8: 6,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 5],
            20: [2, 7],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          {
            5: [2, 12],
            14: [2, 12],
            15: [2, 12],
            16: [2, 12],
            19: [2, 12],
            20: [2, 12],
            22: [2, 12],
            23: [2, 12],
            25: [2, 12],
          },
          {
            5: [2, 13],
            14: [2, 13],
            15: [2, 13],
            16: [2, 13],
            19: [2, 13],
            20: [2, 13],
            22: [2, 13],
            23: [2, 13],
            25: [2, 13],
          },
          {
            5: [2, 14],
            14: [2, 14],
            15: [2, 14],
            16: [2, 14],
            19: [2, 14],
            20: [2, 14],
            22: [2, 14],
            23: [2, 14],
            25: [2, 14],
          },
          {
            5: [2, 15],
            14: [2, 15],
            15: [2, 15],
            16: [2, 15],
            19: [2, 15],
            20: [2, 15],
            22: [2, 15],
            23: [2, 15],
            25: [2, 15],
          },
          { 17: 31, 21: 24, 29: 25, 36: [1, 28], 38: [1, 27], 39: 26 },
          { 17: 32, 21: 24, 29: 25, 36: [1, 28], 38: [1, 27], 39: 26 },
          { 17: 33, 21: 24, 29: 25, 36: [1, 28], 38: [1, 27], 39: 26 },
          { 21: 35, 26: 34, 31: [1, 36], 32: [1, 37], 36: [1, 28], 39: 26 },
          { 1: [2, 1] },
          {
            5: [2, 2],
            8: 21,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 19],
            20: [2, 2],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          { 17: 23, 21: 24, 29: 25, 36: [1, 28], 38: [1, 27], 39: 26 },
          {
            5: [2, 4],
            7: 38,
            8: 6,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 19],
            20: [2, 4],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          {
            5: [2, 9],
            14: [2, 9],
            15: [2, 9],
            16: [2, 9],
            19: [2, 9],
            20: [2, 9],
            22: [2, 9],
            23: [2, 9],
            25: [2, 9],
          },
          {
            5: [2, 23],
            14: [2, 23],
            15: [2, 23],
            16: [2, 23],
            19: [2, 23],
            20: [2, 23],
            22: [2, 23],
            23: [2, 23],
            25: [2, 23],
          },
          { 18: [1, 39] },
          {
            18: [2, 27],
            21: 44,
            24: [2, 27],
            27: 40,
            28: 41,
            29: 48,
            30: 42,
            31: [1, 45],
            32: [1, 46],
            33: [1, 47],
            34: 43,
            35: 49,
            36: [1, 50],
            38: [1, 27],
            39: 26,
          },
          { 18: [2, 28], 24: [2, 28] },
          {
            18: [2, 48],
            24: [2, 48],
            31: [2, 48],
            32: [2, 48],
            33: [2, 48],
            36: [2, 48],
            38: [2, 48],
            40: [1, 51],
          },
          { 21: 52, 36: [1, 28], 39: 26 },
          {
            18: [2, 50],
            24: [2, 50],
            31: [2, 50],
            32: [2, 50],
            33: [2, 50],
            36: [2, 50],
            38: [2, 50],
            40: [2, 50],
          },
          { 10: 53, 20: [1, 54] },
          { 10: 55, 20: [1, 54] },
          { 18: [1, 56] },
          { 18: [1, 57] },
          { 24: [1, 58] },
          { 18: [1, 59], 21: 60, 36: [1, 28], 39: 26 },
          { 18: [2, 44], 36: [2, 44] },
          { 18: [2, 45], 36: [2, 45] },
          { 18: [2, 46], 36: [2, 46] },
          {
            5: [2, 3],
            8: 21,
            9: 7,
            11: 8,
            12: 9,
            13: 10,
            14: [1, 11],
            15: [1, 12],
            16: [1, 13],
            19: [1, 19],
            20: [2, 3],
            22: [1, 14],
            23: [1, 15],
            25: [1, 16],
          },
          {
            14: [2, 17],
            15: [2, 17],
            16: [2, 17],
            19: [2, 17],
            20: [2, 17],
            22: [2, 17],
            23: [2, 17],
            25: [2, 17],
          },
          {
            18: [2, 25],
            21: 44,
            24: [2, 25],
            28: 61,
            29: 48,
            30: 62,
            31: [1, 45],
            32: [1, 46],
            33: [1, 47],
            34: 43,
            35: 49,
            36: [1, 50],
            38: [1, 27],
            39: 26,
          },
          { 18: [2, 26], 24: [2, 26] },
          {
            18: [2, 30],
            24: [2, 30],
            31: [2, 30],
            32: [2, 30],
            33: [2, 30],
            36: [2, 30],
            38: [2, 30],
          },
          { 18: [2, 36], 24: [2, 36], 35: 63, 36: [1, 64] },
          {
            18: [2, 31],
            24: [2, 31],
            31: [2, 31],
            32: [2, 31],
            33: [2, 31],
            36: [2, 31],
            38: [2, 31],
          },
          {
            18: [2, 32],
            24: [2, 32],
            31: [2, 32],
            32: [2, 32],
            33: [2, 32],
            36: [2, 32],
            38: [2, 32],
          },
          {
            18: [2, 33],
            24: [2, 33],
            31: [2, 33],
            32: [2, 33],
            33: [2, 33],
            36: [2, 33],
            38: [2, 33],
          },
          {
            18: [2, 34],
            24: [2, 34],
            31: [2, 34],
            32: [2, 34],
            33: [2, 34],
            36: [2, 34],
            38: [2, 34],
          },
          {
            18: [2, 35],
            24: [2, 35],
            31: [2, 35],
            32: [2, 35],
            33: [2, 35],
            36: [2, 35],
            38: [2, 35],
          },
          { 18: [2, 38], 24: [2, 38], 36: [2, 38] },
          {
            18: [2, 50],
            24: [2, 50],
            31: [2, 50],
            32: [2, 50],
            33: [2, 50],
            36: [2, 50],
            37: [1, 65],
            38: [2, 50],
            40: [2, 50],
          },
          { 36: [1, 66] },
          {
            18: [2, 47],
            24: [2, 47],
            31: [2, 47],
            32: [2, 47],
            33: [2, 47],
            36: [2, 47],
            38: [2, 47],
          },
          {
            5: [2, 10],
            14: [2, 10],
            15: [2, 10],
            16: [2, 10],
            19: [2, 10],
            20: [2, 10],
            22: [2, 10],
            23: [2, 10],
            25: [2, 10],
          },
          { 21: 67, 36: [1, 28], 39: 26 },
          {
            5: [2, 11],
            14: [2, 11],
            15: [2, 11],
            16: [2, 11],
            19: [2, 11],
            20: [2, 11],
            22: [2, 11],
            23: [2, 11],
            25: [2, 11],
          },
          {
            14: [2, 16],
            15: [2, 16],
            16: [2, 16],
            19: [2, 16],
            20: [2, 16],
            22: [2, 16],
            23: [2, 16],
            25: [2, 16],
          },
          {
            5: [2, 19],
            14: [2, 19],
            15: [2, 19],
            16: [2, 19],
            19: [2, 19],
            20: [2, 19],
            22: [2, 19],
            23: [2, 19],
            25: [2, 19],
          },
          {
            5: [2, 20],
            14: [2, 20],
            15: [2, 20],
            16: [2, 20],
            19: [2, 20],
            20: [2, 20],
            22: [2, 20],
            23: [2, 20],
            25: [2, 20],
          },
          {
            5: [2, 21],
            14: [2, 21],
            15: [2, 21],
            16: [2, 21],
            19: [2, 21],
            20: [2, 21],
            22: [2, 21],
            23: [2, 21],
            25: [2, 21],
          },
          { 18: [1, 68] },
          { 18: [2, 24], 24: [2, 24] },
          {
            18: [2, 29],
            24: [2, 29],
            31: [2, 29],
            32: [2, 29],
            33: [2, 29],
            36: [2, 29],
            38: [2, 29],
          },
          { 18: [2, 37], 24: [2, 37], 36: [2, 37] },
          { 37: [1, 65] },
          {
            21: 69,
            29: 73,
            31: [1, 70],
            32: [1, 71],
            33: [1, 72],
            36: [1, 28],
            38: [1, 27],
            39: 26,
          },
          {
            18: [2, 49],
            24: [2, 49],
            31: [2, 49],
            32: [2, 49],
            33: [2, 49],
            36: [2, 49],
            38: [2, 49],
            40: [2, 49],
          },
          { 18: [1, 74] },
          {
            5: [2, 22],
            14: [2, 22],
            15: [2, 22],
            16: [2, 22],
            19: [2, 22],
            20: [2, 22],
            22: [2, 22],
            23: [2, 22],
            25: [2, 22],
          },
          { 18: [2, 39], 24: [2, 39], 36: [2, 39] },
          { 18: [2, 40], 24: [2, 40], 36: [2, 40] },
          { 18: [2, 41], 24: [2, 41], 36: [2, 41] },
          { 18: [2, 42], 24: [2, 42], 36: [2, 42] },
          { 18: [2, 43], 24: [2, 43], 36: [2, 43] },
          {
            5: [2, 18],
            14: [2, 18],
            15: [2, 18],
            16: [2, 18],
            19: [2, 18],
            20: [2, 18],
            22: [2, 18],
            23: [2, 18],
            25: [2, 18],
          },
        ],
        defaultActions: { 17: [2, 1] },
        parseError: function r(e) {
          throw new Error(e);
        },
        parse: function S(e) {
          function t() {
            var e;
            return (
              "number" != typeof (e = n.lexer.lex() || 1) &&
                (e = n.symbols_[e] || e),
              e
            );
          }
          var n = this,
            i = [0],
            r = [null],
            o = [],
            a = this.table,
            s = "",
            l = 0,
            c = 0,
            u = 0;
          this.lexer.setInput(e),
            (this.lexer.yy = this.yy),
            (this.yy.lexer = this.lexer),
            "undefined" == typeof (this.yy.parser = this).lexer.yylloc &&
              (this.lexer.yylloc = {});
          var h = this.lexer.yylloc;
          o.push(h);
          var d = this.lexer.options && this.lexer.options.ranges;
          "function" == typeof this.yy.parseError &&
            (this.parseError = this.yy.parseError);
          for (var p, f, m, g, v, y, b, w, x, _ = {}; ; ) {
            if (
              ((m = i[i.length - 1]),
              this.defaultActions[m]
                ? (g = this.defaultActions[m])
                : (null == p && (p = t()), (g = a[m] && a[m][p])),
              void 0 === g || !g.length || !g[0])
            ) {
              var E = "";
              if (!u) {
                for (y in ((x = []), a[m]))
                  this.terminals_[y] &&
                    2 < y &&
                    x.push("'" + this.terminals_[y] + "'");
                (E = this.lexer.showPosition
                  ? "Parse error on line " +
                    (l + 1) +
                    ":\n" +
                    this.lexer.showPosition() +
                    "\nExpecting " +
                    x.join(", ") +
                    ", got '" +
                    (this.terminals_[p] || p) +
                    "'"
                  : "Parse error on line " +
                    (l + 1) +
                    ": Unexpected " +
                    (1 == p
                      ? "end of input"
                      : "'" + (this.terminals_[p] || p) + "'")),
                  this.parseError(E, {
                    text: this.lexer.match,
                    token: this.terminals_[p] || p,
                    line: this.lexer.yylineno,
                    loc: h,
                    expected: x,
                  });
              }
            }
            if (g[0] instanceof Array && 1 < g.length)
              throw new Error(
                "Parse Error: multiple actions possible at state: " +
                  m +
                  ", token: " +
                  p
              );
            switch (g[0]) {
              case 1:
                i.push(p),
                  r.push(this.lexer.yytext),
                  o.push(this.lexer.yylloc),
                  i.push(g[1]),
                  (p = null),
                  f
                    ? ((p = f), (f = null))
                    : ((c = this.lexer.yyleng),
                      (s = this.lexer.yytext),
                      (l = this.lexer.yylineno),
                      (h = this.lexer.yylloc),
                      0 < u && u--);
                break;
              case 2:
                if (
                  ((b = this.productions_[g[1]][1]),
                  (_.$ = r[r.length - b]),
                  (_._$ = {
                    first_line: o[o.length - (b || 1)].first_line,
                    last_line: o[o.length - 1].last_line,
                    first_column: o[o.length - (b || 1)].first_column,
                    last_column: o[o.length - 1].last_column,
                  }),
                  d &&
                    (_._$.range = [
                      o[o.length - (b || 1)].range[0],
                      o[o.length - 1].range[1],
                    ]),
                  void 0 !==
                    (v = this.performAction.call(
                      _,
                      s,
                      c,
                      l,
                      this.yy,
                      g[1],
                      r,
                      o
                    )))
                )
                  return v;
                b &&
                  ((i = i.slice(0, -1 * b * 2)),
                  (r = r.slice(0, -1 * b)),
                  (o = o.slice(0, -1 * b))),
                  i.push(this.productions_[g[1]][0]),
                  r.push(_.$),
                  o.push(_._$),
                  (w = a[i[i.length - 2]][i[i.length - 1]]),
                  i.push(w);
                break;
              case 3:
                return !0;
            }
          }
          return !0;
        },
      },
      n = {
        EOF: 1,
        parseError: function o(e, t) {
          if (!this.yy.parser) throw new Error(e);
          this.yy.parser.parseError(e, t);
        },
        setInput: function (e) {
          return (
            (this._input = e),
            (this._more = this._less = this.done = !1),
            (this.yylineno = this.yyleng = 0),
            (this.yytext = this.matched = this.match = ""),
            (this.conditionStack = ["INITIAL"]),
            (this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0,
            }),
            this.options.ranges && (this.yylloc.range = [0, 0]),
            (this.offset = 0),
            this
          );
        },
        input: function () {
          var e = this._input[0];
          return (
            (this.yytext += e),
            this.yyleng++,
            this.offset++,
            (this.match += e),
            (this.matched += e),
            e.match(/(?:\r\n?|\n).*/g)
              ? (this.yylineno++, this.yylloc.last_line++)
              : this.yylloc.last_column++,
            this.options.ranges && this.yylloc.range[1]++,
            (this._input = this._input.slice(1)),
            e
          );
        },
        unput: function (e) {
          var t = e.length,
            n = e.split(/(?:\r\n?|\n)/g);
          (this._input = e + this._input),
            (this.yytext = this.yytext.substr(0, this.yytext.length - t - 1)),
            (this.offset -= t);
          var i = this.match.split(/(?:\r\n?|\n)/g);
          (this.match = this.match.substr(0, this.match.length - 1)),
            (this.matched = this.matched.substr(0, this.matched.length - 1)),
            n.length - 1 && (this.yylineno -= n.length - 1);
          var r = this.yylloc.range;
          return (
            (this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: n
                ? (n.length === i.length ? this.yylloc.first_column : 0) +
                  i[i.length - n.length].length -
                  n[0].length
                : this.yylloc.first_column - t,
            }),
            this.options.ranges &&
              (this.yylloc.range = [r[0], r[0] + this.yyleng - t]),
            this
          );
        },
        more: function () {
          return (this._more = !0), this;
        },
        less: function (e) {
          this.unput(this.match.slice(e));
        },
        pastInput: function () {
          var e = this.matched.substr(
            0,
            this.matched.length - this.match.length
          );
          return (
            (20 < e.length ? "..." : "") + e.substr(-20).replace(/\n/g, "")
          );
        },
        upcomingInput: function () {
          var e = this.match;
          return (
            e.length < 20 && (e += this._input.substr(0, 20 - e.length)),
            (e.substr(0, 20) + (20 < e.length ? "..." : "")).replace(/\n/g, "")
          );
        },
        showPosition: function () {
          var e = this.pastInput(),
            t = new Array(e.length + 1).join("-");
          return e + this.upcomingInput() + "\n" + t + "^";
        },
        next: function () {
          if (this.done) return this.EOF;
          var e, t, n, i, r;
          this._input || (this.done = !0),
            this._more || ((this.yytext = ""), (this.match = ""));
          for (
            var o = this._currentRules(), a = 0;
            a < o.length &&
            (!(n = this._input.match(this.rules[o[a]])) ||
              (t && !(n[0].length > t[0].length)) ||
              ((t = n), (i = a), this.options.flex));
            a++
          );
          return t
            ? ((r = t[0].match(/(?:\r\n?|\n).*/g)) &&
                (this.yylineno += r.length),
              (this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: r
                  ? r[r.length - 1].length -
                    r[r.length - 1].match(/\r?\n?/)[0].length
                  : this.yylloc.last_column + t[0].length,
              }),
              (this.yytext += t[0]),
              (this.match += t[0]),
              (this.matches = t),
              (this.yyleng = this.yytext.length),
              this.options.ranges &&
                (this.yylloc.range = [
                  this.offset,
                  (this.offset += this.yyleng),
                ]),
              (this._more = !1),
              (this._input = this._input.slice(t[0].length)),
              (this.matched += t[0]),
              (e = this.performAction.call(
                this,
                this.yy,
                this,
                o[i],
                this.conditionStack[this.conditionStack.length - 1]
              )),
              this.done && this._input && (this.done = !1),
              e || void 0)
            : "" === this._input
            ? this.EOF
            : this.parseError(
                "Lexical error on line " +
                  (this.yylineno + 1) +
                  ". Unrecognized text.\n" +
                  this.showPosition(),
                { text: "", token: null, line: this.yylineno }
              );
        },
        lex: function a() {
          var e = this.next();
          return void 0 !== e ? e : this.lex();
        },
        begin: function l(e) {
          this.conditionStack.push(e);
        },
        popState: function c() {
          return this.conditionStack.pop();
        },
        _currentRules: function u() {
          return this.conditions[
            this.conditionStack[this.conditionStack.length - 1]
          ].rules;
        },
        topState: function () {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function l(e) {
          this.begin(e);
        },
        options: {},
        performAction: function h(e, t, n) {
          switch (n) {
            case 0:
              return (t.yytext = "\\"), 14;
            case 1:
              if (
                ("\\" !== t.yytext.slice(-1) && this.begin("mu"),
                "\\" === t.yytext.slice(-1) &&
                  ((t.yytext = t.yytext.substr(0, t.yyleng - 1)),
                  this.begin("emu")),
                t.yytext)
              )
                return 14;
              break;
            case 2:
              return 14;
            case 3:
              return (
                "\\" !== t.yytext.slice(-1) && this.popState(),
                "\\" === t.yytext.slice(-1) &&
                  (t.yytext = t.yytext.substr(0, t.yyleng - 1)),
                14
              );
            case 4:
              return (
                (t.yytext = t.yytext.substr(0, t.yyleng - 4)),
                this.popState(),
                15
              );
            case 5:
              return 25;
            case 6:
              return 16;
            case 7:
              return 20;
            case 8:
            case 9:
              return 19;
            case 10:
              return 23;
            case 11:
              return 22;
            case 12:
              this.popState(), this.begin("com");
              break;
            case 13:
              return (
                (t.yytext = t.yytext.substr(3, t.yyleng - 5)),
                this.popState(),
                15
              );
            case 14:
              return 22;
            case 15:
              return 37;
            case 16:
            case 17:
              return 36;
            case 18:
              return 40;
            case 19:
              break;
            case 20:
              return this.popState(), 24;
            case 21:
              return this.popState(), 18;
            case 22:
              return (
                (t.yytext = t.yytext
                  .substr(1, t.yyleng - 2)
                  .replace(/\\"/g, '"')),
                31
              );
            case 23:
              return (
                (t.yytext = t.yytext
                  .substr(1, t.yyleng - 2)
                  .replace(/\\'/g, "'")),
                31
              );
            case 24:
              return 38;
            case 25:
            case 26:
              return 33;
            case 27:
              return 32;
            case 28:
              return 36;
            case 29:
              return (t.yytext = t.yytext.substr(1, t.yyleng - 2)), 36;
            case 30:
              return "INVALID";
            case 31:
              return 5;
          }
        },
        rules: [
          /^(?:\\\\(?=(\{\{)))/,
          /^(?:[^\x00]*?(?=(\{\{)))/,
          /^(?:[^\x00]+)/,
          /^(?:[^\x00]{2,}?(?=(\{\{|$)))/,
          /^(?:[\s\S]*?--\}\})/,
          /^(?:\{\{>)/,
          /^(?:\{\{#)/,
          /^(?:\{\{\/)/,
          /^(?:\{\{\^)/,
          /^(?:\{\{\s*else\b)/,
          /^(?:\{\{\{)/,
          /^(?:\{\{&)/,
          /^(?:\{\{!--)/,
          /^(?:\{\{![\s\S]*?\}\})/,
          /^(?:\{\{)/,
          /^(?:=)/,
          /^(?:\.(?=[}\/ ]))/,
          /^(?:\.\.)/,
          /^(?:[\/.])/,
          /^(?:\s+)/,
          /^(?:\}\}\})/,
          /^(?:\}\})/,
          /^(?:"(\\["]|[^"])*")/,
          /^(?:'(\\[']|[^'])*')/,
          /^(?:@)/,
          /^(?:true(?=[}\s]))/,
          /^(?:false(?=[}\s]))/,
          /^(?:-?[0-9]+(?=[}\s]))/,
          /^(?:[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.]))/,
          /^(?:\[[^\]]*\])/,
          /^(?:.)/,
          /^(?:$)/,
        ],
        conditions: {
          mu: {
            rules: [
              5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
              23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            inclusive: !1,
          },
          emu: { rules: [3], inclusive: !1 },
          com: { rules: [4], inclusive: !1 },
          INITIAL: { rules: [0, 1, 2, 31], inclusive: !0 },
        },
      };
    return (t.lexer = n), new ((e.prototype = t).Parser = e)();
  })();
  (c.Parser = e),
    (c.parse = function (e) {
      return e.constructor === c.AST.ProgramNode
        ? e
        : ((c.Parser.yy = c.AST), c.Parser.parse(e));
    }),
    (c.AST = {}),
    (c.AST.ProgramNode = function (e, t) {
      (this.type = "program"),
        (this.statements = e),
        t && (this.inverse = new c.AST.ProgramNode(t));
    }),
    (c.AST.MustacheNode = function (e, t, n) {
      (this.type = "mustache"), (this.escaped = !n), (this.hash = t);
      var i = (this.id = e[0]),
        r = (this.params = e.slice(1)),
        o = (this.eligibleHelper = i.isSimple);
      this.isHelper = o && (r.length || t);
    }),
    (c.AST.PartialNode = function (e, t) {
      (this.type = "partial"), (this.partialName = e), (this.context = t);
    }),
    (c.AST.BlockNode = function (e, t, n, i) {
      (function (e, t) {
        if (e.original !== t.original)
          throw new c.Exception(e.original + " doesn't match " + t.original);
      })(e.id, i),
        (this.type = "block"),
        (this.mustache = e),
        (this.program = t),
        (this.inverse = n),
        this.inverse && !this.program && (this.isInverse = !0);
    }),
    (c.AST.ContentNode = function (e) {
      (this.type = "content"), (this.string = e);
    }),
    (c.AST.HashNode = function (e) {
      (this.type = "hash"), (this.pairs = e);
    }),
    (c.AST.IdNode = function (e) {
      this.type = "ID";
      for (var t = "", n = [], i = 0, r = 0, o = e.length; r < o; r++) {
        var a = e[r].part;
        if (
          ((t += (e[r].separator || "") + a),
          ".." === a || "." === a || "this" === a)
        ) {
          if (0 < n.length) throw new c.Exception("Invalid path: " + t);
          ".." === a ? i++ : (this.isScoped = !0);
        } else n.push(a);
      }
      (this.original = t),
        (this.parts = n),
        (this.string = n.join(".")),
        (this.depth = i),
        (this.isSimple = 1 === e.length && !this.isScoped && 0 === i),
        (this.stringModeValue = this.string);
    }),
    (c.AST.PartialNameNode = function (e) {
      (this.type = "PARTIAL_NAME"), (this.name = e.original);
    }),
    (c.AST.DataNode = function (e) {
      (this.type = "DATA"), (this.id = e);
    }),
    (c.AST.StringNode = function (e) {
      (this.type = "STRING"),
        (this.original = this.string = this.stringModeValue = e);
    }),
    (c.AST.IntegerNode = function (e) {
      (this.type = "INTEGER"),
        (this.original = this.integer = e),
        (this.stringModeValue = Number(e));
    }),
    (c.AST.BooleanNode = function (e) {
      (this.type = "BOOLEAN"),
        (this.bool = e),
        (this.stringModeValue = "true" === e);
    }),
    (c.AST.CommentNode = function (e) {
      (this.type = "comment"), (this.comment = e);
    });
  var r = [
    "description",
    "fileName",
    "lineNumber",
    "message",
    "name",
    "number",
    "stack",
  ];
  (c.Exception = function (e) {
    for (
      var t = Error.prototype.constructor.apply(this, arguments), n = 0;
      n < r.length;
      n++
    )
      this[r[n]] = t[r[n]];
  }),
    (c.Exception.prototype = new Error()),
    (c.SafeString = function (e) {
      this.string = e;
    }),
    (c.SafeString.prototype.toString = function () {
      return this.string.toString();
    });
  var t = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
    },
    n = /[&<>"'`]/g,
    o = /[&<>"'`]/,
    a = function (e) {
      return t[e] || "&amp;";
    };
  c.Utils = {
    extend: function (e, t) {
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
    },
    escapeExpression: function (e) {
      return e instanceof c.SafeString
        ? e.toString()
        : null == e || !1 === e
        ? ""
        : ((e = e.toString()), o.test(e) ? e.replace(n, a) : e);
    },
    isEmpty: function (e) {
      return (
        (!e && 0 !== e) || ("[object Array]" === u.call(e) && 0 === e.length)
      );
    },
  };
  var l = (c.Compiler = function () {}),
    d = (c.JavaScriptCompiler = function () {});
  l.prototype = {
    compiler: l,
    disassemble: function () {
      for (
        var e, t, n, i = this.opcodes, r = [], o = 0, a = i.length;
        o < a;
        o++
      )
        if ("DECLARE" === (e = i[o]).opcode)
          r.push("DECLARE " + e.name + "=" + e.value);
        else {
          t = [];
          for (var s = 0; s < e.args.length; s++)
            "string" == typeof (n = e.args[s]) &&
              (n = '"' + n.replace("\n", "\\n") + '"'),
              t.push(n);
          r.push(e.opcode + " " + t.join(" "));
        }
      return r.join("\n");
    },
    equals: function (e) {
      var t = this.opcodes.length;
      if (e.opcodes.length !== t) return !1;
      for (var n = 0; n < t; n++) {
        var i = this.opcodes[n],
          r = e.opcodes[n];
        if (i.opcode !== r.opcode || i.args.length !== r.args.length) return !1;
        for (var o = 0; o < i.args.length; o++)
          if (i.args[o] !== r.args[o]) return !1;
      }
      if (((t = this.children.length), e.children.length !== t)) return !1;
      for (n = 0; n < t; n++)
        if (!this.children[n].equals(e.children[n])) return !1;
      return !0;
    },
    guid: 0,
    compile: function (e, t) {
      (this.children = []), (this.depths = { list: [] }), (this.options = t);
      var n = this.options.knownHelpers;
      if (
        ((this.options.knownHelpers = {
          helperMissing: !0,
          blockHelperMissing: !0,
          each: !0,
          if: !0,
          unless: !0,
          with: !0,
          log: !0,
        }),
        n)
      )
        for (var i in n) this.options.knownHelpers[i] = n[i];
      return this.program(e);
    },
    accept: function (e) {
      return this[e.type](e);
    },
    program: function (e) {
      var t,
        n = e.statements;
      this.opcodes = [];
      for (var i = 0, r = n.length; i < r; i++) this[(t = n[i]).type](t);
      return (
        (this.isSimple = 1 === r),
        (this.depths.list = this.depths.list.sort(function (e, t) {
          return e - t;
        })),
        this
      );
    },
    compileProgram: function (e) {
      var t,
        n = new this.compiler().compile(e, this.options),
        i = this.guid++;
      this.usePartial = this.usePartial || n.usePartial;
      for (var r = 0, o = (this.children[i] = n).depths.list.length; r < o; r++)
        (t = n.depths.list[r]) < 2 || this.addDepth(t - 1);
      return i;
    },
    block: function (e) {
      var t = e.mustache,
        n = e.program,
        i = e.inverse;
      n && (n = this.compileProgram(n)), i && (i = this.compileProgram(i));
      var r = this.classifyMustache(t);
      "helper" === r
        ? this.helperMustache(t, n, i)
        : "simple" === r
        ? (this.simpleMustache(t),
          this.opcode("pushProgram", n),
          this.opcode("pushProgram", i),
          this.opcode("emptyHash"),
          this.opcode("blockValue"))
        : (this.ambiguousMustache(t, n, i),
          this.opcode("pushProgram", n),
          this.opcode("pushProgram", i),
          this.opcode("emptyHash"),
          this.opcode("ambiguousBlockValue")),
        this.opcode("append");
    },
    hash: function (e) {
      var t,
        n,
        i = e.pairs;
      this.opcode("pushHash");
      for (var r = 0, o = i.length; r < o; r++)
        (n = (t = i[r])[1]),
          this.options.stringParams
            ? (n.depth && this.addDepth(n.depth),
              this.opcode("getContext", n.depth || 0),
              this.opcode("pushStringParam", n.stringModeValue, n.type))
            : this.accept(n),
          this.opcode("assignToHash", t[0]);
      this.opcode("popHash");
    },
    partial: function (e) {
      var t = e.partialName;
      (this.usePartial = !0),
        e.context ? this.ID(e.context) : this.opcode("push", "depth0"),
        this.opcode("invokePartial", t.name),
        this.opcode("append");
    },
    content: function (e) {
      this.opcode("appendContent", e.string);
    },
    mustache: function (e) {
      var t = this.options,
        n = this.classifyMustache(e);
      "simple" === n
        ? this.simpleMustache(e)
        : "helper" === n
        ? this.helperMustache(e)
        : this.ambiguousMustache(e),
        e.escaped && !t.noEscape
          ? this.opcode("appendEscaped")
          : this.opcode("append");
    },
    ambiguousMustache: function (e, t, n) {
      var i = e.id,
        r = i.parts[0],
        o = null != t || null != n;
      this.opcode("getContext", i.depth),
        this.opcode("pushProgram", t),
        this.opcode("pushProgram", n),
        this.opcode("invokeAmbiguous", r, o);
    },
    simpleMustache: function (e) {
      var t = e.id;
      "DATA" === t.type
        ? this.DATA(t)
        : t.parts.length
        ? this.ID(t)
        : (this.addDepth(t.depth),
          this.opcode("getContext", t.depth),
          this.opcode("pushContext")),
        this.opcode("resolvePossibleLambda");
    },
    helperMustache: function (e, t, n) {
      var i = this.setupFullMustacheParams(e, t, n),
        r = e.id.parts[0];
      if (this.options.knownHelpers[r])
        this.opcode("invokeKnownHelper", i.length, r);
      else {
        if (this.options.knownHelpersOnly)
          throw new Error(
            "You specified knownHelpersOnly, but used the unknown helper " + r
          );
        this.opcode("invokeHelper", i.length, r);
      }
    },
    ID: function (e) {
      this.addDepth(e.depth),
        this.opcode("getContext", e.depth),
        e.parts[0]
          ? this.opcode("lookupOnContext", e.parts[0])
          : this.opcode("pushContext");
      for (var t = 1, n = e.parts.length; t < n; t++)
        this.opcode("lookup", e.parts[t]);
    },
    DATA: function (e) {
      if (((this.options.data = !0), e.id.isScoped || e.id.depth))
        throw new c.Exception(
          "Scoped data references are not supported: " + e.original
        );
      this.opcode("lookupData");
      for (var t = e.id.parts, n = 0, i = t.length; n < i; n++)
        this.opcode("lookup", t[n]);
    },
    STRING: function (e) {
      this.opcode("pushString", e.string);
    },
    INTEGER: function (e) {
      this.opcode("pushLiteral", e.integer);
    },
    BOOLEAN: function (e) {
      this.opcode("pushLiteral", e.bool);
    },
    comment: function () {},
    opcode: function (e) {
      this.opcodes.push({ opcode: e, args: [].slice.call(arguments, 1) });
    },
    declare: function (e, t) {
      this.opcodes.push({ opcode: "DECLARE", name: e, value: t });
    },
    addDepth: function (e) {
      if (isNaN(e)) throw new Error("EWOT");
      0 !== e &&
        (this.depths[e] || ((this.depths[e] = !0), this.depths.list.push(e)));
    },
    classifyMustache: function (e) {
      var t = e.isHelper,
        n = e.eligibleHelper,
        i = this.options;
      if (n && !t) {
        var r = e.id.parts[0];
        i.knownHelpers[r] ? (t = !0) : i.knownHelpersOnly && (n = !1);
      }
      return t ? "helper" : n ? "ambiguous" : "simple";
    },
    pushParams: function (e) {
      for (var t, n = e.length; n--; )
        (t = e[n]),
          this.options.stringParams
            ? (t.depth && this.addDepth(t.depth),
              this.opcode("getContext", t.depth || 0),
              this.opcode("pushStringParam", t.stringModeValue, t.type))
            : this[t.type](t);
    },
    setupMustacheParams: function (e) {
      var t = e.params;
      return (
        this.pushParams(t),
        e.hash ? this.hash(e.hash) : this.opcode("emptyHash"),
        t
      );
    },
    setupFullMustacheParams: function (e, t, n) {
      var i = e.params;
      return (
        this.pushParams(i),
        this.opcode("pushProgram", t),
        this.opcode("pushProgram", n),
        e.hash ? this.hash(e.hash) : this.opcode("emptyHash"),
        i
      );
    },
  };
  var p = function (e) {
    this.value = e;
  };
  d.prototype = {
    nameLookup: function (e, t) {
      return /^[0-9]+$/.test(t)
        ? e + "[" + t + "]"
        : d.isValidJavaScriptVariableName(t)
        ? e + "." + t
        : e + "['" + t + "']";
    },
    appendToBuffer: function (e) {
      return this.environment.isSimple
        ? "return " + e + ";"
        : {
            appendToBuffer: !0,
            content: e,
            toString: function () {
              return "buffer += " + e + ";";
            },
          };
    },
    initializeBuffer: function () {
      return this.quotedString("");
    },
    namespace: "Handlebars",
    compile: function (e, t, n, i) {
      (this.environment = e),
        (this.options = t || {}),
        c.log(c.logger.DEBUG, this.environment.disassemble() + "\n\n"),
        (this.name = this.environment.name),
        (this.isChild = !!n),
        (this.context = n || { programs: [], environments: [], aliases: {} }),
        this.preamble(),
        (this.stackSlot = 0),
        (this.stackVars = []),
        (this.registers = { list: [] }),
        (this.compileStack = []),
        (this.inlineStack = []),
        this.compileChildren(e, t);
      var r,
        o = e.opcodes;
      for (this.i = 0, v = o.length; this.i < v; this.i++)
        "DECLARE" === (r = o[this.i]).opcode
          ? (this[r.name] = r.value)
          : this[r.opcode].apply(this, r.args);
      return this.createFunctionContext(i);
    },
    nextOpcode: function () {
      return this.environment.opcodes[this.i + 1];
    },
    eat: function () {
      this.i = this.i + 1;
    },
    preamble: function () {
      var e = [];
      if (this.isChild) e.push("");
      else {
        var t = this.namespace,
          n = "helpers = this.merge(helpers, " + t + ".helpers);";
        this.environment.usePartial &&
          (n = n + " partials = this.merge(partials, " + t + ".partials);"),
          this.options.data && (n += " data = data || {};"),
          e.push(n);
      }
      this.environment.isSimple
        ? e.push("")
        : e.push(", buffer = " + this.initializeBuffer()),
        (this.lastContext = 0),
        (this.source = e);
    },
    createFunctionContext: function (e) {
      var t = this.stackVars.concat(this.registers.list);
      if (
        (0 < t.length &&
          (this.source[1] = this.source[1] + ", " + t.join(", ")),
        !this.isChild)
      )
        for (var n in this.context.aliases)
          this.context.aliases.hasOwnProperty(n) &&
            (this.source[1] =
              this.source[1] + ", " + n + "=" + this.context.aliases[n]);
      this.source[1] &&
        (this.source[1] = "var " + this.source[1].substring(2) + ";"),
        this.isChild ||
          (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"),
        this.environment.isSimple || this.source.push("return buffer;");
      for (
        var i = this.isChild
            ? ["depth0", "data"]
            : ["Handlebars", "depth0", "helpers", "partials", "data"],
          r = 0,
          o = this.environment.depths.list.length;
        r < o;
        r++
      )
        i.push("depth" + this.environment.depths.list[r]);
      var a = this.mergeSource();
      if (!this.isChild) {
        var s = c.COMPILER_REVISION;
        a =
          "this.compilerInfo = [" +
          s +
          ",'" +
          c.REVISION_CHANGES[s] +
          "'];\n" +
          a;
      }
      if (e) return i.push(a), Function.apply(this, i);
      var l =
        "function " +
        (this.name || "") +
        "(" +
        i.join(",") +
        ") {\n  " +
        a +
        "}";
      return c.log(c.logger.DEBUG, l + "\n\n"), l;
    },
    mergeSource: function () {
      for (var e, t = "", n = 0, i = this.source.length; n < i; n++) {
        var r = this.source[n];
        r.appendToBuffer
          ? (e = e ? e + "\n    + " + r.content : r.content)
          : (e && ((t += "buffer += " + e + ";\n  "), (e = s)),
            (t += r + "\n  "));
      }
      return t;
    },
    blockValue: function () {
      this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
      var t = ["depth0"];
      this.setupParams(0, t),
        this.replaceStack(function (e) {
          return (
            t.splice(1, 0, e), "blockHelperMissing.call(" + t.join(", ") + ")"
          );
        });
    },
    ambiguousBlockValue: function () {
      this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
      var e = ["depth0"];
      this.setupParams(0, e);
      var t = this.topStack();
      e.splice(1, 0, t),
        (e[e.length - 1] = "options"),
        this.source.push(
          "if (!" +
            this.lastHelper +
            ") { " +
            t +
            " = blockHelperMissing.call(" +
            e.join(", ") +
            "); }"
        );
    },
    appendContent: function (e) {
      this.source.push(this.appendToBuffer(this.quotedString(e)));
    },
    append: function () {
      this.flushInline();
      var e = this.popStack();
      this.source.push(
        "if(" + e + " || " + e + " === 0) { " + this.appendToBuffer(e) + " }"
      ),
        this.environment.isSimple &&
          this.source.push("else { " + this.appendToBuffer("''") + " }");
    },
    appendEscaped: function () {
      (this.context.aliases.escapeExpression = "this.escapeExpression"),
        this.source.push(
          this.appendToBuffer("escapeExpression(" + this.popStack() + ")")
        );
    },
    getContext: function (e) {
      this.lastContext !== e && (this.lastContext = e);
    },
    lookupOnContext: function (e) {
      this.push(this.nameLookup("depth" + this.lastContext, e, "context"));
    },
    pushContext: function () {
      this.pushStackLiteral("depth" + this.lastContext);
    },
    resolvePossibleLambda: function () {
      (this.context.aliases.functionType = '"function"'),
        this.replaceStack(function (e) {
          return (
            "typeof " + e + " === functionType ? " + e + ".apply(depth0) : " + e
          );
        });
    },
    lookup: function (t) {
      this.replaceStack(function (e) {
        return (
          e +
          " == null || " +
          e +
          " === false ? " +
          e +
          " : " +
          this.nameLookup(e, t, "context")
        );
      });
    },
    lookupData: function () {
      this.push("data");
    },
    pushStringParam: function (e, t) {
      this.pushStackLiteral("depth" + this.lastContext),
        this.pushString(t),
        "string" == typeof e ? this.pushString(e) : this.pushStackLiteral(e);
    },
    emptyHash: function () {
      this.pushStackLiteral("{}"),
        this.options.stringParams &&
          (this.register("hashTypes", "{}"),
          this.register("hashContexts", "{}"));
    },
    pushHash: function () {
      this.hash = { values: [], types: [], contexts: [] };
    },
    popHash: function () {
      var e = this.hash;
      (this.hash = s),
        this.options.stringParams &&
          (this.register("hashContexts", "{" + e.contexts.join(",") + "}"),
          this.register("hashTypes", "{" + e.types.join(",") + "}")),
        this.push("{\n    " + e.values.join(",\n    ") + "\n  }");
    },
    pushString: function (e) {
      this.pushStackLiteral(this.quotedString(e));
    },
    push: function (e) {
      return this.inlineStack.push(e), e;
    },
    pushLiteral: function (e) {
      this.pushStackLiteral(e);
    },
    pushProgram: function (e) {
      null != e
        ? this.pushStackLiteral(this.programExpression(e))
        : this.pushStackLiteral(null);
    },
    invokeHelper: function (e, t) {
      this.context.aliases.helperMissing = "helpers.helperMissing";
      var n = (this.lastHelper = this.setupHelper(e, t, !0)),
        i = this.nameLookup("depth" + this.lastContext, t, "context");
      this.push(n.name + " || " + i),
        this.replaceStack(function (e) {
          return (
            e +
            " ? " +
            e +
            ".call(" +
            n.callParams +
            ") : helperMissing.call(" +
            n.helperMissingParams +
            ")"
          );
        });
    },
    invokeKnownHelper: function (e, t) {
      var n = this.setupHelper(e, t);
      this.push(n.name + ".call(" + n.callParams + ")");
    },
    invokeAmbiguous: function (e, t) {
      (this.context.aliases.functionType = '"function"'),
        this.pushStackLiteral("{}");
      var n = this.setupHelper(0, e, t),
        i = (this.lastHelper = this.nameLookup("helpers", e, "helper")),
        r = this.nameLookup("depth" + this.lastContext, e, "context"),
        o = this.nextStack();
      this.source.push(
        "if (" +
          o +
          " = " +
          i +
          ") { " +
          o +
          " = " +
          o +
          ".call(" +
          n.callParams +
          "); }"
      ),
        this.source.push(
          "else { " +
            o +
            " = " +
            r +
            "; " +
            o +
            " = typeof " +
            o +
            " === functionType ? " +
            o +
            ".apply(depth0) : " +
            o +
            "; }"
        );
    },
    invokePartial: function (e) {
      var t = [
        this.nameLookup("partials", e, "partial"),
        "'" + e + "'",
        this.popStack(),
        "helpers",
        "partials",
      ];
      this.options.data && t.push("data"),
        (this.context.aliases.self = "this"),
        this.push("self.invokePartial(" + t.join(", ") + ")");
    },
    assignToHash: function (e) {
      var t,
        n,
        i = this.popStack();
      this.options.stringParams &&
        ((n = this.popStack()), (t = this.popStack()));
      var r = this.hash;
      t && r.contexts.push("'" + e + "': " + t),
        n && r.types.push("'" + e + "': " + n),
        r.values.push("'" + e + "': (" + i + ")");
    },
    compiler: d,
    compileChildren: function (e, t) {
      for (var n, i, r = e.children, o = 0, a = r.length; o < a; o++) {
        (n = r[o]), (i = new this.compiler());
        var s = this.matchExistingProgram(n);
        null == s
          ? (this.context.programs.push(""),
            (s = this.context.programs.length),
            (n.index = s),
            (n.name = "program" + s),
            (this.context.programs[s] = i.compile(n, t, this.context)),
            (this.context.environments[s] = n))
          : ((n.index = s), (n.name = "program" + s));
      }
    },
    matchExistingProgram: function (e) {
      for (var t = 0, n = this.context.environments.length; t < n; t++) {
        var i = this.context.environments[t];
        if (i && i.equals(e)) return t;
      }
    },
    programExpression: function (e) {
      if (((this.context.aliases.self = "this"), null == e)) return "self.noop";
      for (
        var t,
          n = this.environment.children[e],
          i = n.depths.list,
          r = [n.index, n.name, "data"],
          o = 0,
          a = i.length;
        o < a;
        o++
      )
        1 === (t = i[o]) ? r.push("depth0") : r.push("depth" + (t - 1));
      return (
        (0 === i.length ? "self.program(" : "self.programWithDepth(") +
        r.join(", ") +
        ")"
      );
    },
    register: function (e, t) {
      this.useRegister(e), this.source.push(e + " = " + t + ";");
    },
    useRegister: function (e) {
      this.registers[e] ||
        ((this.registers[e] = !0), this.registers.list.push(e));
    },
    pushStackLiteral: function (e) {
      return this.push(new p(e));
    },
    pushStack: function (e) {
      this.flushInline();
      var t = this.incrStack();
      return (
        e && this.source.push(t + " = " + e + ";"), this.compileStack.push(t), t
      );
    },
    replaceStack: function (e) {
      var t,
        n = "",
        i = this.isInline();
      if (i) {
        var r = this.popStack(!0);
        if (r instanceof p) t = r.value;
        else {
          var o = this.stackSlot ? this.topStackName() : this.incrStack();
          (n = "(" + this.push(o) + " = " + r + "),"), (t = this.topStack());
        }
      } else t = this.topStack();
      var a = e.call(this, t);
      return (
        i
          ? ((this.inlineStack.length || this.compileStack.length) &&
              this.popStack(),
            this.push("(" + n + a + ")"))
          : (/^stack/.test(t) || (t = this.nextStack()),
            this.source.push(t + " = (" + n + a + ");")),
        t
      );
    },
    nextStack: function () {
      return this.pushStack();
    },
    incrStack: function () {
      return (
        this.stackSlot++,
        this.stackSlot > this.stackVars.length &&
          this.stackVars.push("stack" + this.stackSlot),
        this.topStackName()
      );
    },
    topStackName: function () {
      return "stack" + this.stackSlot;
    },
    flushInline: function () {
      var e = this.inlineStack;
      if (e.length) {
        this.inlineStack = [];
        for (var t = 0, n = e.length; t < n; t++) {
          var i = e[t];
          i instanceof p ? this.compileStack.push(i) : this.pushStack(i);
        }
      }
    },
    isInline: function () {
      return this.inlineStack.length;
    },
    popStack: function (e) {
      var t = this.isInline(),
        n = (t ? this.inlineStack : this.compileStack).pop();
      return !e && n instanceof p ? n.value : (t || this.stackSlot--, n);
    },
    topStack: function (e) {
      var t = this.isInline() ? this.inlineStack : this.compileStack,
        n = t[t.length - 1];
      return !e && n instanceof p ? n.value : n;
    },
    quotedString: function (e) {
      return (
        '"' +
        e
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\u2028/g, "\\u2028")
          .replace(/\u2029/g, "\\u2029") +
        '"'
      );
    },
    setupHelper: function (e, t, n) {
      var i = [];
      return (
        this.setupParams(e, i, n),
        {
          params: i,
          name: this.nameLookup("helpers", t, "helper"),
          callParams: ["depth0"].concat(i).join(", "),
          helperMissingParams:
            n && ["depth0", this.quotedString(t)].concat(i).join(", "),
        }
      );
    },
    setupParams: function (e, t, n) {
      var i,
        r,
        o,
        a = [],
        s = [],
        l = [];
      a.push("hash:" + this.popStack()),
        (r = this.popStack()),
        ((o = this.popStack()) || r) &&
          (o || ((this.context.aliases.self = "this"), (o = "self.noop")),
          r || ((this.context.aliases.self = "this"), (r = "self.noop")),
          a.push("inverse:" + r),
          a.push("fn:" + o));
      for (var c = 0; c < e; c++)
        (i = this.popStack()),
          t.push(i),
          this.options.stringParams &&
            (l.push(this.popStack()), s.push(this.popStack()));
      return (
        this.options.stringParams &&
          (a.push("contexts:[" + s.join(",") + "]"),
          a.push("types:[" + l.join(",") + "]"),
          a.push("hashContexts:hashContexts"),
          a.push("hashTypes:hashTypes")),
        this.options.data && a.push("data:data"),
        (a = "{" + a.join(",") + "}"),
        n ? (this.register("options", a), t.push("options")) : t.push(a),
        t.join(", ")
      );
    },
  };
  for (
    var f =
        "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(
          " "
        ),
      m = (d.RESERVED_WORDS = {}),
      g = 0,
      v = f.length;
    g < v;
    g++
  )
    m[f[g]] = !0;
  (d.isValidJavaScriptVariableName = function (e) {
    return !(d.RESERVED_WORDS[e] || !/^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(e));
  }),
    (c.precompile = function (e, t) {
      if (
        null == e ||
        ("string" != typeof e && e.constructor !== c.AST.ProgramNode)
      )
        throw new c.Exception(
          "You must pass a string or Handlebars AST to Handlebars.precompile. You passed " +
            e
        );
      "data" in (t = t || {}) || (t.data = !0);
      var n = c.parse(e),
        i = new l().compile(n, t);
      return new d().compile(i, t);
    }),
    (c.compile = function (i, r) {
      function n() {
        var e = c.parse(i),
          t = new l().compile(e, r),
          n = new d().compile(t, r, s, !0);
        return c.template(n);
      }
      if (
        null == i ||
        ("string" != typeof i && i.constructor !== c.AST.ProgramNode)
      )
        throw new c.Exception(
          "You must pass a string or Handlebars AST to Handlebars.compile. You passed " +
            i
        );
      var o;
      return (
        "data" in (r = r || {}) || (r.data = !0),
        function (e, t) {
          return o || (o = n()), o.call(this, e, t);
        }
      );
    }),
    (c.VM = {
      template: function (a) {
        var s = {
          escapeExpression: c.Utils.escapeExpression,
          invokePartial: c.VM.invokePartial,
          programs: [],
          program: function (e, t, n) {
            var i = this.programs[e];
            return (
              n
                ? (i = c.VM.program(e, t, n))
                : i || (i = this.programs[e] = c.VM.program(e, t)),
              i
            );
          },
          merge: function (e, t) {
            var n = e || t;
            return (
              e && t && ((n = {}), c.Utils.extend(n, t), c.Utils.extend(n, e)),
              n
            );
          },
          programWithDepth: c.VM.programWithDepth,
          noop: c.VM.noop,
          compilerInfo: null,
        };
        return function (e, t) {
          t = t || {};
          var n = a.call(s, c, e, t.helpers, t.partials, t.data),
            i = s.compilerInfo || [],
            r = i[0] || 1,
            o = c.COMPILER_REVISION;
          if (r === o) return n;
          if (r < o)
            throw (
              "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
              c.REVISION_CHANGES[o] +
              ") or downgrade your runtime to an older version (" +
              c.REVISION_CHANGES[r] +
              ")."
            );
          throw (
            "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" +
            i[1] +
            ")."
          );
        };
      },
      programWithDepth: function (e, n, i) {
        var r = Array.prototype.slice.call(arguments, 3),
          t = function (e, t) {
            return (t = t || {}), n.apply(this, [e, t.data || i].concat(r));
          };
        return (t.program = e), (t.depth = r.length), t;
      },
      program: function (e, n, i) {
        var t = function (e, t) {
          return n(e, (t = t || {}).data || i);
        };
        return (t.program = e), (t.depth = 0), t;
      },
      noop: function () {
        return "";
      },
      invokePartial: function (e, t, n, i, r, o) {
        var a = { helpers: i, partials: r, data: o };
        if (e === s)
          throw new c.Exception("The partial " + t + " could not be found");
        if (e instanceof Function) return e(n, a);
        if (c.compile)
          return (r[t] = c.compile(e, { data: o !== s })), r[t](n, a);
        throw new c.Exception(
          "The partial " +
            t +
            " could not be compiled when running in runtime-only mode"
        );
      },
    }),
    (c.template = c.VM.template);
})(Handlebars),
  (function (e, t) {
    "object" == typeof exports
      ? (module.exports = t(require("handlebars")))
      : "function" == typeof define && define.amd
      ? define(["handlebars"], t)
      : (e.HandlebarsHelpersRegistry = t(e.Handlebars));
  })(this, function (n) {
    var i = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      },
      e = function () {
        this.expressions = [];
      };
    (e.prototype.add = function (e, t) {
      this.expressions[e] = t;
    }),
      (e.prototype.call = function (e, t, n) {
        if (!this.expressions.hasOwnProperty(e))
          throw new Error('Unknown operator "' + e + '"');
        return this.expressions[e](t, n);
      });
    var o = new e();
    o.add("not", function (e, t) {
      return e != t;
    }),
      o.add(">", function (e, t) {
        return t < e;
      }),
      o.add("<", function (e, t) {
        return e < t;
      }),
      o.add(">=", function (e, t) {
        return t <= e;
      }),
      o.add("<=", function (e, t) {
        return e <= t;
      }),
      o.add("===", function (e, t) {
        return e === t;
      }),
      o.add("!==", function (e, t) {
        return e !== t;
      }),
      o.add("in", function (e, t) {
        return i(t) || (t = t.split(",")), -1 !== t.indexOf(e);
      });
    var t = function () {
      var e = arguments,
        t = e[0],
        n = e[1],
        i = e[2],
        r = e[3];
      return 2 == e.length
        ? ((r = e[1]), t ? r.fn(this) : r.inverse(this))
        : 3 == e.length
        ? ((i = e[1]), (r = e[2]), t == i ? r.fn(this) : r.inverse(this))
        : o.call(n, t, i)
        ? r.fn(this)
        : r.inverse(this);
    };
    return (
      n.registerHelper("is", t),
      n.registerHelper("nl2br", function (e) {
        var t = (e + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br>$2");
        return new n.SafeString(t);
      }),
      n.registerHelper("log", function () {
        console.log(
          ["Values:"].concat(Array.prototype.slice.call(arguments, 0, -1))
        );
      }),
      n.registerHelper("debug", function () {
        console.log("Context:", this),
          console.log(
            ["Values:"].concat(Array.prototype.slice.call(arguments, 0, -1))
          );
      }),
      o
    );
  }),
  (function (r) {
    "undefined" == typeof r.fn.each2 &&
      r.extend(r.fn, {
        each2: function (e) {
          for (
            var t = r([0]), n = -1, i = this.length;
            ++n < i &&
            (t.context = t[0] = this[n]) &&
            !1 !== e.call(t[0], n, t);

          );
          return this;
        },
      });
  })(jQuery),
  (function (E, w) {
    "use strict";
    function a(e) {
      var t = E(document.createTextNode(""));
      e.before(t), t.before(e), t.remove();
    }
    function s(e) {
      function t(e) {
        return B[e] || e;
      }
      return e.replace(/[^\u0000-\u007E]/g, t);
    }
    function u(e, t) {
      for (var n = 0, i = t.length; n < i; n += 1) if (p(e, t[n])) return n;
      return -1;
    }
    function l() {
      var e = E(H);
      e.appendTo(document.body);
      var t = {
        width: e.width() - e[0].clientWidth,
        height: e.height() - e[0].clientHeight,
      };
      return e.remove(), t;
    }
    function p(e, t) {
      return (
        e === t ||
        (e !== w &&
          t !== w &&
          null !== e &&
          null !== t &&
          (e.constructor === String
            ? e + "" == t + ""
            : t.constructor === String && t + "" == e + ""))
      );
    }
    function c(e, t, n) {
      var i, r, o;
      if (null === e || e.length < 1) return [];
      for (r = 0, o = (i = e.split(t)).length; r < o; r += 1) i[r] = n(i[r]);
      return i;
    }
    function o(e) {
      return e.outerWidth(!1) - e.width();
    }
    function h(t) {
      var n = "keyup-change-value";
      t.on("keydown", function () {
        E.data(t, n) === w && E.data(t, n, t.val());
      }),
        t.on("keyup", function () {
          var e = E.data(t, n);
          e !== w &&
            t.val() !== e &&
            (E.removeData(t, n), t.trigger("keyup-change"));
        });
    }
    function d(e) {
      e.on("mousemove", function (e) {
        var t = $;
        (t !== w && t.x === e.pageX && t.y === e.pageY) ||
          E(e.target).trigger("mousemove-filtered", e);
      });
    }
    function i(t, n, i) {
      var r;
      return (
        (i = i || w),
        function () {
          var e = arguments;
          window.clearTimeout(r),
            (r = window.setTimeout(function () {
              n.apply(i, e);
            }, t));
        }
      );
    }
    function f(e, t) {
      var n = i(e, function (e) {
        t.trigger("scroll-debounced", e);
      });
      t.on("scroll", function (e) {
        0 <= u(e.target, t.get()) && n(e);
      });
    }
    function e(i) {
      i[0] !== document.activeElement &&
        window.setTimeout(function () {
          var e,
            t = i[0],
            n = i.val().length;
          i.focus(),
            (0 < t.offsetWidth || 0 < t.offsetHeight) &&
              t === document.activeElement &&
              (t.setSelectionRange
                ? t.setSelectionRange(n, n)
                : t.createTextRange &&
                  ((e = t.createTextRange()).collapse(!1), e.select()));
        }, 0);
    }
    function m(e) {
      var t = 0,
        n = 0;
      if ("selectionStart" in (e = E(e)[0]))
        (t = e.selectionStart), (n = e.selectionEnd - t);
      else if ("selection" in document) {
        e.focus();
        var i = document.selection.createRange();
        (n = document.selection.createRange().text.length),
          i.moveStart("character", -e.value.length),
          (t = i.text.length - n);
      }
      return { offset: t, length: n };
    }
    function g(e) {
      e.preventDefault(), e.stopPropagation();
    }
    function v(e) {
      e.preventDefault(), e.stopImmediatePropagation();
    }
    function y(e) {
      if (!F) {
        var t = e[0].currentStyle || window.getComputedStyle(e[0], null);
        (F = E(document.createElement("div")).css({
          position: "absolute",
          left: "-10000px",
          top: "-10000px",
          display: "none",
          fontSize: t.fontSize,
          fontFamily: t.fontFamily,
          fontStyle: t.fontStyle,
          fontWeight: t.fontWeight,
          letterSpacing: t.letterSpacing,
          textTransform: t.textTransform,
          whiteSpace: "nowrap",
        })).attr("class", "select2-sizer"),
          E(document.body).append(F);
      }
      return F.text(e.val()), F.width();
    }
    function b(e, t, n) {
      var i,
        r,
        o = [];
      (i = E.trim(e.attr("class"))) &&
        E((i = "" + i).split(/\s+/)).each2(function () {
          0 === this.indexOf("select2-") && o.push(this);
        }),
        (i = E.trim(t.attr("class"))) &&
          E((i = "" + i).split(/\s+/)).each2(function () {
            0 !== this.indexOf("select2-") && (r = n(this)) && o.push(r);
          }),
        e.attr("class", o.join(" "));
    }
    function x(e, t, n, i) {
      var r = s(e.toUpperCase()).indexOf(s(t.toUpperCase())),
        o = t.length;
      r < 0
        ? n.push(i(e))
        : (n.push(i(e.substring(0, r))),
          n.push("<span class='select2-match'>"),
          n.push(i(e.substring(r, r + o))),
          n.push("</span>"),
          n.push(i(e.substring(r + o, e.length))));
    }
    function t(e) {
      var t = {
        "\\": "&#92;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#47;",
      };
      return String(e).replace(/[&<>"'\/\\]/g, function (e) {
        return t[e];
      });
    }
    function _(a) {
      var e,
        s = null,
        t = a.quietMillis || 100,
        l = a.url,
        c = this;
      return function (o) {
        window.clearTimeout(e),
          (e = window.setTimeout(function () {
            var e = a.data,
              t = l,
              n = a.transport || E.fn.select2.ajaxDefaults.transport,
              i = {
                type: a.type || "GET",
                cache: a.cache || !1,
                jsonpCallback: a.jsonpCallback || w,
                dataType: a.dataType || "json",
              },
              r = E.extend({}, E.fn.select2.ajaxDefaults.params, i);
            (e = e ? e.call(c, o.term, o.page, o.context) : null),
              (t =
                "function" == typeof t
                  ? t.call(c, o.term, o.page, o.context)
                  : t),
              s && "function" == typeof s.abort && s.abort(),
              a.params &&
                (E.isFunction(a.params)
                  ? E.extend(r, a.params.call(c))
                  : E.extend(r, a.params)),
              E.extend(r, {
                url: t,
                dataType: a.dataType,
                data: e,
                success: function (e) {
                  var t = a.results(e, o.page, o);
                  o.callback(t);
                },
                error: function (e, t, n) {
                  var i = {
                    hasError: !0,
                    jqXHR: e,
                    textStatus: t,
                    errorThrown: n,
                  };
                  o.callback(i);
                },
              }),
              (s = n.call(c, r));
          }, t));
      };
    }
    function S(e) {
      var t,
        n,
        i = e,
        s = function (e) {
          return "" + e.text;
        };
      E.isArray(i) && (i = { results: (n = i) }),
        !1 === E.isFunction(i) &&
          ((n = i),
          (i = function () {
            return n;
          }));
      var r = i();
      return (
        r.text &&
          ((s = r.text),
          E.isFunction(s) ||
            ((t = r.text),
            (s = function (e) {
              return e[t];
            }))),
        function (r) {
          var o,
            a = r.term,
            n = { results: [] };
          "" !== a
            ? ((o = function (e, t) {
                var n, i;
                if ((e = e[0]).children) {
                  for (i in ((n = {}), e)) e.hasOwnProperty(i) && (n[i] = e[i]);
                  (n.children = []),
                    E(e.children).each2(function (e, t) {
                      o(t, n.children);
                    }),
                    (n.children.length || r.matcher(a, s(n), e)) && t.push(n);
                } else r.matcher(a, s(e), e) && t.push(e);
              }),
              E(i().results).each2(function (e, t) {
                o(t, n.results);
              }),
              r.callback(n))
            : r.callback(i());
        }
      );
    }
    function C(t) {
      var o = E.isFunction(t);
      return function (n) {
        var i = n.term,
          r = { results: [] },
          e = o ? t(n) : t;
        E.isArray(e) &&
          (E(e).each(function () {
            var e = this.text !== w,
              t = e ? this.text : this;
            ("" === i || n.matcher(i, t)) &&
              r.results.push(e ? this : { id: this, text: this });
          }),
          n.callback(r));
      };
    }
    function k(e, t) {
      if (E.isFunction(e)) return !0;
      if (!e) return !1;
      if ("string" == typeof e) return !0;
      throw new Error(t + " must be a string, function, or falsy value");
    }
    function T(e, t) {
      if (E.isFunction(e)) {
        var n = Array.prototype.slice.call(arguments, 2);
        return e.apply(t, n);
      }
      return e;
    }
    function A(e) {
      var n = 0;
      return (
        E.each(e, function (e, t) {
          t.children ? (n += A(t.children)) : n++;
        }),
        n
      );
    }
    function n(e, t, n, i) {
      var r,
        o,
        a,
        s,
        l,
        c = e,
        u = !1;
      if (
        !i.createSearchChoice ||
        !i.tokenSeparators ||
        i.tokenSeparators.length < 1
      )
        return w;
      for (;;) {
        for (
          o = -1, a = 0, s = i.tokenSeparators.length;
          a < s && ((l = i.tokenSeparators[a]), !(0 <= (o = e.indexOf(l))));
          a++
        );
        if (o < 0) break;
        if (
          ((r = e.substring(0, o)),
          (e = e.substring(o + l.length)),
          0 < r.length &&
            (r = i.createSearchChoice.call(this, r, t)) !== w &&
            null !== r &&
            i.id(r) !== w &&
            null !== i.id(r))
        ) {
          for (u = !1, a = 0, s = t.length; a < s; a++)
            if (p(i.id(r), i.id(t[a]))) {
              u = !0;
              break;
            }
          u || n(r);
        }
      }
      return c !== e ? e : void 0;
    }
    function r() {
      var n = this;
      E.each(arguments, function (e, t) {
        n[t].remove(), (n[t] = null);
      });
    }
    function N(e, t) {
      var n = function () {};
      return (
        (n.prototype = new e()),
        ((n.prototype.constructor = n).prototype.parent = e.prototype),
        (n.prototype = E.extend(n.prototype, t)),
        n
      );
    }
    if (window.Select2 === w) {
      var j,
        D,
        P,
        L,
        F,
        O,
        R,
        I,
        $ = { x: 0, y: 0 },
        M = {
          TAB: 9,
          ENTER: 13,
          ESC: 27,
          SPACE: 32,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          SHIFT: 16,
          CTRL: 17,
          ALT: 18,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          HOME: 36,
          END: 35,
          BACKSPACE: 8,
          DELETE: 46,
          isArrow: function (e) {
            switch ((e = e.which ? e.which : e)) {
              case M.LEFT:
              case M.RIGHT:
              case M.UP:
              case M.DOWN:
                return !0;
            }
            return !1;
          },
          isControl: function (e) {
            switch (e.which) {
              case M.SHIFT:
              case M.CTRL:
              case M.ALT:
                return !0;
            }
            return !!e.metaKey;
          },
          isFunctionKey: function (e) {
            return 112 <= (e = e.which ? e.which : e) && e <= 123;
          },
        },
        H = "<div class='select2-measure-scrollbar'></div>",
        B = {
          "\u24b6": "A",
          "\uff21": "A",
          "\xc0": "A",
          "\xc1": "A",
          "\xc2": "A",
          "\u1ea6": "A",
          "\u1ea4": "A",
          "\u1eaa": "A",
          "\u1ea8": "A",
          "\xc3": "A",
          "\u0100": "A",
          "\u0102": "A",
          "\u1eb0": "A",
          "\u1eae": "A",
          "\u1eb4": "A",
          "\u1eb2": "A",
          "\u0226": "A",
          "\u01e0": "A",
          "\xc4": "A",
          "\u01de": "A",
          "\u1ea2": "A",
          "\xc5": "A",
          "\u01fa": "A",
          "\u01cd": "A",
          "\u0200": "A",
          "\u0202": "A",
          "\u1ea0": "A",
          "\u1eac": "A",
          "\u1eb6": "A",
          "\u1e00": "A",
          "\u0104": "A",
          "\u023a": "A",
          "\u2c6f": "A",
          "\ua732": "AA",
          "\xc6": "AE",
          "\u01fc": "AE",
          "\u01e2": "AE",
          "\ua734": "AO",
          "\ua736": "AU",
          "\ua738": "AV",
          "\ua73a": "AV",
          "\ua73c": "AY",
          "\u24b7": "B",
          "\uff22": "B",
          "\u1e02": "B",
          "\u1e04": "B",
          "\u1e06": "B",
          "\u0243": "B",
          "\u0182": "B",
          "\u0181": "B",
          "\u24b8": "C",
          "\uff23": "C",
          "\u0106": "C",
          "\u0108": "C",
          "\u010a": "C",
          "\u010c": "C",
          "\xc7": "C",
          "\u1e08": "C",
          "\u0187": "C",
          "\u023b": "C",
          "\ua73e": "C",
          "\u24b9": "D",
          "\uff24": "D",
          "\u1e0a": "D",
          "\u010e": "D",
          "\u1e0c": "D",
          "\u1e10": "D",
          "\u1e12": "D",
          "\u1e0e": "D",
          "\u0110": "D",
          "\u018b": "D",
          "\u018a": "D",
          "\u0189": "D",
          "\ua779": "D",
          "\u01f1": "DZ",
          "\u01c4": "DZ",
          "\u01f2": "Dz",
          "\u01c5": "Dz",
          "\u24ba": "E",
          "\uff25": "E",
          "\xc8": "E",
          "\xc9": "E",
          "\xca": "E",
          "\u1ec0": "E",
          "\u1ebe": "E",
          "\u1ec4": "E",
          "\u1ec2": "E",
          "\u1ebc": "E",
          "\u0112": "E",
          "\u1e14": "E",
          "\u1e16": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\xcb": "E",
          "\u1eba": "E",
          "\u011a": "E",
          "\u0204": "E",
          "\u0206": "E",
          "\u1eb8": "E",
          "\u1ec6": "E",
          "\u0228": "E",
          "\u1e1c": "E",
          "\u0118": "E",
          "\u1e18": "E",
          "\u1e1a": "E",
          "\u0190": "E",
          "\u018e": "E",
          "\u24bb": "F",
          "\uff26": "F",
          "\u1e1e": "F",
          "\u0191": "F",
          "\ua77b": "F",
          "\u24bc": "G",
          "\uff27": "G",
          "\u01f4": "G",
          "\u011c": "G",
          "\u1e20": "G",
          "\u011e": "G",
          "\u0120": "G",
          "\u01e6": "G",
          "\u0122": "G",
          "\u01e4": "G",
          "\u0193": "G",
          "\ua7a0": "G",
          "\ua77d": "G",
          "\ua77e": "G",
          "\u24bd": "H",
          "\uff28": "H",
          "\u0124": "H",
          "\u1e22": "H",
          "\u1e26": "H",
          "\u021e": "H",
          "\u1e24": "H",
          "\u1e28": "H",
          "\u1e2a": "H",
          "\u0126": "H",
          "\u2c67": "H",
          "\u2c75": "H",
          "\ua78d": "H",
          "\u24be": "I",
          "\uff29": "I",
          "\xcc": "I",
          "\xcd": "I",
          "\xce": "I",
          "\u0128": "I",
          "\u012a": "I",
          "\u012c": "I",
          "\u0130": "I",
          "\xcf": "I",
          "\u1e2e": "I",
          "\u1ec8": "I",
          "\u01cf": "I",
          "\u0208": "I",
          "\u020a": "I",
          "\u1eca": "I",
          "\u012e": "I",
          "\u1e2c": "I",
          "\u0197": "I",
          "\u24bf": "J",
          "\uff2a": "J",
          "\u0134": "J",
          "\u0248": "J",
          "\u24c0": "K",
          "\uff2b": "K",
          "\u1e30": "K",
          "\u01e8": "K",
          "\u1e32": "K",
          "\u0136": "K",
          "\u1e34": "K",
          "\u0198": "K",
          "\u2c69": "K",
          "\ua740": "K",
          "\ua742": "K",
          "\ua744": "K",
          "\ua7a2": "K",
          "\u24c1": "L",
          "\uff2c": "L",
          "\u013f": "L",
          "\u0139": "L",
          "\u013d": "L",
          "\u1e36": "L",
          "\u1e38": "L",
          "\u013b": "L",
          "\u1e3c": "L",
          "\u1e3a": "L",
          "\u0141": "L",
          "\u023d": "L",
          "\u2c62": "L",
          "\u2c60": "L",
          "\ua748": "L",
          "\ua746": "L",
          "\ua780": "L",
          "\u01c7": "LJ",
          "\u01c8": "Lj",
          "\u24c2": "M",
          "\uff2d": "M",
          "\u1e3e": "M",
          "\u1e40": "M",
          "\u1e42": "M",
          "\u2c6e": "M",
          "\u019c": "M",
          "\u24c3": "N",
          "\uff2e": "N",
          "\u01f8": "N",
          "\u0143": "N",
          "\xd1": "N",
          "\u1e44": "N",
          "\u0147": "N",
          "\u1e46": "N",
          "\u0145": "N",
          "\u1e4a": "N",
          "\u1e48": "N",
          "\u0220": "N",
          "\u019d": "N",
          "\ua790": "N",
          "\ua7a4": "N",
          "\u01ca": "NJ",
          "\u01cb": "Nj",
          "\u24c4": "O",
          "\uff2f": "O",
          "\xd2": "O",
          "\xd3": "O",
          "\xd4": "O",
          "\u1ed2": "O",
          "\u1ed0": "O",
          "\u1ed6": "O",
          "\u1ed4": "O",
          "\xd5": "O",
          "\u1e4c": "O",
          "\u022c": "O",
          "\u1e4e": "O",
          "\u014c": "O",
          "\u1e50": "O",
          "\u1e52": "O",
          "\u014e": "O",
          "\u022e": "O",
          "\u0230": "O",
          "\xd6": "O",
          "\u022a": "O",
          "\u1ece": "O",
          "\u0150": "O",
          "\u01d1": "O",
          "\u020c": "O",
          "\u020e": "O",
          "\u01a0": "O",
          "\u1edc": "O",
          "\u1eda": "O",
          "\u1ee0": "O",
          "\u1ede": "O",
          "\u1ee2": "O",
          "\u1ecc": "O",
          "\u1ed8": "O",
          "\u01ea": "O",
          "\u01ec": "O",
          "\xd8": "O",
          "\u01fe": "O",
          "\u0186": "O",
          "\u019f": "O",
          "\ua74a": "O",
          "\ua74c": "O",
          "\u01a2": "OI",
          "\ua74e": "OO",
          "\u0222": "OU",
          "\u24c5": "P",
          "\uff30": "P",
          "\u1e54": "P",
          "\u1e56": "P",
          "\u01a4": "P",
          "\u2c63": "P",
          "\ua750": "P",
          "\ua752": "P",
          "\ua754": "P",
          "\u24c6": "Q",
          "\uff31": "Q",
          "\ua756": "Q",
          "\ua758": "Q",
          "\u024a": "Q",
          "\u24c7": "R",
          "\uff32": "R",
          "\u0154": "R",
          "\u1e58": "R",
          "\u0158": "R",
          "\u0210": "R",
          "\u0212": "R",
          "\u1e5a": "R",
          "\u1e5c": "R",
          "\u0156": "R",
          "\u1e5e": "R",
          "\u024c": "R",
          "\u2c64": "R",
          "\ua75a": "R",
          "\ua7a6": "R",
          "\ua782": "R",
          "\u24c8": "S",
          "\uff33": "S",
          "\u1e9e": "S",
          "\u015a": "S",
          "\u1e64": "S",
          "\u015c": "S",
          "\u1e60": "S",
          "\u0160": "S",
          "\u1e66": "S",
          "\u1e62": "S",
          "\u1e68": "S",
          "\u0218": "S",
          "\u015e": "S",
          "\u2c7e": "S",
          "\ua7a8": "S",
          "\ua784": "S",
          "\u24c9": "T",
          "\uff34": "T",
          "\u1e6a": "T",
          "\u0164": "T",
          "\u1e6c": "T",
          "\u021a": "T",
          "\u0162": "T",
          "\u1e70": "T",
          "\u1e6e": "T",
          "\u0166": "T",
          "\u01ac": "T",
          "\u01ae": "T",
          "\u023e": "T",
          "\ua786": "T",
          "\ua728": "TZ",
          "\u24ca": "U",
          "\uff35": "U",
          "\xd9": "U",
          "\xda": "U",
          "\xdb": "U",
          "\u0168": "U",
          "\u1e78": "U",
          "\u016a": "U",
          "\u1e7a": "U",
          "\u016c": "U",
          "\xdc": "U",
          "\u01db": "U",
          "\u01d7": "U",
          "\u01d5": "U",
          "\u01d9": "U",
          "\u1ee6": "U",
          "\u016e": "U",
          "\u0170": "U",
          "\u01d3": "U",
          "\u0214": "U",
          "\u0216": "U",
          "\u01af": "U",
          "\u1eea": "U",
          "\u1ee8": "U",
          "\u1eee": "U",
          "\u1eec": "U",
          "\u1ef0": "U",
          "\u1ee4": "U",
          "\u1e72": "U",
          "\u0172": "U",
          "\u1e76": "U",
          "\u1e74": "U",
          "\u0244": "U",
          "\u24cb": "V",
          "\uff36": "V",
          "\u1e7c": "V",
          "\u1e7e": "V",
          "\u01b2": "V",
          "\ua75e": "V",
          "\u0245": "V",
          "\ua760": "VY",
          "\u24cc": "W",
          "\uff37": "W",
          "\u1e80": "W",
          "\u1e82": "W",
          "\u0174": "W",
          "\u1e86": "W",
          "\u1e84": "W",
          "\u1e88": "W",
          "\u2c72": "W",
          "\u24cd": "X",
          "\uff38": "X",
          "\u1e8a": "X",
          "\u1e8c": "X",
          "\u24ce": "Y",
          "\uff39": "Y",
          "\u1ef2": "Y",
          "\xdd": "Y",
          "\u0176": "Y",
          "\u1ef8": "Y",
          "\u0232": "Y",
          "\u1e8e": "Y",
          "\u0178": "Y",
          "\u1ef6": "Y",
          "\u1ef4": "Y",
          "\u01b3": "Y",
          "\u024e": "Y",
          "\u1efe": "Y",
          "\u24cf": "Z",
          "\uff3a": "Z",
          "\u0179": "Z",
          "\u1e90": "Z",
          "\u017b": "Z",
          "\u017d": "Z",
          "\u1e92": "Z",
          "\u1e94": "Z",
          "\u01b5": "Z",
          "\u0224": "Z",
          "\u2c7f": "Z",
          "\u2c6b": "Z",
          "\ua762": "Z",
          "\u24d0": "a",
          "\uff41": "a",
          "\u1e9a": "a",
          "\xe0": "a",
          "\xe1": "a",
          "\xe2": "a",
          "\u1ea7": "a",
          "\u1ea5": "a",
          "\u1eab": "a",
          "\u1ea9": "a",
          "\xe3": "a",
          "\u0101": "a",
          "\u0103": "a",
          "\u1eb1": "a",
          "\u1eaf": "a",
          "\u1eb5": "a",
          "\u1eb3": "a",
          "\u0227": "a",
          "\u01e1": "a",
          "\xe4": "a",
          "\u01df": "a",
          "\u1ea3": "a",
          "\xe5": "a",
          "\u01fb": "a",
          "\u01ce": "a",
          "\u0201": "a",
          "\u0203": "a",
          "\u1ea1": "a",
          "\u1ead": "a",
          "\u1eb7": "a",
          "\u1e01": "a",
          "\u0105": "a",
          "\u2c65": "a",
          "\u0250": "a",
          "\ua733": "aa",
          "\xe6": "ae",
          "\u01fd": "ae",
          "\u01e3": "ae",
          "\ua735": "ao",
          "\ua737": "au",
          "\ua739": "av",
          "\ua73b": "av",
          "\ua73d": "ay",
          "\u24d1": "b",
          "\uff42": "b",
          "\u1e03": "b",
          "\u1e05": "b",
          "\u1e07": "b",
          "\u0180": "b",
          "\u0183": "b",
          "\u0253": "b",
          "\u24d2": "c",
          "\uff43": "c",
          "\u0107": "c",
          "\u0109": "c",
          "\u010b": "c",
          "\u010d": "c",
          "\xe7": "c",
          "\u1e09": "c",
          "\u0188": "c",
          "\u023c": "c",
          "\ua73f": "c",
          "\u2184": "c",
          "\u24d3": "d",
          "\uff44": "d",
          "\u1e0b": "d",
          "\u010f": "d",
          "\u1e0d": "d",
          "\u1e11": "d",
          "\u1e13": "d",
          "\u1e0f": "d",
          "\u0111": "d",
          "\u018c": "d",
          "\u0256": "d",
          "\u0257": "d",
          "\ua77a": "d",
          "\u01f3": "dz",
          "\u01c6": "dz",
          "\u24d4": "e",
          "\uff45": "e",
          "\xe8": "e",
          "\xe9": "e",
          "\xea": "e",
          "\u1ec1": "e",
          "\u1ebf": "e",
          "\u1ec5": "e",
          "\u1ec3": "e",
          "\u1ebd": "e",
          "\u0113": "e",
          "\u1e15": "e",
          "\u1e17": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\xeb": "e",
          "\u1ebb": "e",
          "\u011b": "e",
          "\u0205": "e",
          "\u0207": "e",
          "\u1eb9": "e",
          "\u1ec7": "e",
          "\u0229": "e",
          "\u1e1d": "e",
          "\u0119": "e",
          "\u1e19": "e",
          "\u1e1b": "e",
          "\u0247": "e",
          "\u025b": "e",
          "\u01dd": "e",
          "\u24d5": "f",
          "\uff46": "f",
          "\u1e1f": "f",
          "\u0192": "f",
          "\ua77c": "f",
          "\u24d6": "g",
          "\uff47": "g",
          "\u01f5": "g",
          "\u011d": "g",
          "\u1e21": "g",
          "\u011f": "g",
          "\u0121": "g",
          "\u01e7": "g",
          "\u0123": "g",
          "\u01e5": "g",
          "\u0260": "g",
          "\ua7a1": "g",
          "\u1d79": "g",
          "\ua77f": "g",
          "\u24d7": "h",
          "\uff48": "h",
          "\u0125": "h",
          "\u1e23": "h",
          "\u1e27": "h",
          "\u021f": "h",
          "\u1e25": "h",
          "\u1e29": "h",
          "\u1e2b": "h",
          "\u1e96": "h",
          "\u0127": "h",
          "\u2c68": "h",
          "\u2c76": "h",
          "\u0265": "h",
          "\u0195": "hv",
          "\u24d8": "i",
          "\uff49": "i",
          "\xec": "i",
          "\xed": "i",
          "\xee": "i",
          "\u0129": "i",
          "\u012b": "i",
          "\u012d": "i",
          "\xef": "i",
          "\u1e2f": "i",
          "\u1ec9": "i",
          "\u01d0": "i",
          "\u0209": "i",
          "\u020b": "i",
          "\u1ecb": "i",
          "\u012f": "i",
          "\u1e2d": "i",
          "\u0268": "i",
          "\u0131": "i",
          "\u24d9": "j",
          "\uff4a": "j",
          "\u0135": "j",
          "\u01f0": "j",
          "\u0249": "j",
          "\u24da": "k",
          "\uff4b": "k",
          "\u1e31": "k",
          "\u01e9": "k",
          "\u1e33": "k",
          "\u0137": "k",
          "\u1e35": "k",
          "\u0199": "k",
          "\u2c6a": "k",
          "\ua741": "k",
          "\ua743": "k",
          "\ua745": "k",
          "\ua7a3": "k",
          "\u24db": "l",
          "\uff4c": "l",
          "\u0140": "l",
          "\u013a": "l",
          "\u013e": "l",
          "\u1e37": "l",
          "\u1e39": "l",
          "\u013c": "l",
          "\u1e3d": "l",
          "\u1e3b": "l",
          "\u017f": "l",
          "\u0142": "l",
          "\u019a": "l",
          "\u026b": "l",
          "\u2c61": "l",
          "\ua749": "l",
          "\ua781": "l",
          "\ua747": "l",
          "\u01c9": "lj",
          "\u24dc": "m",
          "\uff4d": "m",
          "\u1e3f": "m",
          "\u1e41": "m",
          "\u1e43": "m",
          "\u0271": "m",
          "\u026f": "m",
          "\u24dd": "n",
          "\uff4e": "n",
          "\u01f9": "n",
          "\u0144": "n",
          "\xf1": "n",
          "\u1e45": "n",
          "\u0148": "n",
          "\u1e47": "n",
          "\u0146": "n",
          "\u1e4b": "n",
          "\u1e49": "n",
          "\u019e": "n",
          "\u0272": "n",
          "\u0149": "n",
          "\ua791": "n",
          "\ua7a5": "n",
          "\u01cc": "nj",
          "\u24de": "o",
          "\uff4f": "o",
          "\xf2": "o",
          "\xf3": "o",
          "\xf4": "o",
          "\u1ed3": "o",
          "\u1ed1": "o",
          "\u1ed7": "o",
          "\u1ed5": "o",
          "\xf5": "o",
          "\u1e4d": "o",
          "\u022d": "o",
          "\u1e4f": "o",
          "\u014d": "o",
          "\u1e51": "o",
          "\u1e53": "o",
          "\u014f": "o",
          "\u022f": "o",
          "\u0231": "o",
          "\xf6": "o",
          "\u022b": "o",
          "\u1ecf": "o",
          "\u0151": "o",
          "\u01d2": "o",
          "\u020d": "o",
          "\u020f": "o",
          "\u01a1": "o",
          "\u1edd": "o",
          "\u1edb": "o",
          "\u1ee1": "o",
          "\u1edf": "o",
          "\u1ee3": "o",
          "\u1ecd": "o",
          "\u1ed9": "o",
          "\u01eb": "o",
          "\u01ed": "o",
          "\xf8": "o",
          "\u01ff": "o",
          "\u0254": "o",
          "\ua74b": "o",
          "\ua74d": "o",
          "\u0275": "o",
          "\u01a3": "oi",
          "\u0223": "ou",
          "\ua74f": "oo",
          "\u24df": "p",
          "\uff50": "p",
          "\u1e55": "p",
          "\u1e57": "p",
          "\u01a5": "p",
          "\u1d7d": "p",
          "\ua751": "p",
          "\ua753": "p",
          "\ua755": "p",
          "\u24e0": "q",
          "\uff51": "q",
          "\u024b": "q",
          "\ua757": "q",
          "\ua759": "q",
          "\u24e1": "r",
          "\uff52": "r",
          "\u0155": "r",
          "\u1e59": "r",
          "\u0159": "r",
          "\u0211": "r",
          "\u0213": "r",
          "\u1e5b": "r",
          "\u1e5d": "r",
          "\u0157": "r",
          "\u1e5f": "r",
          "\u024d": "r",
          "\u027d": "r",
          "\ua75b": "r",
          "\ua7a7": "r",
          "\ua783": "r",
          "\u24e2": "s",
          "\uff53": "s",
          "\xdf": "s",
          "\u015b": "s",
          "\u1e65": "s",
          "\u015d": "s",
          "\u1e61": "s",
          "\u0161": "s",
          "\u1e67": "s",
          "\u1e63": "s",
          "\u1e69": "s",
          "\u0219": "s",
          "\u015f": "s",
          "\u023f": "s",
          "\ua7a9": "s",
          "\ua785": "s",
          "\u1e9b": "s",
          "\u24e3": "t",
          "\uff54": "t",
          "\u1e6b": "t",
          "\u1e97": "t",
          "\u0165": "t",
          "\u1e6d": "t",
          "\u021b": "t",
          "\u0163": "t",
          "\u1e71": "t",
          "\u1e6f": "t",
          "\u0167": "t",
          "\u01ad": "t",
          "\u0288": "t",
          "\u2c66": "t",
          "\ua787": "t",
          "\ua729": "tz",
          "\u24e4": "u",
          "\uff55": "u",
          "\xf9": "u",
          "\xfa": "u",
          "\xfb": "u",
          "\u0169": "u",
          "\u1e79": "u",
          "\u016b": "u",
          "\u1e7b": "u",
          "\u016d": "u",
          "\xfc": "u",
          "\u01dc": "u",
          "\u01d8": "u",
          "\u01d6": "u",
          "\u01da": "u",
          "\u1ee7": "u",
          "\u016f": "u",
          "\u0171": "u",
          "\u01d4": "u",
          "\u0215": "u",
          "\u0217": "u",
          "\u01b0": "u",
          "\u1eeb": "u",
          "\u1ee9": "u",
          "\u1eef": "u",
          "\u1eed": "u",
          "\u1ef1": "u",
          "\u1ee5": "u",
          "\u1e73": "u",
          "\u0173": "u",
          "\u1e77": "u",
          "\u1e75": "u",
          "\u0289": "u",
          "\u24e5": "v",
          "\uff56": "v",
          "\u1e7d": "v",
          "\u1e7f": "v",
          "\u028b": "v",
          "\ua75f": "v",
          "\u028c": "v",
          "\ua761": "vy",
          "\u24e6": "w",
          "\uff57": "w",
          "\u1e81": "w",
          "\u1e83": "w",
          "\u0175": "w",
          "\u1e87": "w",
          "\u1e85": "w",
          "\u1e98": "w",
          "\u1e89": "w",
          "\u2c73": "w",
          "\u24e7": "x",
          "\uff58": "x",
          "\u1e8b": "x",
          "\u1e8d": "x",
          "\u24e8": "y",
          "\uff59": "y",
          "\u1ef3": "y",
          "\xfd": "y",
          "\u0177": "y",
          "\u1ef9": "y",
          "\u0233": "y",
          "\u1e8f": "y",
          "\xff": "y",
          "\u1ef7": "y",
          "\u1e99": "y",
          "\u1ef5": "y",
          "\u01b4": "y",
          "\u024f": "y",
          "\u1eff": "y",
          "\u24e9": "z",
          "\uff5a": "z",
          "\u017a": "z",
          "\u1e91": "z",
          "\u017c": "z",
          "\u017e": "z",
          "\u1e93": "z",
          "\u1e95": "z",
          "\u01b6": "z",
          "\u0225": "z",
          "\u0240": "z",
          "\u2c6c": "z",
          "\ua763": "z",
          "\u0386": "\u0391",
          "\u0388": "\u0395",
          "\u0389": "\u0397",
          "\u038a": "\u0399",
          "\u03aa": "\u0399",
          "\u038c": "\u039f",
          "\u038e": "\u03a5",
          "\u03ab": "\u03a5",
          "\u038f": "\u03a9",
          "\u03ac": "\u03b1",
          "\u03ad": "\u03b5",
          "\u03ae": "\u03b7",
          "\u03af": "\u03b9",
          "\u03ca": "\u03b9",
          "\u0390": "\u03b9",
          "\u03cc": "\u03bf",
          "\u03cd": "\u03c5",
          "\u03cb": "\u03c5",
          "\u03b0": "\u03c5",
          "\u03c9": "\u03c9",
          "\u03c2": "\u03c3",
        };
      (O = E(document)),
        (I = 1),
        (L = function () {
          return I++;
        }),
        (D = N(
          (j = N(Object, {
            bind: function (e) {
              var t = this;
              return function () {
                e.apply(t, arguments);
              };
            },
            init: function (e) {
              var o,
                t,
                n = ".select2-results";
              (this.opts = e = this.prepareOpts(e)),
                (this.id = e.id),
                e.element.data("select2") !== w &&
                  null !== e.element.data("select2") &&
                  e.element.data("select2").destroy(),
                (this.container = this.createContainer()),
                (this.liveRegion = E(".select2-hidden-accessible")),
                0 == this.liveRegion.length &&
                  (this.liveRegion = E("<span>", {
                    role: "status",
                    "aria-live": "polite",
                  })
                    .addClass("select2-hidden-accessible")
                    .appendTo(document.body)),
                (this.containerId =
                  "s2id_" + (e.element.attr("id") || "autogen" + L())),
                (this.containerEventName = this.containerId
                  .replace(/([.])/g, "_")
                  .replace(
                    /([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,
                    "\\$1"
                  )),
                this.container.attr("id", this.containerId),
                this.container.attr("title", e.element.attr("title")),
                (this.body = E(document.body)),
                b(
                  this.container,
                  this.opts.element,
                  this.opts.adaptContainerCssClass
                ),
                this.container.attr("style", e.element.attr("style")),
                this.container.css(T(e.containerCss, this.opts.element)),
                this.container.addClass(
                  T(e.containerCssClass, this.opts.element)
                ),
                (this.elementTabIndex = this.opts.element.attr("tabindex")),
                this.opts.element
                  .data("select2", this)
                  .attr("tabindex", "-1")
                  .before(this.container)
                  .on("click.select2", g),
                this.container.data("select2", this),
                (this.dropdown = this.container.find(".select2-drop")),
                b(
                  this.dropdown,
                  this.opts.element,
                  this.opts.adaptDropdownCssClass
                ),
                this.dropdown.addClass(
                  T(e.dropdownCssClass, this.opts.element)
                ),
                this.dropdown.data("select2", this),
                this.dropdown.on("click", g),
                (this.results = o = this.container.find(n)),
                (this.search = t = this.container.find("input.select2-input")),
                (this.queryCount = 0),
                (this.resultsPage = 0),
                (this.context = null),
                this.initContainer(),
                this.container.on("click", g),
                d(this.results),
                this.dropdown.on(
                  "mousemove-filtered",
                  n,
                  this.bind(this.highlightUnderEvent)
                ),
                this.dropdown.on(
                  "touchstart touchmove touchend",
                  n,
                  this.bind(function (e) {
                    (this._touchEvent = !0), this.highlightUnderEvent(e);
                  })
                ),
                this.dropdown.on("touchmove", n, this.bind(this.touchMoved)),
                this.dropdown.on(
                  "touchstart touchend",
                  n,
                  this.bind(this.clearTouchMoved)
                ),
                this.dropdown.on(
                  "click",
                  this.bind(function () {
                    this._touchEvent &&
                      ((this._touchEvent = !1), this.selectHighlighted());
                  })
                ),
                f(80, this.results),
                this.dropdown.on(
                  "scroll-debounced",
                  n,
                  this.bind(this.loadMoreIfNeeded)
                ),
                E(this.container).on("change", ".select2-input", function (e) {
                  e.stopPropagation();
                }),
                E(this.dropdown).on("change", ".select2-input", function (e) {
                  e.stopPropagation();
                }),
                E.fn.mousewheel &&
                  o.mousewheel(function (e, t, n, i) {
                    var r = o.scrollTop();
                    0 < i && r - i <= 0
                      ? (o.scrollTop(0), g(e))
                      : i < 0 &&
                        o.get(0).scrollHeight - o.scrollTop() + i <=
                          o.height() &&
                        (o.scrollTop(o.get(0).scrollHeight - o.height()), g(e));
                  }),
                h(t),
                t.on("keyup-change input paste", this.bind(this.updateResults)),
                t.on("focus", function () {
                  t.addClass("select2-focused");
                }),
                t.on("blur", function () {
                  t.removeClass("select2-focused");
                }),
                this.dropdown.on(
                  "mouseup",
                  n,
                  this.bind(function (e) {
                    0 <
                      E(e.target).closest(".select2-result-selectable")
                        .length &&
                      (this.highlightUnderEvent(e), this.selectHighlighted(e));
                  })
                ),
                this.dropdown.on(
                  "click mouseup mousedown touchstart touchend focusin",
                  function (e) {
                    e.stopPropagation();
                  }
                ),
                (this.lastSearchTerm = w),
                E.isFunction(this.opts.initSelection) &&
                  (this.initSelection(), this.monitorSource()),
                null !== e.maximumInputLength &&
                  this.search.attr("maxlength", e.maximumInputLength);
              var i = e.element.prop("disabled");
              i === w && (i = !1), this.enable(!i);
              var r = e.element.prop("readonly");
              r === w && (r = !1),
                this.readonly(r),
                (R = R || l()),
                (this.autofocus = e.element.prop("autofocus")),
                e.element.prop("autofocus", !1),
                this.autofocus && this.focus(),
                this.search.attr("placeholder", e.searchInputPlaceholder);
            },
            destroy: function () {
              var e = this.opts.element,
                t = e.data("select2"),
                n = this;
              this.close(),
                e.length &&
                  e[0].detachEvent &&
                  n._sync &&
                  e.each(function () {
                    n._sync && this.detachEvent("onpropertychange", n._sync);
                  }),
                this.propertyObserver &&
                  (this.propertyObserver.disconnect(),
                  (this.propertyObserver = null)),
                (this._sync = null),
                t !== w &&
                  (t.container.remove(),
                  t.liveRegion.remove(),
                  t.dropdown.remove(),
                  e.removeData("select2").off(".select2"),
                  e.is("input[type='hidden']")
                    ? e.css("display", "")
                    : (e.show().prop("autofocus", this.autofocus || !1),
                      this.elementTabIndex
                        ? e.attr({ tabindex: this.elementTabIndex })
                        : e.removeAttr("tabindex"),
                      e.show())),
                r.call(
                  this,
                  "container",
                  "liveRegion",
                  "dropdown",
                  "results",
                  "search"
                );
            },
            optionToData: function (e) {
              return e.is("option")
                ? {
                    id: e.prop("value"),
                    text: e.text(),
                    element: e.get(),
                    css: e.attr("class"),
                    disabled: e.prop("disabled"),
                    locked:
                      p(e.attr("locked"), "locked") || p(e.data("locked"), !0),
                  }
                : e.is("optgroup")
                ? {
                    text: e.attr("label"),
                    children: [],
                    element: e.get(),
                    css: e.attr("class"),
                  }
                : void 0;
            },
            prepareOpts: function (y) {
              var a,
                e,
                t,
                n,
                b = this;
              if (
                ("select" === (a = y.element).get(0).tagName.toLowerCase() &&
                  (this.select = e = y.element),
                e &&
                  E.each(
                    [
                      "id",
                      "multiple",
                      "ajax",
                      "query",
                      "createSearchChoice",
                      "initSelection",
                      "data",
                      "tags",
                    ],
                    function () {
                      if (this in y)
                        throw new Error(
                          "Option '" +
                            this +
                            "' is not allowed for Select2 when attached to a <select> element."
                        );
                    }
                  ),
                (y.debug = y.debug || E.fn.select2.defaults.debug),
                y.debug &&
                  console &&
                  console.warn &&
                  (null != y.id &&
                    console.warn(
                      "Select2: The `id` option has been removed in Select2 4.0.0, consider renaming your `id` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"
                    ),
                  null != y.text &&
                    console.warn(
                      "Select2: The `text` option has been removed in Select2 4.0.0, consider renaming your `text` property or mapping the property before your data makes it to Select2. You can read more at https://select2.github.io/announcements-4.0.html#changed-id"
                    ),
                  null != y.sortResults &&
                    console.warn(
                      "Select2: the `sortResults` option has been renamed to `sorter` in Select2 4.0.0. "
                    ),
                  null != y.selectOnBlur &&
                    console.warn(
                      "Select2: The `selectOnBlur` option has been renamed to `selectOnClose` in Select2 4.0.0."
                    ),
                  null != y.ajax &&
                    null != y.ajax.results &&
                    console.warn(
                      "Select2: The `ajax.results` option has been renamed to `ajax.processResults` in Select2 4.0.0."
                    ),
                  null != y.formatNoResults &&
                    console.warn(
                      "Select2: The `formatNoResults` option has been renamed to `language.noResults` in Select2 4.0.0."
                    ),
                  null != y.formatSearching &&
                    console.warn(
                      "Select2: The `formatSearching` option has been renamed to `language.searching` in Select2 4.0.0."
                    ),
                  null != y.formatInputTooShort &&
                    console.warn(
                      "Select2: The `formatInputTooShort` option has been renamed to `language.inputTooShort` in Select2 4.0.0."
                    ),
                  null != y.formatInputTooLong &&
                    console.warn(
                      "Select2: The `formatInputTooLong` option has been renamed to `language.inputTooLong` in Select2 4.0.0."
                    ),
                  null != y.formatLoading &&
                    console.warn(
                      "Select2: The `formatLoading` option has been renamed to `language.loadingMore` in Select2 4.0.0."
                    ),
                  null != y.formatSelectionTooBig &&
                    console.warn(
                      "Select2: The `formatSelectionTooBig` option has been renamed to `language.maximumSelected` in Select2 4.0.0."
                    ),
                  y.element.data("select2Tags") &&
                    console.warn(
                      "Select2: The `data-select2-tags` attribute has been renamed to `data-tags` in Select2 4.0.0."
                    )),
                null != y.element.data("tags"))
              ) {
                var i = y.element.data("tags");
                E.isArray(i) || (i = []), y.element.data("select2Tags", i);
              }
              if (
                (null != y.sorter && (y.sortResults = y.sorter),
                null != y.selectOnClose && (y.selectOnBlur = y.selectOnClose),
                null != y.ajax &&
                  E.isFunction(y.ajax.processResults) &&
                  (y.ajax.results = y.ajax.processResults),
                null != y.language)
              ) {
                var r = y.language;
                E.isFunction(r.noMatches) && (y.formatNoMatches = r.noMatches),
                  E.isFunction(r.searching) &&
                    (y.formatSearching = r.searching),
                  E.isFunction(r.inputTooShort) &&
                    (y.formatInputTooShort = r.inputTooShort),
                  E.isFunction(r.inputTooLong) &&
                    (y.formatInputTooLong = r.inputTooLong),
                  E.isFunction(r.loadingMore) &&
                    (y.formatLoading = r.loadingMore),
                  E.isFunction(r.maximumSelected) &&
                    (y.formatSelectionTooBig = r.maximumSelected);
              }
              if (
                ("function" !=
                  typeof (y = E.extend(
                    {},
                    {
                      populateResults: function (e, t, f) {
                        var m,
                          g = this.opts.id,
                          v = this.liveRegion;
                        (m = function (e, t, n) {
                          var i,
                            r,
                            o,
                            a,
                            s,
                            l,
                            c,
                            u,
                            h,
                            d,
                            p = [];
                          for (
                            i = 0, r = (e = y.sortResults(e, t, f)).length;
                            i < r;
                            i += 1
                          )
                            (a =
                              !(s = !0 === (o = e[i]).disabled) && g(o) !== w),
                              (l = o.children && 0 < o.children.length),
                              (c = E("<li></li>")).addClass(
                                "select2-results-dept-" + n
                              ),
                              c.addClass("select2-result"),
                              c.addClass(
                                a
                                  ? "select2-result-selectable"
                                  : "select2-result-unselectable"
                              ),
                              s && c.addClass("select2-disabled"),
                              l && c.addClass("select2-result-with-children"),
                              c.addClass(b.opts.formatResultCssClass(o)),
                              c.attr("role", "presentation"),
                              (u = E(document.createElement("div"))).addClass(
                                "select2-result-label"
                              ),
                              u.attr("id", "select2-result-label-" + L()),
                              u.attr("role", "option"),
                              (d = y.formatResult(
                                o,
                                u,
                                f,
                                b.opts.escapeMarkup
                              )) !== w && (u.html(d), c.append(u)),
                              l &&
                                ((h = E("<ul></ul>")).addClass(
                                  "select2-result-sub"
                                ),
                                m(o.children, h, n + 1),
                                c.append(h)),
                              c.data("select2-data", o),
                              p.push(c[0]);
                          t.append(p), v.text(y.formatMatches(e.length));
                        })(t, e, 0);
                      },
                    },
                    E.fn.select2.defaults,
                    y
                  )).id &&
                  ((t = y.id),
                  (y.id = function (e) {
                    return e[t];
                  })),
                E.isArray(y.element.data("select2Tags")))
              ) {
                if ("tags" in y)
                  throw (
                    "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " +
                    y.element.attr("id")
                  );
                y.tags = y.element.data("select2Tags");
              }
              if (
                (e
                  ? ((y.query = this.bind(function (i) {
                      var e,
                        t,
                        r,
                        n = { results: [], more: !1 },
                        o = i.term;
                      (r = function (e, t) {
                        var n;
                        e.is("option")
                          ? i.matcher(o, e.text(), e) &&
                            t.push(b.optionToData(e))
                          : e.is("optgroup") &&
                            ((n = b.optionToData(e)),
                            e.children().each2(function (e, t) {
                              r(t, n.children);
                            }),
                            0 < n.children.length && t.push(n));
                      }),
                        (e = a.children()),
                        this.getPlaceholder() !== w &&
                          0 < e.length &&
                          (t = this.getPlaceholderOption()) &&
                          (e = e.not(t)),
                        e.each2(function (e, t) {
                          r(t, n.results);
                        }),
                        i.callback(n);
                    })),
                    (y.id = function (e) {
                      return e.id;
                    }))
                  : "query" in y ||
                    ("ajax" in y
                      ? ((n = y.element.data("ajax-url")) &&
                          0 < n.length &&
                          (y.ajax.url = n),
                        (y.query = _.call(y.element, y.ajax)))
                      : "data" in y
                      ? (y.query = S(y.data))
                      : "tags" in y &&
                        ((y.query = C(y.tags)),
                        y.createSearchChoice === w &&
                          (y.createSearchChoice = function (e) {
                            return { id: E.trim(e), text: E.trim(e) };
                          }),
                        y.initSelection === w &&
                          (y.initSelection = function (e, t) {
                            var n = [];
                            E(c(e.val(), y.separator, y.transformVal)).each(
                              function () {
                                var e = { id: this, text: this },
                                  t = y.tags;
                                E.isFunction(t) && (t = t()),
                                  E(t).each(function () {
                                    if (p(this.id, e.id)) return (e = this), !1;
                                  }),
                                  n.push(e);
                              }
                            ),
                              t(n);
                          }))),
                "function" != typeof y.query)
              )
                throw (
                  "query function not defined for Select2 " +
                  y.element.attr("id")
                );
              if ("top" === y.createSearchChoicePosition)
                y.createSearchChoicePosition = function (e, t) {
                  e.unshift(t);
                };
              else if ("bottom" === y.createSearchChoicePosition)
                y.createSearchChoicePosition = function (e, t) {
                  e.push(t);
                };
              else if ("function" != typeof y.createSearchChoicePosition)
                throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
              return y;
            },
            monitorSource: function () {
              var e,
                n = this.opts.element,
                t = this;
              n.on(
                "change.select2",
                this.bind(function () {
                  !0 !== this.opts.element.data("select2-change-triggered") &&
                    this.initSelection();
                })
              ),
                (this._sync = this.bind(function () {
                  var e = n.prop("disabled");
                  e === w && (e = !1), this.enable(!e);
                  var t = n.prop("readonly");
                  t === w && (t = !1),
                    this.readonly(t),
                    this.container &&
                      (b(
                        this.container,
                        this.opts.element,
                        this.opts.adaptContainerCssClass
                      ),
                      this.container.addClass(
                        T(this.opts.containerCssClass, this.opts.element)
                      )),
                    this.dropdown &&
                      (b(
                        this.dropdown,
                        this.opts.element,
                        this.opts.adaptDropdownCssClass
                      ),
                      this.dropdown.addClass(
                        T(this.opts.dropdownCssClass, this.opts.element)
                      ));
                })),
                n.length &&
                  n[0].attachEvent &&
                  n.each(function () {
                    this.attachEvent("onpropertychange", t._sync);
                  }),
                (e =
                  window.MutationObserver ||
                  window.WebKitMutationObserver ||
                  window.MozMutationObserver) !== w &&
                  (this.propertyObserver &&
                    (delete this.propertyObserver,
                    (this.propertyObserver = null)),
                  (this.propertyObserver = new e(function (e) {
                    E.each(e, t._sync);
                  })),
                  this.propertyObserver.observe(n.get(0), {
                    attributes: !0,
                    subtree: !1,
                  }));
            },
            triggerSelect: function (e) {
              var t = E.Event("select2-selecting", {
                val: this.id(e),
                object: e,
                choice: e,
              });
              return this.opts.element.trigger(t), !t.isDefaultPrevented();
            },
            triggerChange: function (e) {
              (e = e || {}),
                (e = E.extend({}, e, { type: "change", val: this.val() })),
                this.opts.element.data("select2-change-triggered", !0),
                this.opts.element.trigger(e),
                this.opts.element.data("select2-change-triggered", !1),
                this.opts.element.click(),
                this.opts.blurOnChange && this.opts.element.blur();
            },
            isInterfaceEnabled: function () {
              return !0 === this.enabledInterface;
            },
            enableInterface: function () {
              var e = this._enabled && !this._readonly,
                t = !e;
              return (
                e !== this.enabledInterface &&
                (this.container.toggleClass("select2-container-disabled", t),
                this.close(),
                (this.enabledInterface = e),
                !0)
              );
            },
            enable: function (e) {
              e === w && (e = !0),
                this._enabled !== e &&
                  ((this._enabled = e),
                  this.opts.element.prop("disabled", !e),
                  this.enableInterface());
            },
            disable: function () {
              this.enable(!1);
            },
            readonly: function (e) {
              e === w && (e = !1),
                this._readonly !== e &&
                  ((this._readonly = e),
                  this.opts.element.prop("readonly", e),
                  this.enableInterface());
            },
            opened: function () {
              return (
                !!this.container &&
                this.container.hasClass("select2-dropdown-open")
              );
            },
            positionDropdown: function () {
              var e,
                t,
                n,
                i,
                r,
                o = this.dropdown,
                a = this.container,
                s = a.offset(),
                l = a.outerHeight(!1),
                c = a.outerWidth(!1),
                u = o.outerHeight(!1),
                h = E(window),
                d = h.width(),
                p = h.height(),
                f = h.scrollLeft() + d,
                m = h.scrollTop() + p,
                g = s.top + l,
                v = s.left,
                y = g + u <= m,
                b = s.top - u >= h.scrollTop(),
                w = o.outerWidth(!1),
                x = function () {
                  return v + w <= f;
                },
                _ = function () {
                  return s.left + f + a.outerWidth(!1) > w;
                };
              o.hasClass("select2-drop-above")
                ? ((t = !0), !b && y && (t = !(n = !0)))
                : ((t = !1), !y && b && (t = n = !0)),
                n &&
                  (o.hide(),
                  (s = this.container.offset()),
                  (l = this.container.outerHeight(!1)),
                  (c = this.container.outerWidth(!1)),
                  (u = o.outerHeight(!1)),
                  (f = h.scrollLeft() + d),
                  (m = h.scrollTop() + p),
                  (g = s.top + l),
                  (v = s.left),
                  (w = o.outerWidth(!1)),
                  o.show(),
                  this.focusSearch()),
                this.opts.dropdownAutoWidth
                  ? ((r = E(".select2-results", o)[0]),
                    o.addClass("select2-drop-auto-width"),
                    o.css("width", ""),
                    c <
                    (w =
                      o.outerWidth(!1) +
                      (r.scrollHeight === r.clientHeight ? 0 : R.width))
                      ? (c = w)
                      : (w = c),
                    (u = o.outerHeight(!1)))
                  : this.container.removeClass("select2-drop-auto-width"),
                "static" !== this.body.css("position") &&
                  ((g -= (e = this.body.offset()).top), (v -= e.left)),
                !x() && _() && (v = s.left + this.container.outerWidth(!1) - w),
                (i = { left: v, width: c }),
                t
                  ? (this.container.addClass("select2-drop-above"),
                    o.addClass("select2-drop-above"),
                    (u = o.outerHeight(!1)),
                    (i.top = s.top - u),
                    (i.bottom = "auto"))
                  : ((i.top = g),
                    (i.bottom = "auto"),
                    this.container.removeClass("select2-drop-above"),
                    o.removeClass("select2-drop-above")),
                (i = E.extend(i, T(this.opts.dropdownCss, this.opts.element))),
                o.css(i);
            },
            shouldOpen: function () {
              var e;
              return (
                !this.opened() &&
                !1 !== this._enabled &&
                !0 !== this._readonly &&
                ((e = E.Event("select2-opening")),
                this.opts.element.trigger(e),
                !e.isDefaultPrevented())
              );
            },
            clearDropdownAlignmentPreference: function () {
              this.container.removeClass("select2-drop-above"),
                this.dropdown.removeClass("select2-drop-above");
            },
            open: function () {
              return (
                !!this.shouldOpen() &&
                (this.opening(),
                O.on("mousemove.select2Event", function (e) {
                  ($.x = e.pageX), ($.y = e.pageY);
                }),
                !0)
              );
            },
            opening: function () {
              var i,
                e = this.containerEventName,
                t = "scroll." + e,
                n = "resize." + e,
                r = "orientationchange." + e;
              this.container
                .addClass("select2-dropdown-open")
                .addClass("select2-container-active"),
                this.clearDropdownAlignmentPreference(),
                this.dropdown[0] !== this.body.children().last()[0] &&
                  this.dropdown.detach().appendTo(this.body),
                0 === (i = E("#select2-drop-mask")).length &&
                  ((i = E(document.createElement("div")))
                    .attr("id", "select2-drop-mask")
                    .attr("class", "select2-drop-mask"),
                  i.hide(),
                  i.appendTo(this.body),
                  i.on("mousedown touchstart click", function (e) {
                    a(i);
                    var t,
                      n = E("#select2-drop");
                    0 < n.length &&
                      ((t = n.data("select2")).opts.selectOnBlur &&
                        t.selectHighlighted({ noFocus: !0 }),
                      t.close(),
                      e.preventDefault(),
                      e.stopPropagation());
                  })),
                this.dropdown.prev()[0] !== i[0] && this.dropdown.before(i),
                E("#select2-drop").removeAttr("id"),
                this.dropdown.attr("id", "select2-drop"),
                i.show(),
                this.positionDropdown(),
                this.dropdown.show(),
                this.positionDropdown(),
                this.dropdown.addClass("select2-drop-active");
              var o = this;
              this.container
                .parents()
                .add(window)
                .each(function () {
                  E(this).on(n + " " + t + " " + r, function () {
                    o.opened() && o.positionDropdown();
                  });
                });
            },
            close: function () {
              if (this.opened()) {
                var e = this.containerEventName,
                  t = "scroll." + e,
                  n = "resize." + e,
                  i = "orientationchange." + e;
                this.container
                  .parents()
                  .add(window)
                  .each(function () {
                    E(this).off(t).off(n).off(i);
                  }),
                  this.clearDropdownAlignmentPreference(),
                  E("#select2-drop-mask").hide(),
                  this.dropdown.removeAttr("id"),
                  this.dropdown.hide(),
                  this.container
                    .removeClass("select2-dropdown-open")
                    .removeClass("select2-container-active"),
                  this.results.empty(),
                  O.off("mousemove.select2Event"),
                  this.clearSearch(),
                  this.search.removeClass("select2-active"),
                  this.search.removeAttr("aria-activedescendant"),
                  this.opts.element.trigger(E.Event("select2-close"));
              }
            },
            externalSearch: function (e) {
              this.open(), this.search.val(e), this.updateResults(!1);
            },
            clearSearch: function () {},
            prefillNextSearchTerm: function () {
              if ("" !== this.search.val()) return !1;
              var e = this.opts.nextSearchTerm(
                this.data(),
                this.lastSearchTerm
              );
              return e !== w && (this.search.val(e), this.search.select(), !0);
            },
            getMaximumSelectionSize: function () {
              return T(this.opts.maximumSelectionSize, this.opts.element);
            },
            ensureHighlightVisible: function () {
              var e,
                t,
                n,
                i,
                r,
                o,
                a,
                s,
                l = this.results;
              (t = this.highlight()) < 0 ||
                (0 != t
                  ? ((e = this.findHighlightableChoices().find(
                      ".select2-result-label"
                    )),
                    (i =
                      (s = ((n = E(e[t])).offset() || {}).top || 0) +
                      n.outerHeight(!0)),
                    t === e.length - 1 &&
                      0 < (a = l.find("li.select2-more-results")).length &&
                      (i = a.offset().top + a.outerHeight(!0)),
                    (r = l.offset().top + l.outerHeight(!1)) < i &&
                      l.scrollTop(l.scrollTop() + (i - r)),
                    (o = s - l.offset().top) < 0 &&
                      "none" != n.css("display") &&
                      l.scrollTop(l.scrollTop() + o))
                  : l.scrollTop(0));
            },
            findHighlightableChoices: function () {
              return this.results.find(
                ".select2-result-selectable:not(.select2-disabled):not(.select2-selected)"
              );
            },
            moveHighlight: function (e) {
              for (
                var t = this.findHighlightableChoices(), n = this.highlight();
                -1 < n && n < t.length;

              ) {
                var i = E(t[(n += e)]);
                if (
                  i.hasClass("select2-result-selectable") &&
                  !i.hasClass("select2-disabled") &&
                  !i.hasClass("select2-selected")
                ) {
                  this.highlight(n);
                  break;
                }
              }
            },
            highlight: function (e) {
              var t,
                n,
                i = this.findHighlightableChoices();
              if (0 === arguments.length)
                return u(i.filter(".select2-highlighted")[0], i.get());
              e >= i.length && (e = i.length - 1),
                e < 0 && (e = 0),
                this.removeHighlight(),
                (t = E(i[e])).addClass("select2-highlighted"),
                this.search.attr(
                  "aria-activedescendant",
                  t.find(".select2-result-label").attr("id")
                ),
                this.ensureHighlightVisible(),
                this.liveRegion.text(t.text()),
                (n = t.data("select2-data")) &&
                  this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(n),
                    choice: n,
                  });
            },
            removeHighlight: function () {
              this.results
                .find(".select2-highlighted")
                .removeClass("select2-highlighted");
            },
            touchMoved: function () {
              this._touchMoved = !0;
            },
            clearTouchMoved: function () {
              this._touchMoved = !1;
            },
            countSelectableResults: function () {
              return this.findHighlightableChoices().length;
            },
            highlightUnderEvent: function (e) {
              var t = E(e.target).closest(".select2-result-selectable");
              if (0 < t.length && !t.is(".select2-highlighted")) {
                var n = this.findHighlightableChoices();
                this.highlight(n.index(t));
              } else 0 == t.length && this.removeHighlight();
            },
            loadMoreIfNeeded: function () {
              var t = this.results,
                n = t.find("li.select2-more-results"),
                i = this.resultsPage + 1,
                r = this,
                o = this.search.val(),
                a = this.context;
              0 !== n.length &&
                n.offset().top - t.offset().top - t.height() <=
                  this.opts.loadMorePadding &&
                (n.addClass("select2-active"),
                this.opts.query({
                  element: this.opts.element,
                  term: o,
                  page: i,
                  context: a,
                  matcher: this.opts.matcher,
                  callback: this.bind(function (e) {
                    r.opened() &&
                      (r.opts.populateResults.call(this, t, e.results, {
                        term: o,
                        page: i,
                        context: a,
                      }),
                      r.postprocessResults(e, !1, !1),
                      !0 === e.more
                        ? (n
                            .detach()
                            .appendTo(t)
                            .html(
                              r.opts.escapeMarkup(
                                T(r.opts.formatLoadMore, r.opts.element, i + 1)
                              )
                            ),
                          window.setTimeout(function () {
                            r.loadMoreIfNeeded();
                          }, 10))
                        : n.remove(),
                      r.positionDropdown(),
                      (r.resultsPage = i),
                      (r.context = e.context),
                      this.opts.element.trigger({
                        type: "select2-loaded",
                        items: e,
                      }));
                  }),
                }));
            },
            tokenize: function () {},
            updateResults: function (n) {
              function i() {
                a.removeClass("select2-active"),
                  c.positionDropdown(),
                  s.find(
                    ".select2-no-results,.select2-selection-limit,.select2-searching"
                  ).length
                    ? c.liveRegion.text(s.text())
                    : c.liveRegion.text(
                        c.opts.formatMatches(
                          s.find(
                            '.select2-result-selectable:not(".select2-selected")'
                          ).length
                        )
                      );
              }
              function r(e) {
                s.html(e), i();
              }
              var e,
                t,
                o,
                a = this.search,
                s = this.results,
                l = this.opts,
                c = this,
                u = a.val(),
                h = E.data(this.container, "select2-last-term");
              if (
                (!0 === n || !h || !p(u, h)) &&
                (E.data(this.container, "select2-last-term", u),
                !0 === n || (!1 !== this.showSearchInput && this.opened()))
              ) {
                o = ++this.queryCount;
                var d = this.getMaximumSelectionSize();
                if (
                  !(
                    1 <= d &&
                    ((e = this.data()),
                    E.isArray(e) &&
                      e.length >= d &&
                      k(l.formatSelectionTooBig, "formatSelectionTooBig"))
                  )
                )
                  return a.val().length < l.minimumInputLength
                    ? (k(l.formatInputTooShort, "formatInputTooShort")
                        ? r(
                            "<li class='select2-no-results'>" +
                              T(
                                l.formatInputTooShort,
                                l.element,
                                a.val(),
                                l.minimumInputLength
                              ) +
                              "</li>"
                          )
                        : r(""),
                      void (n && this.showSearch && this.showSearch(!0)))
                    : void (l.maximumInputLength &&
                      a.val().length > l.maximumInputLength
                        ? k(l.formatInputTooLong, "formatInputTooLong")
                          ? r(
                              "<li class='select2-no-results'>" +
                                T(
                                  l.formatInputTooLong,
                                  l.element,
                                  a.val(),
                                  l.maximumInputLength
                                ) +
                                "</li>"
                            )
                          : r("")
                        : (l.formatSearching &&
                            0 === this.findHighlightableChoices().length &&
                            r(
                              "<li class='select2-searching'>" +
                                T(l.formatSearching, l.element) +
                                "</li>"
                            ),
                          a.addClass("select2-active"),
                          this.removeHighlight(),
                          (t = this.tokenize()) != w && null != t && a.val(t),
                          (this.resultsPage = 1),
                          l.query({
                            element: l.element,
                            term: a.val(),
                            page: this.resultsPage,
                            context: null,
                            matcher: l.matcher,
                            callback: this.bind(function (e) {
                              var t;
                              if (o == this.queryCount)
                                if (this.opened())
                                  if (
                                    e.hasError !== w &&
                                    k(l.formatAjaxError, "formatAjaxError")
                                  )
                                    r(
                                      "<li class='select2-ajax-error'>" +
                                        T(
                                          l.formatAjaxError,
                                          l.element,
                                          e.jqXHR,
                                          e.textStatus,
                                          e.errorThrown
                                        ) +
                                        "</li>"
                                    );
                                  else {
                                    if (
                                      ((this.context =
                                        e.context === w ? null : e.context),
                                      this.opts.createSearchChoice &&
                                        "" !== a.val() &&
                                        (t = this.opts.createSearchChoice.call(
                                          c,
                                          a.val(),
                                          e.results
                                        )) !== w &&
                                        null !== t &&
                                        c.id(t) !== w &&
                                        null !== c.id(t) &&
                                        0 ===
                                          E(e.results).filter(function () {
                                            return p(c.id(this), c.id(t));
                                          }).length &&
                                        this.opts.createSearchChoicePosition(
                                          e.results,
                                          t
                                        ),
                                      0 === e.results.length &&
                                        k(l.formatNoMatches, "formatNoMatches"))
                                    )
                                      return (
                                        r(
                                          "<li class='select2-no-results'>" +
                                            T(
                                              l.formatNoMatches,
                                              l.element,
                                              a.val()
                                            ) +
                                            "</li>"
                                        ),
                                        void (
                                          this.showSearch &&
                                          this.showSearch(a.val())
                                        )
                                      );
                                    s.empty(),
                                      c.opts.populateResults.call(
                                        this,
                                        s,
                                        e.results,
                                        {
                                          term: a.val(),
                                          page: this.resultsPage,
                                          context: null,
                                        }
                                      ),
                                      !0 === e.more &&
                                        k(l.formatLoadMore, "formatLoadMore") &&
                                        (s.append(
                                          "<li class='select2-more-results'>" +
                                            l.escapeMarkup(
                                              T(
                                                l.formatLoadMore,
                                                l.element,
                                                this.resultsPage
                                              )
                                            ) +
                                            "</li>"
                                        ),
                                        window.setTimeout(function () {
                                          c.loadMoreIfNeeded();
                                        }, 10)),
                                      this.postprocessResults(e, n),
                                      i(),
                                      this.opts.element.trigger({
                                        type: "select2-loaded",
                                        items: e,
                                      });
                                  }
                                else this.search.removeClass("select2-active");
                            }),
                          })));
                r(
                  "<li class='select2-selection-limit'>" +
                    T(l.formatSelectionTooBig, l.element, d) +
                    "</li>"
                );
              }
            },
            cancel: function () {
              this.close();
            },
            blur: function () {
              this.opts.selectOnBlur && this.selectHighlighted({ noFocus: !0 }),
                this.close(),
                this.container.removeClass("select2-container-active"),
                this.search[0] === document.activeElement && this.search.blur(),
                this.clearSearch(),
                this.selection
                  .find(".select2-search-choice-focus")
                  .removeClass("select2-search-choice-focus");
            },
            focusSearch: function () {
              e(this.search);
            },
            selectHighlighted: function (e) {
              if (this._touchMoved) this.clearTouchMoved();
              else {
                var t = this.highlight(),
                  n = this.results
                    .find(".select2-highlighted")
                    .closest(".select2-result")
                    .data("select2-data");
                n
                  ? (this.highlight(t), this.onSelect(n, e))
                  : e && e.noFocus && this.close();
              }
            },
            getPlaceholder: function () {
              var e;
              return (
                this.opts.element.attr("placeholder") ||
                this.opts.element.attr("data-placeholder") ||
                this.opts.element.data("placeholder") ||
                this.opts.placeholder ||
                ((e = this.getPlaceholderOption()) !== w ? e.text() : w)
              );
            },
            getPlaceholderOption: function () {
              if (this.select) {
                var e = this.select.children("option").first();
                if (this.opts.placeholderOption !== w)
                  return (
                    ("first" === this.opts.placeholderOption && e) ||
                    ("function" == typeof this.opts.placeholderOption &&
                      this.opts.placeholderOption(this.select))
                  );
                if ("" === E.trim(e.text()) && "" === e.val()) return e;
              }
            },
            initContainerWidth: function () {
              function e() {
                var e, t, n, i, r;
                if ("off" === this.opts.width) return null;
                if ("element" === this.opts.width)
                  return 0 === this.opts.element.outerWidth(!1)
                    ? "auto"
                    : this.opts.element.outerWidth(!1) + "px";
                if ("copy" !== this.opts.width && "resolve" !== this.opts.width)
                  return E.isFunction(this.opts.width)
                    ? this.opts.width()
                    : this.opts.width;
                if ("string" == typeof (e = this.opts.element.attr("style")))
                  for (i = 0, r = (t = e.split(";")).length; i < r; i += 1)
                    if (
                      null !==
                        (n = t[i]
                          .replace(/\s/g, "")
                          .match(
                            /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i
                          )) &&
                      1 <= n.length
                    )
                      return n[1];
                return "resolve" === this.opts.width
                  ? 0 < (e = this.opts.element.css("width")).indexOf("%")
                    ? e
                    : 0 === this.opts.element.outerWidth(!1)
                    ? "auto"
                    : this.opts.element.outerWidth(!1) + "px"
                  : null;
              }
              var t = e.call(this);
              null !== t && this.container.css("width", t);
            },
          })),
          {
            createContainer: function () {
              return E(document.createElement("div"))
                .attr({ class: "select2-container" })
                .html(
                  [
                    "<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>",
                    "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>",
                    "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>",
                    "</a>",
                    "<label for='' class='select2-offscreen'></label>",
                    "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />",
                    "<div class='select2-drop select2-display-none'>",
                    "   <div class='select2-search'>",
                    "       <label for='' class='select2-offscreen'></label>",
                    "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'",
                    "       aria-autocomplete='list' />",
                    "   </div>",
                    "   <ul class='select2-results' role='listbox'>",
                    "   </ul>",
                    "</div>",
                  ].join("")
                );
            },
            enableInterface: function () {
              this.parent.enableInterface.apply(this, arguments) &&
                this.focusser.prop("disabled", !this.isInterfaceEnabled());
            },
            opening: function () {
              var e, t, n;
              0 <= this.opts.minimumResultsForSearch && this.showSearch(!0),
                this.parent.opening.apply(this, arguments),
                !1 !== this.showSearchInput &&
                  this.search.val(this.focusser.val()),
                this.opts.shouldFocusInput(this) &&
                  (this.search.focus(),
                  (e = this.search.get(0)).createTextRange
                    ? ((t = e.createTextRange()).collapse(!1), t.select())
                    : e.setSelectionRange &&
                      ((n = this.search.val().length),
                      e.setSelectionRange(n, n))),
                this.prefillNextSearchTerm(),
                this.focusser.prop("disabled", !0).val(""),
                this.updateResults(!0),
                this.opts.element.trigger(E.Event("select2-open"));
            },
            close: function () {
              this.opened() &&
                (this.parent.close.apply(this, arguments),
                this.focusser.prop("disabled", !1),
                this.opts.shouldFocusInput(this) && this.focusser.focus());
            },
            focus: function () {
              this.opened()
                ? this.close()
                : (this.focusser.prop("disabled", !1),
                  this.opts.shouldFocusInput(this) && this.focusser.focus());
            },
            isFocused: function () {
              return this.container.hasClass("select2-container-active");
            },
            cancel: function () {
              this.parent.cancel.apply(this, arguments),
                this.focusser.prop("disabled", !1),
                this.opts.shouldFocusInput(this) && this.focusser.focus();
            },
            destroy: function () {
              E("label[for='" + this.focusser.attr("id") + "']").attr(
                "for",
                this.opts.element.attr("id")
              ),
                this.parent.destroy.apply(this, arguments),
                r.call(this, "selection", "focusser");
            },
            initContainer: function () {
              var t,
                e,
                n = this.container,
                i = this.dropdown,
                r = L();
              this.opts.minimumResultsForSearch < 0
                ? this.showSearch(!1)
                : this.showSearch(!0),
                (this.selection = t = n.find(".select2-choice")),
                (this.focusser = n.find(".select2-focusser")),
                t.find(".select2-chosen").attr("id", "select2-chosen-" + r),
                this.focusser.attr("aria-labelledby", "select2-chosen-" + r),
                this.results.attr("id", "select2-results-" + r),
                this.search.attr("aria-owns", "select2-results-" + r),
                this.focusser.attr("id", "s2id_autogen" + r),
                (e = E("label[for='" + this.opts.element.attr("id") + "']")),
                this.opts.element.on(
                  "focus.select2",
                  this.bind(function () {
                    this.focus();
                  })
                ),
                this.focusser
                  .prev()
                  .text(e.text())
                  .attr("for", this.focusser.attr("id"));
              var o = this.opts.element.attr("title");
              this.opts.element.attr("title", o || e.text()),
                this.focusser.attr("tabindex", this.elementTabIndex),
                this.search.attr("id", this.focusser.attr("id") + "_search"),
                this.search
                  .prev()
                  .text(
                    E("label[for='" + this.focusser.attr("id") + "']").text()
                  )
                  .attr("for", this.search.attr("id")),
                this.search.on(
                  "keydown",
                  this.bind(function (e) {
                    if (this.isInterfaceEnabled() && 229 != e.keyCode)
                      if (e.which !== M.PAGE_UP && e.which !== M.PAGE_DOWN)
                        switch (e.which) {
                          case M.UP:
                          case M.DOWN:
                            return (
                              this.moveHighlight(e.which === M.UP ? -1 : 1),
                              void g(e)
                            );
                          case M.ENTER:
                            return this.selectHighlighted(), void g(e);
                          case M.TAB:
                            return void this.selectHighlighted({ noFocus: !0 });
                          case M.ESC:
                            return this.cancel(e), void g(e);
                        }
                      else g(e);
                  })
                ),
                this.search.on(
                  "blur",
                  this.bind(function () {
                    document.activeElement === this.body.get(0) &&
                      window.setTimeout(
                        this.bind(function () {
                          this.opened() &&
                            this.results &&
                            1 < this.results.length &&
                            this.search.focus();
                        }),
                        0
                      );
                  })
                ),
                this.focusser.on(
                  "keydown",
                  this.bind(function (e) {
                    if (
                      this.isInterfaceEnabled() &&
                      e.which !== M.TAB &&
                      !M.isControl(e) &&
                      !M.isFunctionKey(e) &&
                      e.which !== M.ESC
                    ) {
                      if (!1 !== this.opts.openOnEnter || e.which !== M.ENTER) {
                        if (
                          e.which == M.DOWN ||
                          e.which == M.UP ||
                          (e.which == M.ENTER && this.opts.openOnEnter)
                        ) {
                          if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)
                            return;
                          return this.open(), void g(e);
                        }
                        return e.which == M.DELETE || e.which == M.BACKSPACE
                          ? (this.opts.allowClear && this.clear(), void g(e))
                          : void 0;
                      }
                      g(e);
                    }
                  })
                ),
                h(this.focusser),
                this.focusser.on(
                  "keyup-change input",
                  this.bind(function (e) {
                    if (0 <= this.opts.minimumResultsForSearch) {
                      if ((e.stopPropagation(), this.opened())) return;
                      this.open();
                    }
                  })
                ),
                t.on(
                  "mousedown touchstart",
                  "abbr",
                  this.bind(function (e) {
                    this.isInterfaceEnabled() &&
                      (this.clear(),
                      v(e),
                      this.close(),
                      this.selection && this.selection.focus());
                  })
                ),
                t.on(
                  "mousedown touchstart",
                  this.bind(function (e) {
                    a(t),
                      this.container.hasClass("select2-container-active") ||
                        this.opts.element.trigger(E.Event("select2-focus")),
                      this.opened()
                        ? this.close()
                        : this.isInterfaceEnabled() && this.open(),
                      g(e);
                  })
                ),
                i.on(
                  "mousedown touchstart",
                  this.bind(function () {
                    this.opts.shouldFocusInput(this) && this.search.focus();
                  })
                ),
                t.on(
                  "focus",
                  this.bind(function (e) {
                    g(e);
                  })
                ),
                this.focusser
                  .on(
                    "focus",
                    this.bind(function () {
                      this.container.hasClass("select2-container-active") ||
                        this.opts.element.trigger(E.Event("select2-focus")),
                        this.container.addClass("select2-container-active");
                    })
                  )
                  .on(
                    "blur",
                    this.bind(function () {
                      this.opened() ||
                        (this.container.removeClass("select2-container-active"),
                        this.opts.element.trigger(E.Event("select2-blur")));
                    })
                  ),
                this.search.on(
                  "focus",
                  this.bind(function () {
                    this.container.hasClass("select2-container-active") ||
                      this.opts.element.trigger(E.Event("select2-focus")),
                      this.container.addClass("select2-container-active");
                  })
                ),
                this.initContainerWidth(),
                this.opts.element.hide(),
                this.setPlaceholder();
            },
            clear: function (e) {
              var t = this.selection.data("select2-data");
              if (t) {
                var n = E.Event("select2-clearing");
                if ((this.opts.element.trigger(n), n.isDefaultPrevented()))
                  return;
                var i = this.getPlaceholderOption();
                this.opts.element.val(i ? i.val() : ""),
                  this.selection.find(".select2-chosen").empty(),
                  this.selection.removeData("select2-data"),
                  this.setPlaceholder(),
                  !1 !== e &&
                    (this.opts.element.trigger({
                      type: "select2-removed",
                      val: this.id(t),
                      choice: t,
                    }),
                    this.triggerChange({ removed: t }));
              }
            },
            initSelection: function () {
              if (this.isPlaceholderOptionSelected())
                this.updateSelection(null), this.close(), this.setPlaceholder();
              else {
                var t = this;
                this.opts.initSelection.call(
                  null,
                  this.opts.element,
                  function (e) {
                    e !== w &&
                      null !== e &&
                      (t.updateSelection(e),
                      t.close(),
                      t.setPlaceholder(),
                      (t.lastSearchTerm = t.search.val()));
                  }
                );
              }
            },
            isPlaceholderOptionSelected: function () {
              var e;
              return (
                this.getPlaceholder() !== w &&
                (((e = this.getPlaceholderOption()) !== w &&
                  e.prop("selected")) ||
                  "" === this.opts.element.val() ||
                  this.opts.element.val() === w ||
                  null === this.opts.element.val())
              );
            },
            prepareOpts: function () {
              var a = this.parent.prepareOpts.apply(this, arguments),
                i = this;
              return (
                "select" === a.element.get(0).tagName.toLowerCase()
                  ? (a.initSelection = function (e, t) {
                      var n = e.find("option").filter(function () {
                        return this.selected && !this.disabled;
                      });
                      t(i.optionToData(n));
                    })
                  : "data" in a &&
                    (a.initSelection =
                      a.initSelection ||
                      function (e, t) {
                        var r = e.val(),
                          o = null;
                        a.query({
                          matcher: function (e, t, n) {
                            var i = p(r, a.id(n));
                            return i && (o = n), i;
                          },
                          callback: E.isFunction(t)
                            ? function () {
                                t(o);
                              }
                            : E.noop,
                        });
                      }),
                a
              );
            },
            getPlaceholder: function () {
              return this.select && this.getPlaceholderOption() === w
                ? w
                : this.parent.getPlaceholder.apply(this, arguments);
            },
            setPlaceholder: function () {
              var e = this.getPlaceholder();
              if (this.isPlaceholderOptionSelected() && e !== w) {
                if (this.select && this.getPlaceholderOption() === w) return;
                this.selection
                  .find(".select2-chosen")
                  .html(this.opts.escapeMarkup(e)),
                  this.selection.addClass("select2-default"),
                  this.container.removeClass("select2-allowclear");
              }
            },
            postprocessResults: function (e, t, n) {
              var i = 0,
                r = this;
              if (
                (this.findHighlightableChoices().each2(function (e, t) {
                  if (p(r.id(t.data("select2-data")), r.opts.element.val()))
                    return (i = e), !1;
                }),
                !1 !== n &&
                  (!0 === t && 0 <= i ? this.highlight(i) : this.highlight(0)),
                !0 === t)
              ) {
                var o = this.opts.minimumResultsForSearch;
                0 <= o && this.showSearch(A(e.results) >= o);
              }
            },
            showSearch: function (e) {
              this.showSearchInput !== e &&
                ((this.showSearchInput = e),
                this.dropdown
                  .find(".select2-search")
                  .toggleClass("select2-search-hidden", !e),
                this.dropdown
                  .find(".select2-search")
                  .toggleClass("select2-offscreen", !e),
                E(this.dropdown, this.container).toggleClass(
                  "select2-with-searchbox",
                  e
                ));
            },
            onSelect: function (e, t) {
              if (this.triggerSelect(e)) {
                var n = this.opts.element.val(),
                  i = this.data();
                this.opts.element.val(this.id(e)),
                  this.updateSelection(e),
                  this.opts.element.trigger({
                    type: "select2-selected",
                    val: this.id(e),
                    choice: e,
                  }),
                  (this.lastSearchTerm = this.search.val()),
                  this.close(),
                  (t && t.noFocus) ||
                    !this.opts.shouldFocusInput(this) ||
                    this.focusser.focus(),
                  p(n, this.id(e)) ||
                    this.triggerChange({ added: e, removed: i });
              }
            },
            updateSelection: function (e) {
              var t,
                n,
                i = this.selection.find(".select2-chosen");
              this.selection.data("select2-data", e),
                i.empty(),
                null !== e &&
                  (t = this.opts.formatSelection(e, i, this.opts.escapeMarkup)),
                t !== w && i.append(t),
                (n = this.opts.formatSelectionCssClass(e, i)) !== w &&
                  i.addClass(n),
                this.selection.removeClass("select2-default"),
                this.opts.allowClear &&
                  this.getPlaceholder() !== w &&
                  this.container.addClass("select2-allowclear");
            },
            val: function (e, t) {
              var n,
                i = !1,
                r = null,
                o = this,
                a = this.data();
              if (0 === arguments.length) return this.opts.element.val();
              if (
                ((n = e),
                1 < arguments.length &&
                  ((i = t),
                  this.opts.debug &&
                    console &&
                    console.warn &&
                    console.warn(
                      'Select2: The second option to `select2("val")` is not supported in Select2 4.0.0. The `change` event will always be triggered in 4.0.0.'
                    )),
                this.select)
              )
                this.opts.debug &&
                  console &&
                  console.warn &&
                  console.warn(
                    'Select2: Setting the value on a <select> using `select2("val")` is no longer supported in 4.0.0. You can use the `.val(newValue).trigger("change")` method provided by jQuery instead.'
                  ),
                  this.select
                    .val(n)
                    .find("option")
                    .filter(function () {
                      return this.selected;
                    })
                    .each2(function (e, t) {
                      return (r = o.optionToData(t)), !1;
                    }),
                  this.updateSelection(r),
                  this.setPlaceholder(),
                  i && this.triggerChange({ added: r, removed: a });
              else {
                if (!n && 0 !== n) return void this.clear(i);
                if (this.opts.initSelection === w)
                  throw new Error(
                    "cannot call val() if initSelection() is not defined"
                  );
                this.opts.element.val(n),
                  this.opts.initSelection(this.opts.element, function (e) {
                    o.opts.element.val(e ? o.id(e) : ""),
                      o.updateSelection(e),
                      o.setPlaceholder(),
                      i && o.triggerChange({ added: e, removed: a });
                  });
              }
            },
            clearSearch: function () {
              this.search.val(""), this.focusser.val("");
            },
            data: function (e, t) {
              var n,
                i = !1;
              if (0 === arguments.length)
                return (
                  (n = this.selection.data("select2-data")) == w && (n = null),
                  n
                );
              this.opts.debug &&
                console &&
                console.warn &&
                console.warn(
                  'Select2: The `select2("data")` method can no longer set selected values in 4.0.0, consider using the `.val()` method instead.'
                ),
                1 < arguments.length && (i = t),
                e
                  ? ((n = this.data()),
                    this.opts.element.val(e ? this.id(e) : ""),
                    this.updateSelection(e),
                    i && this.triggerChange({ added: e, removed: n }))
                  : this.clear(i);
            },
          }
        )),
        (P = N(j, {
          createContainer: function () {
            return E(document.createElement("div"))
              .attr({ class: "select2-container select2-container-multi" })
              .html(
                [
                  "<ul class='select2-choices'>",
                  "  <li class='select2-search-field'>",
                  "    <label for='' class='select2-offscreen'></label>",
                  "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>",
                  "  </li>",
                  "</ul>",
                  "<div class='select2-drop select2-drop-multi select2-display-none'>",
                  "   <ul class='select2-results'>",
                  "   </ul>",
                  "</div>",
                ].join("")
              );
          },
          prepareOpts: function () {
            var l = this.parent.prepareOpts.apply(this, arguments),
              i = this;
            return (
              "select" === l.element.get(0).tagName.toLowerCase()
                ? (l.initSelection = function (e, t) {
                    var n = [];
                    e
                      .find("option")
                      .filter(function () {
                        return this.selected && !this.disabled;
                      })
                      .each2(function (e, t) {
                        n.push(i.optionToData(t));
                      }),
                      t(n);
                  })
                : "data" in l &&
                  (l.initSelection =
                    l.initSelection ||
                    function (e, o) {
                      var a = c(e.val(), l.separator, l.transformVal),
                        s = [];
                      l.query({
                        matcher: function (e, t, n) {
                          var i = E.grep(a, function (e) {
                            return p(e, l.id(n));
                          }).length;
                          return i && s.push(n), i;
                        },
                        callback: E.isFunction(o)
                          ? function () {
                              for (var e = [], t = 0; t < a.length; t++)
                                for (var n = a[t], i = 0; i < s.length; i++) {
                                  var r = s[i];
                                  if (p(n, l.id(r))) {
                                    e.push(r), s.splice(i, 1);
                                    break;
                                  }
                                }
                              o(e);
                            }
                          : E.noop,
                      });
                    }),
              l
            );
          },
          selectChoice: function (e) {
            var t = this.container.find(".select2-search-choice-focus");
            (t.length && e && e[0] == t[0]) ||
              (t.length && this.opts.element.trigger("choice-deselected", t),
              t.removeClass("select2-search-choice-focus"),
              e &&
                e.length &&
                (this.close(),
                e.addClass("select2-search-choice-focus"),
                this.opts.element.trigger("choice-selected", e)));
          },
          destroy: function () {
            E("label[for='" + this.search.attr("id") + "']").attr(
              "for",
              this.opts.element.attr("id")
            ),
              this.parent.destroy.apply(this, arguments),
              r.call(this, "searchContainer", "selection");
          },
          initContainer: function () {
            var a,
              e = ".select2-choices";
            (this.searchContainer = this.container.find(
              ".select2-search-field"
            )),
              (this.selection = a = this.container.find(e));
            var t = this;
            this.selection.on(
              "click",
              ".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)",
              function () {
                t.search[0].focus(), t.selectChoice(E(this));
              }
            ),
              this.search.attr("id", "s2id_autogen" + L()),
              this.search
                .prev()
                .text(
                  E("label[for='" + this.opts.element.attr("id") + "']").text()
                )
                .attr("for", this.search.attr("id")),
              this.opts.element.on(
                "focus.select2",
                this.bind(function () {
                  this.focus();
                })
              ),
              this.search.on(
                "input paste",
                this.bind(function () {
                  (this.search.attr("placeholder") &&
                    0 == this.search.val().length) ||
                    (this.isInterfaceEnabled() &&
                      (this.opened() || this.open()));
                })
              ),
              this.search.attr("tabindex", this.elementTabIndex),
              (this.keydowns = 0),
              this.search.on(
                "keydown",
                this.bind(function (e) {
                  if (this.isInterfaceEnabled()) {
                    ++this.keydowns;
                    var t = a.find(".select2-search-choice-focus"),
                      n = t.prev(".select2-search-choice:not(.select2-locked)"),
                      i = t.next(".select2-search-choice:not(.select2-locked)"),
                      r = m(this.search);
                    if (
                      t.length &&
                      (e.which == M.LEFT ||
                        e.which == M.RIGHT ||
                        e.which == M.BACKSPACE ||
                        e.which == M.DELETE ||
                        e.which == M.ENTER)
                    ) {
                      var o = t;
                      return (
                        e.which == M.LEFT && n.length
                          ? (o = n)
                          : e.which == M.RIGHT
                          ? (o = i.length ? i : null)
                          : e.which === M.BACKSPACE
                          ? this.unselect(t.first()) &&
                            (this.search.width(10), (o = n.length ? n : i))
                          : e.which == M.DELETE
                          ? this.unselect(t.first()) &&
                            (this.search.width(10), (o = i.length ? i : null))
                          : e.which == M.ENTER && (o = null),
                        this.selectChoice(o),
                        g(e),
                        void ((o && o.length) || this.open())
                      );
                    }
                    if (
                      ((e.which === M.BACKSPACE && 1 == this.keydowns) ||
                        e.which == M.LEFT) &&
                      0 == r.offset &&
                      !r.length
                    )
                      return (
                        this.selectChoice(
                          a
                            .find(".select2-search-choice:not(.select2-locked)")
                            .last()
                        ),
                        void g(e)
                      );
                    if ((this.selectChoice(null), this.opened()))
                      switch (e.which) {
                        case M.UP:
                        case M.DOWN:
                          return (
                            this.moveHighlight(e.which === M.UP ? -1 : 1),
                            void g(e)
                          );
                        case M.ENTER:
                          return this.selectHighlighted(), void g(e);
                        case M.TAB:
                          return (
                            this.selectHighlighted({ noFocus: !0 }),
                            void this.close()
                          );
                        case M.ESC:
                          return this.cancel(e), void g(e);
                      }
                    if (
                      e.which !== M.TAB &&
                      !M.isControl(e) &&
                      !M.isFunctionKey(e) &&
                      e.which !== M.BACKSPACE &&
                      e.which !== M.ESC
                    ) {
                      if (e.which === M.ENTER) {
                        if (!1 === this.opts.openOnEnter) return;
                        if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)
                          return;
                      }
                      this.open(),
                        (e.which !== M.PAGE_UP && e.which !== M.PAGE_DOWN) ||
                          g(e),
                        e.which === M.ENTER && g(e);
                    }
                  }
                })
              ),
              this.search.on(
                "keyup",
                this.bind(function () {
                  (this.keydowns = 0), this.resizeSearch();
                })
              ),
              this.search.on(
                "blur",
                this.bind(function (e) {
                  this.container.removeClass("select2-container-active"),
                    this.search.removeClass("select2-focused"),
                    this.selectChoice(null),
                    this.opened() || this.clearSearch(),
                    e.stopImmediatePropagation(),
                    this.opts.element.trigger(E.Event("select2-blur"));
                })
              ),
              this.container.on(
                "click",
                e,
                this.bind(function (e) {
                  this.isInterfaceEnabled() &&
                    (0 < E(e.target).closest(".select2-search-choice").length ||
                      (this.selectChoice(null),
                      this.clearPlaceholder(),
                      this.container.hasClass("select2-container-active") ||
                        this.opts.element.trigger(E.Event("select2-focus")),
                      this.open(),
                      this.focusSearch(),
                      e.preventDefault()));
                })
              ),
              this.container.on(
                "focus",
                e,
                this.bind(function () {
                  this.isInterfaceEnabled() &&
                    (this.container.hasClass("select2-container-active") ||
                      this.opts.element.trigger(E.Event("select2-focus")),
                    this.container.addClass("select2-container-active"),
                    this.dropdown.addClass("select2-drop-active"),
                    this.clearPlaceholder());
                })
              ),
              this.initContainerWidth(),
              this.opts.element.hide(),
              this.clearSearch();
          },
          enableInterface: function () {
            this.parent.enableInterface.apply(this, arguments) &&
              this.search.prop("disabled", !this.isInterfaceEnabled());
          },
          initSelection: function () {
            if (
              ("" === this.opts.element.val() &&
                "" === this.opts.element.text() &&
                (this.updateSelection([]), this.close(), this.clearSearch()),
              this.select || "" !== this.opts.element.val())
            ) {
              var t = this;
              this.opts.initSelection.call(
                null,
                this.opts.element,
                function (e) {
                  e !== w &&
                    null !== e &&
                    (t.updateSelection(e), t.close(), t.clearSearch());
                }
              );
            }
          },
          clearSearch: function () {
            var e = this.getPlaceholder(),
              t = this.getMaxSearchWidth();
            e !== w &&
            0 === this.getVal().length &&
            !1 === this.search.hasClass("select2-focused")
              ? (this.search.val(e).addClass("select2-default"),
                this.search.width(0 < t ? t : this.container.css("width")))
              : this.search.val("").width(10);
          },
          clearPlaceholder: function () {
            this.search.hasClass("select2-default") &&
              this.search.val("").removeClass("select2-default");
          },
          opening: function () {
            this.clearPlaceholder(),
              this.resizeSearch(),
              this.parent.opening.apply(this, arguments),
              this.focusSearch(),
              this.prefillNextSearchTerm(),
              this.updateResults(!0),
              this.opts.shouldFocusInput(this) && this.search.focus(),
              this.opts.element.trigger(E.Event("select2-open"));
          },
          close: function () {
            this.opened() && this.parent.close.apply(this, arguments);
          },
          focus: function () {
            this.close(), this.search.focus();
          },
          isFocused: function () {
            return this.search.hasClass("select2-focused");
          },
          updateSelection: function (e) {
            var t = {},
              n = [],
              i = this;
            E(e).each(function () {
              i.id(this) in t || ((t[i.id(this)] = 0), n.push(this));
            }),
              this.selection.find(".select2-search-choice").remove(),
              this.addSelectedChoice(n),
              i.postprocessResults();
          },
          tokenize: function () {
            var e = this.search.val();
            null !=
              (e = this.opts.tokenizer.call(
                this,
                e,
                this.data(),
                this.bind(this.onSelect),
                this.opts
              )) &&
              e != w &&
              (this.search.val(e), 0 < e.length && this.open());
          },
          onSelect: function (e, t) {
            this.triggerSelect(e) &&
              "" !== e.text &&
              (this.addSelectedChoice(e),
              this.opts.element.trigger({
                type: "selected",
                val: this.id(e),
                choice: e,
              }),
              (this.lastSearchTerm = this.search.val()),
              this.clearSearch(),
              this.updateResults(),
              (!this.select && this.opts.closeOnSelect) ||
                this.postprocessResults(e, !1, !0 === this.opts.closeOnSelect),
              this.opts.closeOnSelect
                ? (this.close(), this.search.width(10))
                : 0 < this.countSelectableResults()
                ? (this.search.width(10),
                  this.resizeSearch(),
                  0 < this.getMaximumSelectionSize() &&
                  this.val().length >= this.getMaximumSelectionSize()
                    ? this.updateResults(!0)
                    : this.prefillNextSearchTerm() && this.updateResults(),
                  this.positionDropdown())
                : (this.close(), this.search.width(10)),
              this.triggerChange({ added: e }),
              (t && t.noFocus) || this.focusSearch());
          },
          cancel: function () {
            this.close(), this.focusSearch();
          },
          addSelectedChoice: function (e) {
            var t = this.getVal(),
              n = this;
            E(e).each(function () {
              t.push(n.createChoice(this));
            }),
              this.setVal(t);
          },
          createChoice: function (e) {
            var t,
              n,
              i = !e.locked,
              r = E(
                "<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"
              ),
              o = E(
                "<li class='select2-search-choice select2-locked'><div></div></li>"
              ),
              a = i ? r : o,
              s = this.id(e);
            return (
              (t = this.opts.formatSelection(
                e,
                a.find("div"),
                this.opts.escapeMarkup
              )) != w && a.find("div").replaceWith(E("<div></div>").html(t)),
              (n = this.opts.formatSelectionCssClass(e, a.find("div"))) != w &&
                a.addClass(n),
              i &&
                a
                  .find(".select2-search-choice-close")
                  .on("mousedown", g)
                  .on(
                    "click dblclick",
                    this.bind(function (e) {
                      this.isInterfaceEnabled() &&
                        (this.unselect(E(e.target)),
                        this.selection
                          .find(".select2-search-choice-focus")
                          .removeClass("select2-search-choice-focus"),
                        g(e),
                        this.close(),
                        this.focusSearch());
                    })
                  )
                  .on(
                    "focus",
                    this.bind(function () {
                      this.isInterfaceEnabled() &&
                        (this.container.addClass("select2-container-active"),
                        this.dropdown.addClass("select2-drop-active"));
                    })
                  ),
              a.data("select2-data", e),
              a.insertBefore(this.searchContainer),
              s
            );
          },
          unselect: function (e) {
            var t,
              n,
              i = this.getVal();
            if (0 === (e = e.closest(".select2-search-choice")).length)
              throw (
                "Invalid argument: " + e + ". Must be .select2-search-choice"
              );
            if ((t = e.data("select2-data"))) {
              var r = E.Event("select2-removing");
              if (
                ((r.val = this.id(t)),
                (r.choice = t),
                this.opts.element.trigger(r),
                r.isDefaultPrevented())
              )
                return !1;
              for (; 0 <= (n = u(this.id(t), i)); )
                i.splice(n, 1),
                  this.setVal(i),
                  this.select && this.postprocessResults();
              return (
                e.remove(),
                this.opts.element.trigger({
                  type: "select2-removed",
                  val: this.id(t),
                  choice: t,
                }),
                this.triggerChange({ removed: t }),
                !0
              );
            }
          },
          postprocessResults: function (e, t, n) {
            var i = this.getVal(),
              r = this.results.find(".select2-result"),
              o = this.results.find(".select2-result-with-children"),
              a = this;
            r.each2(function (e, t) {
              0 <= u(a.id(t.data("select2-data")), i) &&
                (t.addClass("select2-selected"),
                t
                  .find(".select2-result-selectable")
                  .addClass("select2-selected"));
            }),
              o.each2(function (e, t) {
                t.is(".select2-result-selectable") ||
                  0 !==
                    t.find(".select2-result-selectable:not(.select2-selected)")
                      .length ||
                  t.addClass("select2-selected");
              }),
              -1 == this.highlight() &&
                !1 !== n &&
                !0 === this.opts.closeOnSelect &&
                a.highlight(0),
              !this.opts.createSearchChoice &&
                0 <
                  !r.filter(".select2-result:not(.select2-selected)").length &&
                (!e ||
                  (e &&
                    !e.more &&
                    0 === this.results.find(".select2-no-results").length)) &&
                k(a.opts.formatNoMatches, "formatNoMatches") &&
                this.results.append(
                  "<li class='select2-no-results'>" +
                    T(a.opts.formatNoMatches, a.opts.element, a.search.val()) +
                    "</li>"
                );
          },
          getMaxSearchWidth: function () {
            return this.selection.width() - o(this.search);
          },
          resizeSearch: function () {
            var e,
              t,
              n,
              i,
              r = o(this.search);
            (e = y(this.search) + 10),
              (t = this.search.offset().left),
              (i =
                (n = this.selection.width()) -
                (t - this.selection.offset().left) -
                r) < e && (i = n - r),
              i < 40 && (i = n - r),
              i <= 0 && (i = e),
              this.search.width(Math.floor(i));
          },
          getVal: function () {
            var e;
            return this.select
              ? null === (e = this.select.val())
                ? []
                : e
              : c(
                  (e = this.opts.element.val()),
                  this.opts.separator,
                  this.opts.transformVal
                );
          },
          setVal: function (e) {
            if (this.select) this.select.val(e);
            else {
              var t = [],
                n = {};
              E(e).each(function () {
                this in n || (t.push(this), (n[this] = 0));
              }),
                this.opts.element.val(
                  0 === t.length ? "" : t.join(this.opts.separator)
                );
            }
          },
          buildChangeDetails: function (e, t) {
            (t = t.slice(0)), (e = e.slice(0));
            for (var n = 0; n < t.length; n++)
              for (var i = 0; i < e.length; i++)
                if (p(this.opts.id(t[n]), this.opts.id(e[i]))) {
                  t.splice(n, 1), n--, e.splice(i, 1);
                  break;
                }
            return { added: t, removed: e };
          },
          val: function (e, n) {
            var i,
              r = this;
            if (0 === arguments.length) return this.getVal();
            if (((i = this.data()).length || (i = []), !e && 0 !== e))
              return (
                this.opts.element.val(""),
                this.updateSelection([]),
                this.clearSearch(),
                void (
                  n && this.triggerChange({ added: this.data(), removed: i })
                )
              );
            if ((this.setVal(e), this.select))
              this.opts.initSelection(
                this.select,
                this.bind(this.updateSelection)
              ),
                n &&
                  this.triggerChange(this.buildChangeDetails(i, this.data()));
            else {
              if (this.opts.initSelection === w)
                throw new Error(
                  "val() cannot be called if initSelection() is not defined"
                );
              this.opts.initSelection(this.opts.element, function (e) {
                var t = E.map(e, r.id);
                r.setVal(t),
                  r.updateSelection(e),
                  r.clearSearch(),
                  n && r.triggerChange(r.buildChangeDetails(i, r.data()));
              });
            }
            this.clearSearch();
          },
          onSortStart: function () {
            if (this.select)
              throw new Error(
                "Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead."
              );
            this.search.width(0), this.searchContainer.hide();
          },
          onSortEnd: function () {
            var e = [],
              t = this;
            this.searchContainer.show(),
              this.searchContainer.appendTo(this.searchContainer.parent()),
              this.resizeSearch(),
              this.selection.find(".select2-search-choice").each(function () {
                e.push(t.opts.id(E(this).data("select2-data")));
              }),
              this.setVal(e),
              this.triggerChange();
          },
          data: function (e, t) {
            var n,
              i,
              r = this;
            if (0 === arguments.length)
              return this.selection
                .children(".select2-search-choice")
                .map(function () {
                  return E(this).data("select2-data");
                })
                .get();
            (i = this.data()),
              e || (e = []),
              (n = E.map(e, function (e) {
                return r.opts.id(e);
              })),
              this.setVal(n),
              this.updateSelection(e),
              this.clearSearch(),
              t && this.triggerChange(this.buildChangeDetails(i, this.data()));
          },
        })),
        (E.fn.select2 = function () {
          var e,
            t,
            n,
            i,
            r,
            o = Array.prototype.slice.call(arguments, 0),
            a = [
              "val",
              "destroy",
              "opened",
              "open",
              "close",
              "focus",
              "isFocused",
              "container",
              "dropdown",
              "onSortStart",
              "onSortEnd",
              "enable",
              "disable",
              "readonly",
              "positionDropdown",
              "data",
              "search",
            ],
            s = ["opened", "isFocused", "container", "dropdown"],
            l = ["val", "data"],
            c = { search: "externalSearch" };
          return (
            this.each(function () {
              if (0 === o.length || "object" == typeof o[0])
                ((e = 0 === o.length ? {} : E.extend({}, o[0])).element =
                  E(this)),
                  "select" === e.element.get(0).tagName.toLowerCase()
                    ? (r = e.element.prop("multiple"))
                    : ((r = e.multiple || !1),
                      "tags" in e && (e.multiple = r = !0)),
                  (t = r
                    ? new window.Select2["class"].multi()
                    : new window.Select2["class"].single()).init(e);
              else {
                if ("string" != typeof o[0])
                  throw "Invalid arguments to select2 plugin: " + o;
                if (u(o[0], a) < 0) throw "Unknown method: " + o[0];
                if (((i = w), (t = E(this).data("select2")) === w)) return;
                if (
                  ("container" === (n = o[0])
                    ? (i = t.container)
                    : "dropdown" === n
                    ? (i = t.dropdown)
                    : (c[n] && (n = c[n]), (i = t[n].apply(t, o.slice(1)))),
                  0 <= u(o[0], s) || (0 <= u(o[0], l) && 1 == o.length))
                )
                  return !1;
              }
            }),
            i === w ? this : i
          );
        }),
        (E.fn.select2.defaults = {
          debug: !1,
          width: "copy",
          loadMorePadding: 0,
          closeOnSelect: !0,
          openOnEnter: !0,
          containerCss: {},
          dropdownCss: {},
          containerCssClass: "",
          dropdownCssClass: "",
          formatResult: function (e, t, n, i) {
            var r = [];
            return x(this.text(e), n.term, r, i), r.join("");
          },
          transformVal: function (e) {
            return E.trim(e);
          },
          formatSelection: function (e, t, n) {
            return e ? n(this.text(e)) : w;
          },
          sortResults: function (e) {
            return e;
          },
          formatResultCssClass: function (e) {
            return e.css;
          },
          formatSelectionCssClass: function () {
            return w;
          },
          minimumResultsForSearch: 0,
          minimumInputLength: 0,
          maximumInputLength: null,
          maximumSelectionSize: 0,
          id: function (e) {
            return e == w ? null : e.id;
          },
          text: function (e) {
            return e && this.data && this.data.text
              ? E.isFunction(this.data.text)
                ? this.data.text(e)
                : e[this.data.text]
              : e.text;
          },
          matcher: function (e, t) {
            return (
              0 <=
              s("" + t)
                .toUpperCase()
                .indexOf(s("" + e).toUpperCase())
            );
          },
          separator: ",",
          tokenSeparators: [],
          tokenizer: n,
          escapeMarkup: t,
          blurOnChange: !1,
          selectOnBlur: !1,
          adaptContainerCssClass: function (e) {
            return e;
          },
          adaptDropdownCssClass: function () {
            return null;
          },
          nextSearchTerm: function () {
            return w;
          },
          searchInputPlaceholder: "",
          createSearchChoicePosition: "top",
          shouldFocusInput: function (e) {
            return (
              !("ontouchstart" in window || 0 < navigator.msMaxTouchPoints) ||
              !(e.opts.minimumResultsForSearch < 0)
            );
          },
        }),
        (E.fn.select2.locales = []),
        (E.fn.select2.locales.en = {
          formatMatches: function (e) {
            return 1 === e
              ? "One result is available, press enter to select it."
              : e +
                  " results are available, use up and down arrow keys to navigate.";
          },
          formatNoMatches: function () {
            return "No matches found";
          },
          formatAjaxError: function () {
            return "Loading failed";
          },
          formatInputTooShort: function (e, t) {
            var n = t - e.length;
            return (
              "Please enter " + n + " or more character" + (1 == n ? "" : "s")
            );
          },
          formatInputTooLong: function (e, t) {
            var n = e.length - t;
            return "Please delete " + n + " character" + (1 == n ? "" : "s");
          },
          formatSelectionTooBig: function (e) {
            return "You can only select " + e + " item" + (1 == e ? "" : "s");
          },
          formatLoadMore: function () {
            return "Loading more results\u2026";
          },
          formatSearching: function () {
            return "Searching\u2026";
          },
        }),
        E.extend(E.fn.select2.defaults, E.fn.select2.locales.en),
        (E.fn.select2.ajaxDefaults = {
          transport: E.ajax,
          params: { type: "GET", cache: !1, dataType: "json" },
        }),
        (window.Select2 = {
          query: { ajax: _, local: S, tags: C },
          util: {
            debounce: i,
            markMatch: x,
            escapeMarkup: t,
            stripDiacritics: s,
          },
          class: { abstract: j, single: D, multi: P },
        });
    }
  })(jQuery),
  function () {
    null == window.Grnhse && (window.Grnhse = {});
  }.call(this),
  function () {
    Grnhse.BrowserHelper = {
      supportsPostMessage: function () {
        return !(document.all && !window.atob);
      },
    };
  }.call(this),
  $(document).on("GH:MetadataReady", function () {
    function e(e) {
      var n = {};
      return (
        e.forEach(function (e) {
          var t = e.replace(/\s/g, "");
          n[t] = {
            LoadingAttachment: i.t("job_post.loading_attachment", {
              uploader: e,
            }),
            WithoutBrowserSupport: i.t("job_post.without_browser_support", {
              uploader: e,
            }),
            TryAgain: i.t("job_post.file_uploader_timeout", { uploader: e }),
          };
        }),
        n
      );
    }
    if (Polyglot.translation) {
      var i = new Polyglot({ phrases: Polyglot.translation }),
        t = ["Dropbox", "Google Drive"];
      Message = {
        Common: {
          Validation: {
            AtLeastOneRequired: i.t("validation.at_least_one_required"),
            AttachmentRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.attachment"),
            }),
            CompanyNameRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.company_name"),
            }),
            ConsentRequired: i.t("validation.consent_is_required"),
            CoverLetterRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.cover_letter"),
            }),
            DegreeRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.degree"),
            }),
            DemographicQuestionRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.question"),
            }),
            DisciplineRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.discipline"),
            }),
            EducationMonthFormat: i.t("validation.month_format"),
            EducationYearFormat: i.t("validation.year_format"),
            EmailAlternativeSuggestion: i.t("validation.did_you_mean"),
            EmailRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.email"),
            }),
            EmptyAttachment: i.t("validation.empty_attachment"),
            FirstNameRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.first_name"),
            }),
            FieldRequired: i.t("validation.this_field_is_required"),
            InvalidDate: i.t("validation.invalid_date"),
            InvalidEmailAddress: i.t("validation.invalid_email"),
            InvalidLocation: i.t("validation.invalid_location"),
            InvalidName: i.t("validation.invalid_field", {
              field: i.t("job_post.name"),
            }),
            InvalidPhone: i.t("validation.invalid_field", {
              field: i.t("job_post.phone"),
            }),
            LastNameRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.last_name"),
            }),
            PhoneRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.phone"),
            }),
            ResumeRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.resume"),
            }),
            SchoolNameRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.school_name"),
            }),
            TitleRequired: i.t("validation.field_is_required", {
              field: i.t("job_post.title"),
            }),
          },
          LocateMe: i.t("job_post.locate_me"),
        },
        Uploaders: e(t),
        Captcha: {
          FailedToLoad: i.t("captcha.failed_to_load"),
          GeetestFailedToLoad: i.t("captcha.geetest_failed_to_load"),
        },
      };
    }
  }),
  ((JBEN = JBEN || {}).BackgroundField = {
    hideRemoveButton: function (e) {
      e.find(".remove-background-field").addClass("hidden");
    },
    remove: function (t) {
      return function (e) {
        e.preventDefault(),
          t.remove(),
          $(document).trigger("greenhouse.jobApplication.heightReduced");
      };
    },
    changeFocusBetweenMonthAndYear: function (r, o) {
      return function (e) {
        var t = r.val().length === Number(r.attr("maxlength")),
          n = "" === o.val(),
          i = 48 <= e.keyCode && e.keyCode <= 57;
        t && n && i && o.focus();
      };
    },
  }),
  ((JBEN = JBEN || {}).Education = {
    index: 0,
    init: function () {
      $("#add_education").on("click", function (e) {
        e.preventDefault(), JBEN.Education.add({ focus: !0 });
      }),
        this.add({ hideRemoveButton: !0 });
    },
    add: function (e) {
      var t = $(".education-template")
        .clone()
        .removeClass("education-template hidden");
      $("#education_section").append(t),
        this.initEducationFields(t),
        e && e.hideRemoveButton && JBEN.BackgroundField.hideRemoveButton(t),
        $(document).trigger("greenhouse.jobApplication.heightExpanded"),
        e && e.focus && t.find("input, select").first().focus();
    },
    initEducationFields: function (e) {
      var t = e,
        n = t.find(".school-name"),
        i = t.find(".degree"),
        r = t.find(".discipline"),
        o = t.find(".remove-background-field"),
        a = t.find(".start-date-month"),
        s = t.find(".start-date-year"),
        l = t.find(".end-date-month"),
        c = t.find(".end-date-year");
      Util.setIdsOnAllElements(e, this.index++),
        n.select2({
          width: "60%",
          ajax: {
            url: n.data("url"),
            dataType: "json",
            quietMillis: 250,
            data: function (e, t) {
              return { term: e, page: t };
            },
            results: function (e, t) {
              var n = t * e.meta.per_page < e.meta.total_count;
              return { results: e.items, more: n };
            },
          },
          allowClear: !0,
        }),
        i.select2({
          minimumResultsForSearch: 10,
          width: "60%",
          allowClear: !0,
        }),
        r.select2({
          minimumResultsForSearch: 10,
          width: "60%",
          allowClear: !0,
        }),
        Util.addAriaToSelect2(t.find(".school-name, .degree, .discipline"), !1),
        t
          .find("input.select2-offscreen")
          .attr("aria-describedby", "education_instructions"),
        o.on("click", JBEN.BackgroundField.remove(t)),
        a.on(
          "keyup",
          JBEN.BackgroundField.changeFocusBetweenMonthAndYear(a, s)
        ),
        l.on(
          "keyup",
          JBEN.BackgroundField.changeFocusBetweenMonthAndYear(l, c)
        );
    },
  }),
  ((JBEN = JBEN || {}).Employment = {
    index: 0,
    init: function () {
      $("#add_employment").on("click", function (e) {
        e.preventDefault(), JBEN.Employment.add({ focus: !0 });
      }),
        this.add({ hideRemoveButton: !0 });
    },
    add: function (e) {
      var t = $(".employment-template")
        .clone()
        .removeClass("employment-template hidden");
      this.initEmploymentFields(t),
        $("#employment_section").append(t),
        e && e.hideRemoveButton && JBEN.BackgroundField.hideRemoveButton(t),
        $(document).trigger("greenhouse.jobApplication.heightExpanded"),
        e && e.focus && t.find("input, select").first().focus();
    },
    initEmploymentFields: function (e) {
      var t = e.find(".remove-background-field"),
        n = e.find(".start-date-month"),
        i = e.find(".start-date-year"),
        r = e.find(".end-date-month"),
        o = e.find(".end-date-year"),
        a = e.find(".current");
      Util.setIdsOnLabelsAndInputs(e, this.index++),
        t.on("click", JBEN.BackgroundField.remove(e)),
        n.on(
          "keyup",
          JBEN.BackgroundField.changeFocusBetweenMonthAndYear(n, i)
        ),
        r.on(
          "keyup",
          JBEN.BackgroundField.changeFocusBetweenMonthAndYear(r, o)
        ),
        a.on("change", JBEN.Employment.toggleEndDate(e));
    },
    toggleEndDate: function (t) {
      return function (e) {
        e.preventDefault(),
          t
            .find(".end-date-month, .end-date-year")
            .val("")
            .toggleClass("ignore")
            .toggle();
      };
    },
  });
var Validate = {
    ERROR_TEMPLATE: Handlebars.compile(
      '<div class="field-error-msg" id={{id}}><img src={{errorIconSrc}} alt="Error" class="error-icon"/>{{msg}}</div>'
    ),
    alphanumeric: function (e) {
      return /^[a-zA-Z0-9]+$/.test(e);
    },
    wordCharacter: function (e) {
      return /^\w+$/.test(e);
    },
    checked: function () {
      return $(this.selector).is(":checked");
    },
    numeric: function (e) {
      return /^[0-9]+$/.test(e);
    },
    decimal: function (e) {
      return /^-?(([0-9]+)|(\.[0-9]+)|([0-9]+\.[0-9]+))$/.test(e);
    },
    notEmpty: function (e) {
      return null !== e && 0 < $.trim(e).length;
    },
    notBlank: function (e) {
      return 0 < $.trim(e).length;
    },
    validLocation: function () {
      return !!$("#job_application_location").data("valid");
    },
    email: function (e) {
      var t =
        /^([a-zA-Z0-9_\.\-\+'])*[\w+]\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if ("" === e || t.test(e)) return !0;
      var n = /^.+<(.+)>$/.exec(e);
      return !(!n || !t.test(n[1]));
    },
    multipleEmails: function (e) {
      var t = e.split(/\s*,\s*/);
      return _.all(t, Validate.email);
    },
    emailOrMyEmailAddressToken: function (e) {
      return Validate.email(e) || "{{MY_EMAIL_ADDRESS}}" === e;
    },
    emailDomain: function (e) {
      return e.indexOf("@") < 0;
    },
    twitterHandle: function (e) {
      return /@([A-Za-z0-9_]+)/.test(e);
    },
    fileFormat: function (e) {
      return /\.(pdf|doc|docx|txt|rtf)$/i.test(e);
    },
    specificFileFormat: function (n) {
      return function (e) {
        var t = n instanceof Array ? n : [n];
        return new RegExp("\\.(" + t.join("|") + ")$", "i").test(e);
      };
    },
    imageFormat: function (e) {
      return /\.(png|jpg|jpeg|gif)$/i.test(e);
    },
    url: function (e) {
      return /^(http:\/\/|https:\/\/)?[0-9a-z\-]+\.[0-9a-z\.\-]+(\/.*)?$/i.test(
        e
      );
    },
    notUrl: function (e) {
      return !/(^|\S*)([a-z]+:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}/i.test(e);
    },
    httpsUrl: function (e) {
      return /^https:\/\/[0-9a-z\-]+\.[0-9a-z\.\-]+(\/.*)?$/i.test(e);
    },
    urlOrTwitterHandle: function (e) {
      return Validate.url(e) || Validate.twitterHandle(e);
    },
    minLength: function (t) {
      return function (e) {
        return "string" == typeof e && e.length >= t;
      };
    },
    maxLength: function (t) {
      return function (e) {
        return "string" == typeof e && e.length <= t;
      };
    },
    arrayMinLength: function (t) {
      return function (e) {
        return null !== e && e.length >= t;
      };
    },
    arrayMaxLength: function (t) {
      return function (e) {
        return null === e || e.length <= t;
      };
    },
    matches: function (t) {
      return function (e) {
        return e === t;
      };
    },
    matchesRegex: function (t) {
      return function (e) {
        return null !== e.match(t);
      };
    },
    doesNotMatchRegex: function (t) {
      return function (e) {
        return null === e.match(t);
      };
    },
    greaterThan: function (t) {
      return function (e) {
        return parseInt(e, 10) > parseInt(t, 10);
      };
    },
    notPresentIn: function (t, n) {
      return function (e) {
        return (
          n &&
            (t &&
              (t = $.map(t, function (e) {
                return e.toLowerCase();
              })),
            e && (e = e.toLowerCase())),
          -1 == $.inArray(e, t)
        );
      };
    },
    atLeastOneChecked: function (e) {
      return _.reduce(
        $('input[aria-required="true"][set=' + e + "]"),
        function (e, t) {
          return e || $(t).is(":checked");
        },
        !1
      );
    },
    requiredDemographicQuestions: function (t) {
      function e() {
        var e = t.find(".free-form-text input[type=text]"),
          i = 0 < e.length && 0 < e[0].value.length;
        return _.reduce(
          t.find("input[type=" + r + "]:not(.decline-answer-" + r + ")"),
          function (e, t) {
            var n = $(t).hasClass("free-form-" + r);
            return e || ($(t).is(":checked") && (!n || i));
          },
          !1
        );
      }
      var r = "checkbox",
        n = t.find(".decline-answer-" + r).is(":checked");
      return e() != n;
    },
    emailTemplateWithTokens: function (a, s) {
      return function (e) {
        var t = e.match(/{{[^}]+}}/g) || [],
          n = [],
          i = [],
          r = !0;
        if (
          ($.each(t, function (e, t) {
            Validate.emailTemplateToken(t, a) || n.push(t),
              s && Validate.emailTemplateToken(t, s) && i.push(t);
          }),
          0 !== n.length)
        )
          (this.message =
            "The following placeholders are not valid: " + n.join(", ")),
            (r = !1);
        else if (s && $.unique(i).length !== s.length) {
          var o = _.difference(s, i).join(", ");
          (this.message = "The following placeholders must be used: " + o),
            (r = !1);
        }
        return r;
      };
    },
    emailTemplateToken: function (e, t) {
      return -1 < t.indexOf(e);
    },
    passes: function (e) {
      return function () {
        return e;
      };
    },
    dateFormat: function (e) {
      return (
        !!/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/.test(e) &&
        !("function" == typeof moment && !moment(e).isValid())
      );
    },
    monthFormat: function (e) {
      var t = parseInt(e, 10);
      return isFinite(e) && Validate.inRange(t, 1, 12);
    },
    yearFormat: function (e) {
      var t = parseInt(e, 10);
      return isFinite(e) && Validate.inRange(t, 1900, 2100);
    },
    inRange: function (e, t, n) {
      return t <= e && e <= n;
    },
    field: function (e, t, n, i, r) {
      if (((this.selector = e), r)) {
        var o = $.trim($(e).val());
        $(e).val(o);
      }
      var a = $(e).val(),
        s = (!0 === i && "" === a) || t.call(this, a);
      return s || this.setError(e, n), s;
    },
    fieldWithTrim: function (e, t, n, i) {
      return Validate.field(e, t, n, i, !0);
    },
    setError: function (e, t) {
      var n = $(e).attr("id") + "_error";
      $(e).data("select2")
        ? $(e).select2("container").find("a").addClass("field-error")
        : $(e)
            .addClass("field-error")
            .attr("aria-invalid", "true")
            .attr("aria-describedby", n),
        t &&
          (Message.Common.Validation[t] && (t = Message.Common.Validation[t]),
          $(e)
            .parent()
            .append(
              this.ERROR_TEMPLATE({
                id: n,
                errorIconSrc: errorImageSource,
                msg: t,
              })
            ));
    },
    clearError: function (e) {
      $(e).hasClass("select2-offscreen")
        ? $(e).select2("container").find("a").removeClass("field-error")
        : $(e).removeClass("field-error"),
        $(e).siblings(".field-error-msg").remove();
    },
    isValid: function (e) {
      return _.reduce(
        e,
        function (e, t) {
          return e && t;
        },
        !0
      );
    },
    fail: function () {
      return !1;
    },
    scrollToFirstError: function () {
      var e,
        t = $(".modal-body .scrollable:visible"),
        n = t.find(".field-error:first");
      n.is(".chzn-select, .select2-offscreen") &&
        (n = n.siblings(".chzn-container, .select2-container")),
        0 < t.length && 0 < n.length
          ? ((e = n.offset().top - t.offset().top + t.scrollTop() - 90),
            t.animate({ scrollTop: e }, "fast"))
          : 0 < $(".field-error:first").length &&
            ((e = $(".field-error:first").offset().top - 100),
            $(".field-error:first").focus(),
            $("html, body").animate({ scrollTop: e }, "fast"));
    },
  },
  Validator = (function () {
    function n() {
      (this.validations = []), this.resetFlags();
    }
    (n.prototype.resetFlags = function () {
      (this.allowMissingElement = !1),
        (this.ignoreDisabled = !1),
        (this.allowEmptyVal = !1);
    }),
      (n.prototype.validate = function (e) {
        return (this.selector = e), this;
      }),
      (n.prototype.allowEmpty = function () {
        return (this.allowEmptyVal = !0), this;
      }),
      (n.prototype.whenPresent = function () {
        return (this.allowMissingElement = !0), this;
      }),
      (n.prototype.whenEnabled = function () {
        return (this.ignoreDisabled = !0), this;
      }),
      (n.prototype.withMessage = function (e) {
        return (this.message = e), this;
      }),
      (n.prototype.doValidate = function (e, t) {
        Validate.clearError(this.selector);
        var n = $(this.selector),
          i = n.val(),
          r = 0 === t.length ? e : e.apply(null, t),
          o = !0;
        return (
          0 === n.length
            ? this.allowMissingElement
              ? (o = !0)
              : (Flash.setError(
                  "We're sorry, but there was an error processing this form."
                ),
                console.error(
                  "No elements discovered for selector: '%s'",
                  this.selector
                ),
                (o = !1))
            : (o =
                !(!this.ignoreDisabled || "disabled" !== n.attr("disabled")) ||
                (this.allowEmptyVal && 0 === $.trim(i).length) ||
                r.call(this, i)) ||
              Validate.setError(this.selector, this.message),
          this.validations.push(o),
          (this.message = null),
          this.resetFlags(),
          o
        );
      });
    var e = [
      "ERROR_TEMPLATE",
      "field",
      "setError",
      "clearError",
      "isValid",
      "scrollToFirstError",
    ];
    for (var t in Validate) {
      var i = Validate[t];
      "function" == typeof i &&
        -1 === $.inArray(t, e) &&
        (function (e, t) {
          n.prototype[e] = function () {
            return this.doValidate(t, arguments);
          };
        })(t, i);
    }
    return (
      (n.prototype.isValid = function () {
        return _.reduce(
          this.validations,
          function (e, t) {
            return e && t;
          },
          !0
        );
      }),
      n
    );
  })();
(Grnhse.ContentSecurityPolicyHelper = function (e) {
  function t(e) {
    for (var t, n = window, i = 0; i < e.length; i++)
      (n[(t = e[i])] = n[t] || {}), (n = n[t]);
    return n;
  }
  function n(e, t) {
    if (((t = t || window), a)) (r = Handlebars.compile(r)), (t[e] = r);
    else
      switch (o) {
        case "json":
          t[e] = JSON.parse(r);
          break;
        case "string":
          t[e] = "null" === r ? null : r.toString();
          break;
        case "boolean":
          t[e] = JSON.parse(r);
          break;
        case "number":
          t[e] = parseFloat(r);
          break;
        case "null":
          t[e] = null;
          break;
        default:
          t[e] = r;
      }
  }
  var i = e.getAttribute("data-key"),
    r = e.getAttribute("data-value"),
    o = e.getAttribute("data-type"),
    a = e.getAttribute("data-handlebars");
  this.setObject = function () {
    var e = i.split(".");
    n(e.pop(), t(e));
  };
}),
  (Grnhse.findAndConvertMetadata = function () {
    function e(e, t) {
      for (var n = 0; n < e.length; n++) t(e[n], n);
    }
    function t(e, t) {
      e.classList ? e.classList.add(t) : (e.className += " " + t);
    }
    if ("function" == typeof document.querySelectorAll)
      e(
        document.querySelectorAll(".js-metadata:not(.processed)"),
        function (e) {
          new Grnhse.ContentSecurityPolicyHelper(e).setObject(),
            t(e, "processed");
        }
      );
    else if ("function" == typeof jQuery) {
      $(".js-metadata:not(.processed)").each(function (e, t) {
        new Grnhse.ContentSecurityPolicyHelper(t).setObject(),
          $(t).addClass("processed");
      });
    }
    var n = document.createEvent("Event");
    n.initEvent("GH:MetadataReady", !0, !0), document.dispatchEvent(n);
  }),
  ((JBEN = JBEN || {}).Geetest = function (e, t, n, i) {
    (this.captchaContainer = e),
      (this.onCaptchaLoaded = t),
      (this.onCaptchaCompleted = n),
      (this.displayError = i);
  }),
  (JBEN.Geetest.prototype.init = function () {
    "undefined" != typeof initGeetest
      ? $.get({
          url: JBEN.geetestPath + "?t=" + new Date().getTime(),
          dataType: "json",
          success: this.preProcessSuccess.bind(this),
          error: this.showLoadError.bind(this),
        })
      : this.showLoadError();
  }),
  (JBEN.Geetest.prototype.preProcessSuccess = function (e) {
    initGeetest(
      {
        gt: e.gt,
        challenge: e.challenge,
        new_captcha: !0,
        product: "float",
        width: "100%",
        lang: "en",
        https: !0,
      },
      this.handler.bind(this)
    );
  }),
  (JBEN.Geetest.prototype.handler = function (e) {
    e.appendTo(this.captchaContainer),
      e.onReady(this.onCaptchaLoaded),
      e.onSuccess(this.onCaptchaCompleted);
  }),
  (JBEN.Geetest.prototype.showLoadError = function () {
    this.displayError(Message.Captcha.GeetestFailedToLoad);
  }),
  ((JBEN = JBEN || {}).Recaptcha = function (e, t, n, i) {
    (this.captchaContainer = e),
      (this.onCaptchaLoaded = t),
      (this.onCaptchaCompleted = n),
      (this.displayError = i);
  }),
  (JBEN.Recaptcha.prototype.init = function () {
    "undefined" != typeof grecaptcha
      ? grecaptcha.enterprise
          .execute(JBEN.Recaptcha.publicKey, { action: "apply_to_job" })
          .then(this.onCaptchaCompleted)
      : this.displayError(Message.Captcha.FailedToLoad);
  }),
  ((JBEN = JBEN || {}).Captcha = function (e, t, n, i) {
    (this.captchaContainer = e),
      (this.onCaptchaLoad = t),
      (this.onCaptchaSuccess = n),
      (this.onCaptchaError = i);
  }),
  (JBEN.Captcha.prototype.init = function () {
    new (JBEN.alternateCaptcha ? JBEN.Geetest : JBEN.Recaptcha)(
      this.captchaContainer,
      this.onCaptchaLoad,
      this.onCaptchaSuccess,
      this.showError.bind(this)
    ).init();
  }),
  (JBEN.Captcha.prototype.showError = function (e) {
    this.clearError();
    var t = '<br/><div class="field-error-msg">' + e + "</div>";
    $(this.captchaContainer).append(t), this.onCaptchaError();
  }),
  (JBEN.Captcha.prototype.clearError = function () {
    $(this.captchaContainer).find(".field-error-msg").remove(),
      $(this.captchaContainer).find("br").remove();
  }),
  ((JBEN = JBEN || {}).PublicJobBoard = lib(
    (function () {
      function t() {
        i(), n(), r();
      }
      function n() {
        JBEN.FormControl.attachOrPaste(".attach-or-paste", {
          uploadStarted: u,
          uploadFinished: h,
        }),
          $("#submit_app").validateOn("click", w, x),
          $("#application")
            .find("form")
            .ajaxForm({ dataType: "html", beforeSubmit: c, complete: C }),
          $("#email").on("blur", function () {
            var e = $(this);
            e.val($.trim(e.val())), o(e.val());
          }),
          Util.mobileDevice() ||
            ($("#main.accessible")
              .find("#eeoc_fields select, #custom_fields select")
              .select2({
                width: "element",
                minimumResultsForSearch: -1,
                sorter: function (e) {
                  var t = [];
                  return (
                    $.each(e, function () {
                      this.element[0].hidden || t.push(this);
                    }),
                    t
                  );
                },
              }),
            Util.addAriaToSelect2(
              $('#main.accessible select:not([multiple="multiple"])'),
              !0
            ),
            Util.addAriaToSelect2($("#main.accessible select[multiple]"), !1));
      }
      function i() {
        var e = new Date().toUTCString();
        $("#page_load_time").val(e);
      }
      function r() {
        $("#dev-fields").css("display", "none");
      }
      function o(e) {
        "undefined" != typeof EMAIL_ADDRESS_VALIDATOR_URL &&
          EMAIL_ADDRESS_VALIDATOR_URL &&
          (!e || e.length < 5
            ? l()
            : $.getJSON(EMAIL_ADDRESS_VALIDATOR_URL, { address: e })
                .done(function (e) {
                  e && e.did_you_mean ? s(e.did_you_mean) : l();
                })
                .fail(function () {
                  l();
                }));
      }
      function a(e) {
        $("#email").val(e);
      }
      function s(e) {
        l();
        var t = $('<span class="field-suggestion-copy"></span>').text(
            Message.Common.Validation.EmailAlternativeSuggestion + ":"
          ),
          n = $('<button class="field-suggestion-button"></button>')
            .text(e)
            .click(function () {
              a(e), l();
            }),
          i = $(
            '<div id="email-suggestion" class="field-error-msg field-suggestion"></div>'
          ).append(t, n);
        $("#email").after(i);
      }
      function l() {
        $("#email-suggestion").remove();
      }
      function c() {
        p("Processing..."), g();
      }
      function u() {
        k++, d();
      }
      function h() {
        k--, d();
      }
      function d() {
        0 < k ? p("Attaching File...") : f();
      }
      function p(e) {
        var t = $("#submit_app");
        t.data("original-text") || t.data("original-text", t.val()),
          t.attr("disabled", "disabled").val(e);
      }
      function f() {
        var e = $("#submit_app");
        e.val(e.data("original-text"))
          .removeAttr("disabled")
          .removeData("original-text");
      }
      function m(e) {
        $("#error_message").html(e);
      }
      function g() {
        $("#error_message").empty();
      }
      function v() {
        $(".field-error").removeClass("field-error"),
          $(".field-error-msg").remove(),
          $("[aria-invalid]")
            .removeAttr("aria-invalid")
            .removeAttr("aria-describedby");
      }
      function y() {
        return 0 < $(T).length;
      }
      function b() {
        var e = $(T).find(A);
        return (
          y() && ("true" === e.attr("aria-required") || 0 < e.val().length)
        );
      }
      function w() {
        function r(e, t, n, i) {
          if (0 < $(e).length) {
            var r = Validate.field(e, Validate[t], n, i);
            return c.push(r), r;
          }
        }
        function s(e, t, n, i) {
          return r(e, t, Message.Common.Validation[n], i);
        }
        function i(e, t) {
          return (
            !!$(this).data(t) ||
            _.any(e, function (e) {
              return $(e).not(".ignore") && "" !== $(e).val();
            })
          );
        }
        function o(e) {
          var t = e.find("input.start-date-month"),
            n = e.find("input.end-date-month"),
            i = e.find("input.start-date-year"),
            r = e.find("input.end-date-year"),
            o = 0 < t.length && 0 < t.val().length ? t.val() : 1,
            a = 0 < n.length && 0 < n.val().length ? n.val() : 12,
            s = Date.parse(o + "/1/" + i.val()),
            l = Date.parse(a + "/1/" + r.val());
          0 < i.length &&
            0 < r.length &&
            0 < i.val().length &&
            0 < r.val().length &&
            l < s &&
            (Validate.setError(n, ""),
            Validate.setError(r, "InvalidDate"),
            c.push(!1)),
            0 < t.length &&
              0 < i.length &&
              0 < t.val().length &&
              0 === i.val().length &&
              (Validate.setError(i, "EducationYearFormat"), c.push(!1)),
            0 < n.length &&
              0 < r.length &&
              0 < n.val().length &&
              0 === r.val().length &&
              (Validate.setError(r, "EducationYearFormat"), c.push(!1));
        }
        var c = [],
          e = _.uniq(
            _.map($('input[aria-required="true"][set]'), function (e) {
              return $(e).attr("set");
            })
          );
        return (
          v(),
          s("#first_name", "notBlank", "FirstNameRequired"),
          s("#first_name", "notUrl", "InvalidName"),
          s("#last_name", "notBlank", "LastNameRequired"),
          s("#last_name", "notUrl", "InvalidName"),
          s("#email", "notBlank", "EmailRequired"),
          s("#email", "email", "InvalidEmailAddress"),
          "true" === $("#phone").attr("aria-required") &&
            s("#phone", "notBlank", "PhoneRequired"),
          s("#phone", "notUrl", "InvalidPhone"),
          b() && s(A, "validLocation", "InvalidLocation"),
          $(".attach-or-paste").each(function () {
            var e = $(this),
              t = e.data("field");
            if ("required" === e.attr("required")) {
              var n,
                i = $("#" + t + "_file"),
                r = $("#" + t + "_url"),
                o = e.find("textarea.paste"),
                a =
                  ".attach-or-paste[data-field='" + t + "'] .validation-anchor";
              Validate.clearError(i),
                Validate.clearError(r),
                Validate.clearError(o),
                Validate.clearError(a),
                (n =
                  "resume" === t
                    ? "ResumeRequired"
                    : "cover_letter" === t
                    ? "CoverLetterRequired"
                    : "AttachmentRequired"),
                0 < i.length
                  ? s(i, "notBlank", n)
                  : 0 < r.length
                  ? s(r, "url", n)
                  : o.is(":visible")
                  ? s(o, "notBlank", n)
                  : s(a, "fail", n);
            }
          }),
          $('input[type="file"]').each(function () {
            var e = $(this)[0],
              t = e.files[0];
            t && 0 == t.size && Validate.setError(e, "EmptyAttachment");
          }),
          $("#education_section")
            .find(".education")
            .not(".education-template")
            .each(function () {
              var e = $(this).find(
                  "input.background-field, select.background-field"
                ),
                n = $(this).data("subfield-config");
              n || i.call(this, e, "education-required")
                ? (e.each(function () {
                    var e = $(this),
                      t = e.data("validators");
                    $.each(t, function () {
                      s(
                        e,
                        this.type,
                        this.key,
                        n && "true" !== e.attr("aria-required")
                      );
                    });
                  }),
                  o($(this)))
                : _.each(e, function (e) {
                    Validate.clearError(e);
                  });
            }),
          $("#employment_section")
            .find(".employment")
            .not(".employment-template")
            .each(function () {
              var e = $(this)
                  .find("input.background-field, select.background-field")
                  .not(".ignore"),
                t = $(this).find("input.current").is(":checked");
              t || i.call(this, e, "employment-required")
                ? (e.each(function () {
                    var e = $(this),
                      t = e.data("validators");
                    $.each(t, function () {
                      s(e, this.type, this.key);
                    });
                  }),
                  t || o($(this)))
                : _.each(e, function (e) {
                    Validate.clearError(e);
                  });
            }),
          $("#custom_fields")
            .find(
              'input[aria-required="true"], textarea[aria-required="true"], select[aria-required="true"]'
            )
            .each(function (e, t) {
              s(t, "notEmpty", "FieldRequired");
            }),
          $.each(e, function (e, t) {
            var n = ".msg-container[set=" + t + "]";
            Validate.clearError(n),
              Validate.atLeastOneChecked(t)
                ? c.push(!0)
                : (Validate.setError(n, "AtLeastOneRequired"), c.push(!1));
          }),
          $(".demographic_question.required").each(function () {
            var e = $(this);
            Validate.clearError(e),
              Validate.requiredDemographicQuestions(e)
                ? c.push(!0)
                : (Validate.setError(e, "DemographicQuestionRequired"),
                  c.push(!1));
          }),
          $("#gdpr_consent_required")
            .find('input[type="checkbox"]')
            .each(function (e, t) {
              s(t, "checked", "ConsentRequired");
            }),
          $(document).trigger("greenhouse.jobApplication.heightExpanded"),
          c
        );
      }
      function x() {
        p("Processing..."),
          JBEN.hideCaptcha
            ? (E(), S())
            : new JBEN.Captcha("#captcha_container", E, S, f).init();
      }
      function E() {
        $("#submit_app").attr("disabled", !0);
      }
      function S(e) {
        $("#captcha_container").append(
          $("<input>", {
            type: "hidden",
            name: "g-recaptcha-enterprise-token",
            value: e,
          })
        ),
          JBEN.QuestionDropdowns.translateValues(),
          $("#application").find("form").submit();
      }
      function C(t) {
        var n = null;
        if (t.responseText && "{" === t.responseText[0])
          try {
            n = $.parseJSON(t.responseText);
          } catch (e) {}
        if (n && n["goto"])
          try {
            document.location.replace(n["goto"]);
          } catch (e) {
            "undefined" != typeof Rollbar &&
              (Rollbar.error(
                "Error redirecting to confirmation (status=" +
                  t.status +
                  ", goto=" +
                  n["goto"] +
                  "): " +
                  t.responseText,
                e
              ),
              f());
          }
        else
          200 !== t.status && n && n.message
            ? (m(n.message),
              0 <= ["not-found", "not-live", "stale"].indexOf(n.code)
                ? p("Can't Process Application")
                : f())
            : (m(
                "Oops! There was an error processing your application.  Please try again."
              ),
              f(),
              200 <= t.status &&
                t.status < 400 &&
                "undefined" != typeof Rollbar &&
                Rollbar.error(
                  "Error finding goto attribute for successful response (status=" +
                    t.status +
                    "): " +
                    t.responseText,
                  e
                ));
      }
      var k = 0,
        T = "#job_application_location",
        A = "#auto_complete_input";
      return { init: t };
    })()
  )),
  (JBEN.PublicJobBoardFilter = function () {
    var t = this;
    (this.init = function () {
      (this.$departmentsFilter = $("#departments-select")),
        (this.$officesFilter = $("#offices-select")),
        this.registerEvents();
    }),
      (this.registerEvents = function () {
        this.$departmentsFilter.on("change", this.filter),
          this.$officesFilter.on("change", this.filter),
          (this.$departmentsFilter.val() || this.$officesFilter.val()) &&
            this.filter(),
          Util.mobileDevice() ||
            $("#main.accessible .filter-container select").select2({
              width: "200px",
              minimumResultsForSearch: -1,
              formatSelection: function (e) {
                return e.text.trim();
              },
            });
      }),
      (this.query = function () {
        var e = "",
          t = this.$departmentsFilter.val(),
          n = this.$officesFilter.val();
        return (
          null != t && 0 < t.length && (e += "[data-department-" + t + "]"),
          null != n && 0 < n.length && (e += "[data-office-" + n + "]"),
          e
        );
      }),
      (this.filter = function () {
        var e = t.query();
        0 < e.length ? t.showFiltered($(e)) : t.showAll();
      }),
      (this.showFiltered = function (e) {
        $(".level-0 :header, .level-1 :header, .opening").hide(),
          $("#wrapper").addClass("no-hierarchy");
        var t = 1 === e.length ? " job" : " jobs";
        $("#filter-count").html("<h3>" + e.length + t + "</h3>"), e.show();
      }),
      (this.showAll = function () {
        $(".level-0 :header, .level-1 :header, .opening").show(),
          $("#wrapper").removeClass("no-hierarchy"),
          $("#filter-count").empty();
      }),
      this.init();
  }),
  ((JBEN = JBEN || {}).PublicJobBoard = JBEN.PublicJobBoard || {}),
  (JBEN.PublicJobBoard.raceAndEthnicityFilters = function () {
    var t = $("#race_dropdown_container"),
      n = t.find("select");
    t.hide(),
      $("#job_application_hispanic_ethnicity").on("change", function () {
        var e = $(this).val();
        "Yes" === e
          ? n.val("4")
          : "Decline To Self Identify" === e
          ? n.val("8")
          : n.val(""),
          "" === n.val()
            ? (t.show(),
              $(document).trigger("greenhouse.jobApplication.heightExpanded"))
            : (t.hide(),
              $(document).trigger("greenhouse.jobApplication.heightReduced"));
      });
  });
var Url = {
  params: function () {
    for (
      var e,
        t = /\+/g,
        n = /([^&=]+)=?([^&]*)/g,
        i = function (e) {
          return decodeURIComponent(e.replace(t, " "));
        },
        r = window.location.search.substring(1),
        o = {};
      (e = n.exec(r));

    ) {
      var a = i(e[1]),
        s = i(e[2]);
      o[a] = s;
    }
    return o;
  },
  updateQueryStringParameter: function (e, t, n) {
    var i = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
      r = -1 !== e.indexOf("?") ? "&" : "?";
    return e.match(i)
      ? e.replace(i, "$1" + t + "=" + n + "$2")
      : e + r + t + "=" + n;
  },
};
if (!window.atob || !window.btoa) {
  var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    InvalidCharacterError = function (e) {
      this.message = e;
    };
  (InvalidCharacterError.prototype = new Error()),
    (InvalidCharacterError.prototype.name = "InvalidCharacterError"),
    window.atob ||
      (window.atob = function (e) {
        var t = String(e).replace(/=+$/, "");
        if (t.length % 4 == 1)
          throw new InvalidCharacterError(
            "'atob' failed: The string to be decoded is not correctly encoded."
          );
        for (
          var n, i, r = 0, o = 0, a = "";
          (i = t.charAt(o++));
          ~i && ((n = r % 4 ? 64 * n + i : i), r++ % 4)
            ? (a += String.fromCharCode(255 & (n >> ((-2 * r) & 6))))
            : 0
        )
          i = chars.indexOf(i);
        return a;
      }),
    window.btoa ||
      (window.btoa = function (e) {
        for (
          var t, n, i = String(e), r = 0, o = chars, a = "";
          i.charAt(0 | r) || ((o = "="), r % 1);
          a += o.charAt(63 & (t >> (8 - (r % 1) * 8)))
        ) {
          if (255 < (n = i.charCodeAt((r += 0.75))))
            throw new InvalidCharacterError(
              "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
            );
          t = (t << 8) | n;
        }
        return a;
      });
}
((JBEN = JBEN || {}).PublicJobBoard = JBEN.PublicJobBoard || {}),
  (JBEN.PublicJobBoard.UncacheableAttributes = (function () {
    function e(e) {
      (e = e || {}).only && -1 < e.only.indexOf("forms")
        ? i(function (e) {
            o(e.forms);
          })
        : (t(), n(), i());
    }
    function t() {
      var e = Url.params(),
        t = e.t,
        n = e.gh_src;
      !t && n && (t = n),
        null != t && "null" !== t && (s(t, "mapped_url_token"), l(t));
    }
    function n() {
      var e = Url.params().ccuid;
      null != e &&
        "null" !== e &&
        (s(e, "appcast_click_id"), c(e, "appcast_click_id"));
    }
    function i(e) {
      e = e || r;
      var t = _.map($("[data-presigned-form]"), function (e) {
          return $(e).data("presigned-form");
        }),
        n = JBEN.PublicJobBoard.UncacheableAttributes.path;
      $.getJSON(n, { fields: t }).done(e);
    }
    function r(e) {
      o(e.forms);
    }
    function o(e) {
      $.each(e, a), $(document).trigger("greenhouse.s3forms.loaded");
    }
    function a(e, t) {
      var n = atob(t);
      $('[data-presigned-form="' + e + '"]').html(n);
    }
    function s(e, t) {
      if (null !== e || "" !== e) {
        var n = $("<input />")
          .attr("id", "job_application_" + t)
          .attr("name", "job_application[" + t + "]")
          .attr("type", "hidden")
          .attr("value", e);
        $("#application_form").append(n);
      }
    }
    function l(e) {
      c(
        "embedded" === $('meta[property="gh:type"]').attr("content")
          ? "gh_src"
          : "t",
        e
      );
    }
    function c(t, n) {
      $("a[data-mapped]").each(function () {
        var e = $(this).attr("href");
        $(this).attr("href", Url.updateQueryStringParameter(e, t, n));
      });
    }
    return { init: e, processAndAppendToken: t, processAndAppendCcuid: n };
  })()),
  ((JBEN = JBEN || {}).LinkedinProfile = (function () {
    function v(e) {
      return e ? e + "" : "";
    }
    function y(e) {
      return e && e.company && e.company.name;
    }
    function b() {
      var i = !1;
      return (
        $("#custom_fields label").each(function (e, t) {
          var n = $(t);
          n.text().match(/linkedin/i) &&
            (i = n.nextAll('input[type="text"]').first());
        }),
        i
      );
    }
    function e() {
      Grnhse.BrowserHelper.supportsPostMessage()
        ? t()
        : $("div.apply-with-linkedin").remove();
    }
    function t() {
      n(), i();
    }
    function n() {
      (JBEN.host = JBEN.host || !1),
        JBEN.host &&
          window.addEventListener("message", function (e) {
            e.origin === JBEN.host &&
              "linkedin:receive" === e.data.name &&
              ((profile = e.data.message), r(profile));
          });
    }
    function i(t) {
      (t = $("button.apply-with-linkedin-button")).on("click", function () {
        var e =
          "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=" +
          encodeURIComponent(t.data("linkedin-key")) +
          "&state=" +
          encodeURIComponent(JBEN.linkedin_csrf) +
          "&redirect_uri=" +
          encodeURIComponent(t.data("linkedin-redirect")) +
          "&scope=r_fullprofile+r_emailaddress+r_contactinfo";
        return (
          (a = window.open(
            e,
            "_blank",
            "width=600, height=400, scrollbars=yes"
          )),
          !1
        );
      });
    }
    function r(e) {
      a && a.close(), e && o(l.fromResponse(e));
    }
    function o(e) {
      $("#first_name").val(e.firstName),
        $("#last_name").val(e.lastName),
        $("#email").val(e.email),
        $("#phone").val(e.phoneNumber),
        JBEN.FormControl.addHiddenFormField("applied_with", "linkedin"),
        e.publicProfileUrl &&
          $("#application_form label:contains('Relevant Links')")
            .nextAll("input[type='text']")
            .first()
            .val(e.publicProfileUrl);
      var t = $(
          'div.attach-or-paste[data-field="resume"] [data-source="paste"]:visible'
        ).first(),
        n = $("#resume_text").first();
      t.length && (n.is(":visible") || t.click(), n.first().val(s.create(e)));
    }
    var a, s, l;
    return (
      (l = (function () {
        function o(e) {
          var t;
          if (e && e.title)
            return (
              (t = {
                title: v(e.title),
                summary: v(e.summary),
                startDate: e.startDate,
                endDate: e.endDate,
                isCurrent: e.isCurrent,
              }),
              y(e) &&
                ((t.company = e.company), (t.company.name = v(e.company.name))),
              t
            );
        }
        function a(e) {
          if (e && e.schoolName)
            return {
              schoolName: v(e.schoolName),
              fieldOfStudy: v(e.fieldOfStudy),
              degree: v(e.degree),
              startDate: e.startDate,
              endDate: e.endDate,
            };
        }
        function s(e) {
          return Array.isArray(e)
            ? e
            : e && e.values && Array.isArray(e.values)
            ? e.values
            : [];
        }
        function e(e) {
          var t = s(e.threeCurrentPositions),
            n = s(e.positions),
            i = s(e.educations),
            r = s(e.phoneNumbers)[0];
          return {
            firstName: v(e.firstName),
            lastName: v(e.lastName),
            email: v(e.emailAddress),
            industry: v(e.industry),
            profileUrl: v(e.publicProfileUrl),
            summary: v(e.summary),
            currentPositions: _.compact(_.map(t, o)),
            positions: _.compact(_.map(n, o)),
            educations: _.compact(_.map(i, a)),
            location: v(e.location && e.location.name),
            phoneNumber: v(r && r.phoneNumber),
          };
        }
        return { fromResponse: e };
      })()),
      (s = (function () {
        function n(e) {
          return e ? e + "\n" : "";
        }
        function i(e, t) {
          for (var n = e.toString(); n.length < t; ) n = "0" + n;
          return n;
        }
        function r(e) {
          var t = "";
          return e
            ? (e.month &&
                ((t += i(e.month, 2)),
                e.day && (t += "/" + i(e.day, 2) + "/"),
                (t += "/")),
              (t += v(e.year)))
            : "";
        }
        function o(e, t) {
          return t ? g + n(n(e)) + t : "";
        }
        function a(e) {
          var t = [r(e.startDate), r(e.endDate)];
          return (
            e.isCurrent && (t[1] = t[1] || "Present"), _.compact(t).join(" - ")
          );
        }
        function t(e) {
          var t = e.title;
          return y(e) && (t += " at " + e.company.name), n(t);
        }
        function s(e, t) {
          return n(_.compact([e, t]).join(" "));
        }
        function l(e) {
          return e ? t(e) : "";
        }
        function c(e) {
          return n(o("Summary", e));
        }
        function u(e) {
          return o("Interests", e);
        }
        function h(e) {
          return "- " + t(e) + n(a(e)) + n(e.summary);
        }
        function d(e) {
          var t = _.compact([e.degree, e.fieldOfStudy, a(e)]);
          return n(e.schoolName) + n(t.join(", "));
        }
        function p(e) {
          var t = _.map(e, h);
          return o("Experience", _.compact(t).join("\n"));
        }
        function f(e) {
          var t = _.map(e, d);
          return o("Education", _.compact(t).join("\n"));
        }
        function m(e) {
          var t;
          return e.profileUrl
            ? (t = b()).length
              ? (t.val(e.profileUrl), "")
              : o("LinkedIn", e.profileUrl)
            : "";
        }
        var g = "-------------------------------------------\n";
        return {
          create: function (e) {
            var t = m(e);
            return (
              s(e.firstName, e.lastName) +
              n(e.location) +
              n(l(e.currentPositions[0])) +
              n(c(e.summary)) +
              n(p(e.positions)) +
              n(f(e.educations)) +
              n(u(e.interests)) +
              t
            );
          },
        };
      })()),
      { setup: e, receive: r }
    );
  })()),
  ((JBEN = JBEN || {}).SeekProfile = (function () {
    function e() {
      Grnhse.BrowserHelper.supportsPostMessage()
        ? t()
        : $("div.apply-with-seek").remove();
    }
    function t() {
      n(), i();
    }
    function n() {
      JBEN.host &&
        window.addEventListener("message", function (e) {
          e.origin === JBEN.host &&
            "seek:receive" === e.data.name &&
            r(e.data.message);
        });
    }
    function o(e, t) {
      var n = { csrf: JBEN.seekCsrf, advertiserId: e, applicationFormUrl: t };
      return btoa(encodeURIComponent(JSON.stringify(n)));
    }
    function i() {
      var r = $("button.seek-apply");
      r.on("click", function (e) {
        var t = r.data("seek-customer-id"),
          n = r.data("application-url"),
          i =
            r.data("seek-url") +
            "authorize?response_type=code&client_id=" +
            encodeURIComponent(r.data("seek-key")) +
            "&state=" +
            o(t, n) +
            "&redirect_uri=" +
            encodeURIComponent(r.data("seek-redirect")) +
            "&scope=r_profile_apply";
        (c = window.open(i, "_blank", "width=970, height=790, scrollbars=yes")),
          e.preventDefault();
      });
    }
    function r(e) {
      c.close(), e && a(u.fromResponse(e));
    }
    function a(e) {
      $("#first_name").val(e.firstName),
        $("#last_name").val(e.lastName),
        $("#email").val(e.email),
        e.phoneNumber && $("#phone").length && $("#phone").val(e.phoneNumber),
        JBEN.FormControl.addHiddenFormField("seek_id", e.completionId),
        e.resume && s(e.resume);
    }
    function s(e) {
      var t = "/apply/seek/resume?resume_url=" + encodeURIComponent(e);
      l(!0);
      $.ajax({
        url: t,
        success: function (e) {
          JBEN.FormControl.useUploadResumeChooser(
            decodeURIComponent(e.name),
            e.url
          ),
            l(!1);
        },
        error: function () {
          l(!1);
        },
      });
    }
    function l(e) {
      $("#button_app").prop("disabled", e);
    }
    var c, u;
    return (
      (u = (function () {
        function e(e) {
          var t = {
            completionId: e.id,
            email: e.applicantInfo.emailAddress,
            firstName: e.applicantInfo.firstName,
            lastName: e.applicantInfo.lastName,
            phoneNumber: e.applicantInfo.phoneNumber,
          };
          return e.resume && (t.resume = e.resume.link), t;
        }
        return { fromResponse: e };
      })()),
      { setup: e, fillForm: a }
    );
  })()),
  (function (p) {
    (p.GoogleDrivePicker = function (e) {
      function t(e) {
        (u = ["https://www.googleapis.com/auth/drive.file"]),
          (l = (c = e || {}).$trigger),
          (h = l.closest(".attach-or-paste").data("file-types")),
          (c.uploadToS3 = c.uploadToS3 || function () {}),
          (c.uploadCancelled = c.uploadCancelled || function () {}),
          p.XMLHttpRequest ? l.on("click", n) : l.remove();
      }
      function n() {
        p.gapi
          ? GoogleDrivePicker.oauthToken
            ? (c.uploadStarted(), r())
            : p.gapi.auth.authorize(
                { client_id: googlePickerClientId, scope: u, immediate: !1 },
                i
              )
          : c.$messages.text(Message.Uploaders.GoogleDrive.TryAgain).show();
      }
      function i(e) {
        e && !e.error && ((GoogleDrivePicker.oauthToken = e.access_token), r());
      }
      function r() {
        if (!d && GoogleDrivePicker.oauthToken) {
          var e = new google.picker.DocsView(google.picker.ViewId.DOCUMENTS),
            t = new google.picker.DocsView(google.picker.ViewId.PDFS);
          e.setMode(google.picker.DocsViewMode.LIST),
            t.setMode(google.picker.DocsViewMode.LIST),
            new google.picker.PickerBuilder()
              .addView(e)
              .addView(t)
              .setOAuthToken(GoogleDrivePicker.oauthToken)
              .setDeveloperKey(googlePickerDeveloperKey)
              .setAppId(googlePickerAppId)
              .setCallback(o)
              .build()
              .setVisible(!0),
            c.$messages
              .text(Message.Uploaders.GoogleDrive.LoadingAttachment)
              .show(),
            (d = !0);
        }
      }
      function o(e) {
        switch (e[google.picker.Response.ACTION]) {
          case google.picker.Action.PICKED:
            (d = !1),
              h && !Validate.specificFileFormat(h)(e.docs[0].name)
                ? (alert(
                    "Invalid file format selected. Allowed formats are: " +
                      h.join(", ")
                  ),
                  c.uploadCancelled())
                : (a(e), c.uploadFinished());
            break;
          case google.picker.Action.CANCEL:
            (d = !1), c.uploadCancelled();
        }
      }
      function a(e) {
        var t = e[google.picker.Response.DOCUMENTS][0],
          n = t[google.picker.Document.NAME],
          i = t[google.picker.Document.ID];
        gapi.client.drive.files.get({ fileId: i }).execute(function (e) {
          s(e, n);
        });
      }
      function s(e, t) {
        var n = gapi.auth.getToken().access_token,
          i = new XMLHttpRequest(),
          r = e.downloadUrl,
          o = e.mimeType;
        null == r &&
          ((o = "application/pdf"), (r = e.exportLinks[o]), (t += ".pdf")),
          (r = r.replace("content.googleapis.com", "www.googleapis.com")),
          i.open("GET", r),
          i.setRequestHeader("Authorization", "Bearer " + n),
          (i.responseType = "blob"),
          (i.onload = function () {
            var e = new Blob([i.response], { type: o });
            (e.name = t), c.uploadToS3(e);
          }),
          i.send();
      }
      var l,
        c,
        u,
        h,
        d = !1;
      t(e);
    }),
      (p.googleDriveLoader = function () {
        gapi.client.load("drive", "v2");
      }),
      (p.googlePickerLoader = function () {
        gapi.load("auth"), gapi.load("picker");
      });
  })(window),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(jQuery);
  })(function (e) {
    return (e.ui = e.ui || {}), (e.ui.version = "1.12.1");
  }),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery", "./version"], e)
      : e(jQuery);
  })(function (u) {
    var o,
      n = 0,
      s = Array.prototype.slice;
    return (
      (u.cleanData =
        ((o = u.cleanData),
        function (t) {
          var n, i, r;
          for (r = 0; null != (i = t[r]); r++)
            try {
              (n = u._data(i, "events")) &&
                n.remove &&
                u(i).triggerHandler("remove");
            } catch (e) {}
          o(t);
        })),
      (u.widget = function (e, n, t) {
        var i,
          r,
          o,
          a = {},
          s = e.split(".")[0],
          l = s + "-" + (e = e.split(".")[1]);
        return (
          t || ((t = n), (n = u.Widget)),
          u.isArray(t) && (t = u.extend.apply(null, [{}].concat(t))),
          (u.expr[":"][l.toLowerCase()] = function (e) {
            return !!u.data(e, l);
          }),
          (u[s] = u[s] || {}),
          (i = u[s][e]),
          (r = u[s][e] =
            function (e, t) {
              if (!this._createWidget) return new r(e, t);
              arguments.length && this._createWidget(e, t);
            }),
          u.extend(r, i, {
            version: t.version,
            _proto: u.extend({}, t),
            _childConstructors: [],
          }),
          ((o = new n()).options = u.widget.extend({}, o.options)),
          u.each(t, function (t, o) {
            u.isFunction(o)
              ? (a[t] = (function () {
                  function i() {
                    return n.prototype[t].apply(this, arguments);
                  }
                  function r(e) {
                    return n.prototype[t].apply(this, e);
                  }
                  return function () {
                    var e,
                      t = this._super,
                      n = this._superApply;
                    return (
                      (this._super = i),
                      (this._superApply = r),
                      (e = o.apply(this, arguments)),
                      (this._super = t),
                      (this._superApply = n),
                      e
                    );
                  };
                })())
              : (a[t] = o);
          }),
          (r.prototype = u.widget.extend(
            o,
            { widgetEventPrefix: (i && o.widgetEventPrefix) || e },
            a,
            { constructor: r, namespace: s, widgetName: e, widgetFullName: l }
          )),
          i
            ? (u.each(i._childConstructors, function (e, t) {
                var n = t.prototype;
                u.widget(n.namespace + "." + n.widgetName, r, t._proto);
              }),
              delete i._childConstructors)
            : n._childConstructors.push(r),
          u.widget.bridge(e, r),
          r
        );
      }),
      (u.widget.extend = function (e) {
        for (
          var t, n, i = s.call(arguments, 1), r = 0, o = i.length;
          r < o;
          r++
        )
          for (t in i[r])
            (n = i[r][t]),
              i[r].hasOwnProperty(t) &&
                n !== undefined &&
                (u.isPlainObject(n)
                  ? (e[t] = u.isPlainObject(e[t])
                      ? u.widget.extend({}, e[t], n)
                      : u.widget.extend({}, n))
                  : (e[t] = n));
        return e;
      }),
      (u.widget.bridge = function (o, t) {
        var a = t.prototype.widgetFullName || o;
        u.fn[o] = function (n) {
          var e = "string" == typeof n,
            i = s.call(arguments, 1),
            r = this;
          return (
            e
              ? this.length || "instance" !== n
                ? this.each(function () {
                    var e,
                      t = u.data(this, a);
                    return "instance" === n
                      ? ((r = t), !1)
                      : t
                      ? u.isFunction(t[n]) && "_" !== n.charAt(0)
                        ? (e = t[n].apply(t, i)) !== t && e !== undefined
                          ? ((r = e && e.jquery ? r.pushStack(e.get()) : e), !1)
                          : void 0
                        : u.error(
                            "no such method '" +
                              n +
                              "' for " +
                              o +
                              " widget instance"
                          )
                      : u.error(
                          "cannot call methods on " +
                            o +
                            " prior to initialization; attempted to call method '" +
                            n +
                            "'"
                        );
                  })
                : (r = undefined)
              : (i.length && (n = u.widget.extend.apply(null, [n].concat(i))),
                this.each(function () {
                  var e = u.data(this, a);
                  e
                    ? (e.option(n || {}), e._init && e._init())
                    : u.data(this, a, new t(n, this));
                })),
            r
          );
        };
      }),
      (u.Widget = function () {}),
      (u.Widget._childConstructors = []),
      (u.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (e, t) {
          (t = u(t || this.defaultElement || this)[0]),
            (this.element = u(t)),
            (this.uuid = n++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = u()),
            (this.hoverable = u()),
            (this.focusable = u()),
            (this.classesElementLookup = {}),
            t !== this &&
              (u.data(t, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (e) {
                  e.target === t && this.destroy();
                },
              }),
              (this.document = u(t.style ? t.ownerDocument : t.document || t)),
              (this.window = u(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = u.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              e
            )),
            this._create(),
            this.options.disabled &&
              this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: function () {
          return {};
        },
        _getCreateEventData: u.noop,
        _create: u.noop,
        _init: u.noop,
        destroy: function () {
          var n = this;
          this._destroy(),
            u.each(this.classesElementLookup, function (e, t) {
              n._removeClass(t, e);
            }),
            this.element
              .off(this.eventNamespace)
              .removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace);
        },
        _destroy: u.noop,
        widget: function () {
          return this.element;
        },
        option: function (e, t) {
          var n,
            i,
            r,
            o = e;
          if (0 === arguments.length) return u.widget.extend({}, this.options);
          if ("string" == typeof e)
            if (((o = {}), (e = (n = e.split(".")).shift()), n.length)) {
              for (
                i = o[e] = u.widget.extend({}, this.options[e]), r = 0;
                r < n.length - 1;
                r++
              )
                (i[n[r]] = i[n[r]] || {}), (i = i[n[r]]);
              if (((e = n.pop()), 1 === arguments.length))
                return i[e] === undefined ? null : i[e];
              i[e] = t;
            } else {
              if (1 === arguments.length)
                return this.options[e] === undefined ? null : this.options[e];
              o[e] = t;
            }
          return this._setOptions(o), this;
        },
        _setOptions: function (e) {
          var t;
          for (t in e) this._setOption(t, e[t]);
          return this;
        },
        _setOption: function (e, t) {
          return (
            "classes" === e && this._setOptionClasses(t),
            (this.options[e] = t),
            "disabled" === e && this._setOptionDisabled(t),
            this
          );
        },
        _setOptionClasses: function (e) {
          var t, n, i;
          for (t in e)
            (i = this.classesElementLookup[t]),
              e[t] !== this.options.classes[t] &&
                i &&
                i.length &&
                ((n = u(i.get())),
                this._removeClass(i, t),
                n.addClass(
                  this._classes({ element: n, keys: t, classes: e, add: !0 })
                ));
        },
        _setOptionDisabled: function (e) {
          this._toggleClass(
            this.widget(),
            this.widgetFullName + "-disabled",
            null,
            !!e
          ),
            e &&
              (this._removeClass(this.hoverable, null, "ui-state-hover"),
              this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _classes: function (r) {
          function e(e, t) {
            var n, i;
            for (i = 0; i < e.length; i++)
              (n = a.classesElementLookup[e[i]] || u()),
                (n = r.add
                  ? u(u.unique(n.get().concat(r.element.get())))
                  : u(n.not(r.element).get())),
                (a.classesElementLookup[e[i]] = n),
                o.push(e[i]),
                t && r.classes[e[i]] && o.push(r.classes[e[i]]);
          }
          var o = [],
            a = this;
          return (
            (r = u.extend(
              { element: this.element, classes: this.options.classes || {} },
              r
            )),
            this._on(r.element, { remove: "_untrackClassesElement" }),
            r.keys && e(r.keys.match(/\S+/g) || [], !0),
            r.extra && e(r.extra.match(/\S+/g) || []),
            o.join(" ")
          );
        },
        _untrackClassesElement: function (n) {
          var i = this;
          u.each(i.classesElementLookup, function (e, t) {
            -1 !== u.inArray(n.target, t) &&
              (i.classesElementLookup[e] = u(t.not(n.target).get()));
          });
        },
        _removeClass: function (e, t, n) {
          return this._toggleClass(e, t, n, !1);
        },
        _addClass: function (e, t, n) {
          return this._toggleClass(e, t, n, !0);
        },
        _toggleClass: function (e, t, n, i) {
          i = "boolean" == typeof i ? i : n;
          var r = "string" == typeof e || null === e,
            o = {
              extra: r ? t : n,
              keys: r ? e : t,
              element: r ? this.element : e,
              add: i,
            };
          return o.element.toggleClass(this._classes(o), i), this;
        },
        _on: function (a, s, e) {
          var l,
            c = this;
          "boolean" != typeof a && ((e = s), (s = a), (a = !1)),
            e
              ? ((s = l = u(s)), (this.bindings = this.bindings.add(s)))
              : ((e = s), (s = this.element), (l = this.widget())),
            u.each(e, function (e, t) {
              function n() {
                if (
                  a ||
                  (!0 !== c.options.disabled &&
                    !u(this).hasClass("ui-state-disabled"))
                )
                  return ("string" == typeof t ? c[t] : t).apply(c, arguments);
              }
              "string" != typeof t &&
                (n.guid = t.guid = t.guid || n.guid || u.guid++);
              var i = e.match(/^([\w:-]*)\s*(.*)$/),
                r = i[1] + c.eventNamespace,
                o = i[2];
              o ? l.on(r, o, n) : s.on(r, n);
            });
        },
        _off: function (e, t) {
          (t =
            (t || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            e.off(t).off(t),
            (this.bindings = u(this.bindings.not(e).get())),
            (this.focusable = u(this.focusable.not(e).get())),
            (this.hoverable = u(this.hoverable.not(e).get()));
        },
        _delay: function (e, t) {
          function n() {
            return ("string" == typeof e ? i[e] : e).apply(i, arguments);
          }
          var i = this;
          return setTimeout(n, t || 0);
        },
        _hoverable: function (e) {
          (this.hoverable = this.hoverable.add(e)),
            this._on(e, {
              mouseenter: function (e) {
                this._addClass(u(e.currentTarget), null, "ui-state-hover");
              },
              mouseleave: function (e) {
                this._removeClass(u(e.currentTarget), null, "ui-state-hover");
              },
            });
        },
        _focusable: function (e) {
          (this.focusable = this.focusable.add(e)),
            this._on(e, {
              focusin: function (e) {
                this._addClass(u(e.currentTarget), null, "ui-state-focus");
              },
              focusout: function (e) {
                this._removeClass(u(e.currentTarget), null, "ui-state-focus");
              },
            });
        },
        _trigger: function (e, t, n) {
          var i,
            r,
            o = this.options[e];
          if (
            ((n = n || {}),
            ((t = u.Event(t)).type = (
              e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
            ).toLowerCase()),
            (t.target = this.element[0]),
            (r = t.originalEvent))
          )
            for (i in r) i in t || (t[i] = r[i]);
          return (
            this.element.trigger(t, n),
            !(
              (u.isFunction(o) &&
                !1 === o.apply(this.element[0], [t].concat(n))) ||
              t.isDefaultPrevented()
            )
          );
        },
      }),
      u.each({ show: "fadeIn", hide: "fadeOut" }, function (o, a) {
        u.Widget.prototype["_" + o] = function (t, e, n) {
          var i;
          "string" == typeof e && (e = { effect: e });
          var r = e
            ? !0 === e || "number" == typeof e
              ? a
              : e.effect || a
            : o;
          "number" == typeof (e = e || {}) && (e = { duration: e }),
            (i = !u.isEmptyObject(e)),
            (e.complete = n),
            e.delay && t.delay(e.delay),
            i && u.effects && u.effects.effect[r]
              ? t[o](e)
              : r !== o && t[r]
              ? t[r](e.duration, e.easing, n)
              : t.queue(function (e) {
                  u(this)[o](), n && n.call(t[0]), e();
                });
        };
      }),
      u.widget
    );
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(window.jQuery);
  })(function (c) {
    "use strict";
    var t = 0,
      u = [
        "accepts",
        "cache",
        "contents",
        "contentType",
        "crossDomain",
        "data",
        "dataType",
        "headers",
        "ifModified",
        "mimeType",
        "password",
        "processData",
        "timeout",
        "traditional",
        "type",
        "url",
        "username",
      ],
      e = function (e) {
        return e;
      };
    c.ajaxSetup({
      converters: {
        "postmessage text": e,
        "postmessage json": e,
        "postmessage html": e,
      },
    }),
      c.ajaxTransport("postmessage", function (n) {
        if (n.postMessage && window.postMessage) {
          var a,
            e = c("<a>").prop("href", n.postMessage)[0],
            s = e.protocol + "//" + e.host,
            l = n.xhr().upload;
          return {
            send: function (e, i) {
              var r = { id: "postmessage-transport-" + (t += 1) },
                o = "message." + r.id;
              a = c(
                '<iframe style="display:none;" src="' +
                  n.postMessage +
                  '" name="' +
                  r.id +
                  '"></iframe>'
              )
                .bind("load", function () {
                  c.each(u, function (e, t) {
                    r[t] = n[t];
                  }),
                    (r.dataType = r.dataType.replace("postmessage ", "")),
                    c(window).bind(o, function (e) {
                      var t,
                        n = (e = e.originalEvent).data;
                      e.origin === s &&
                        n.id === r.id &&
                        ("progress" === n.type
                          ? ((t = document.createEvent("Event")).initEvent(
                              n.type,
                              !1,
                              !0
                            ),
                            c.extend(t, n),
                            l.dispatchEvent(t))
                          : (i(
                              n.status,
                              n.statusText,
                              { postmessage: n.result },
                              n.headers
                            ),
                            a.remove(),
                            c(window).unbind(o)));
                    }),
                    a[0].contentWindow.postMessage(r, s);
                })
                .appendTo(document.body);
            },
            abort: function () {
              a && a.remove();
            },
          };
        }
      });
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(window.jQuery);
  })(function (a) {
    "use strict";
    window.XDomainRequest &&
      !a.support.cors &&
      a.ajaxTransport(function (i) {
        var o;
        if (i.crossDomain && i.async)
          return (
            i.timeout && ((i.xdrTimeout = i.timeout), delete i.timeout),
            {
              send: function (e, r) {
                function t(e, t, n, i) {
                  (o.onload = o.onerror = o.ontimeout = a.noop),
                    (o = null),
                    r(e, t, n, i);
                }
                var n = /\?/.test(i.url) ? "&" : "?";
                (o = new XDomainRequest()),
                  "DELETE" === i.type
                    ? ((i.url = i.url + n + "_method=DELETE"),
                      (i.type = "POST"))
                    : "PUT" === i.type
                    ? ((i.url = i.url + n + "_method=PUT"), (i.type = "POST"))
                    : "PATCH" === i.type &&
                      ((i.url = i.url + n + "_method=PATCH"),
                      (i.type = "POST")),
                  o.open(i.type, i.url),
                  (o.onload = function () {
                    t(
                      200,
                      "OK",
                      { text: o.responseText },
                      "Content-Type: " + o.contentType
                    );
                  }),
                  (o.onerror = function () {
                    t(404, "Not Found");
                  }),
                  i.xdrTimeout &&
                    ((o.ontimeout = function () {
                      t(0, "timeout");
                    }),
                    (o.timeout = i.xdrTimeout)),
                  o.send((i.hasContent && i.data) || null);
              },
              abort: function () {
                o && ((o.onerror = a.noop()), o.abort());
              },
            }
          );
      });
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof exports
      ? e(require("jquery"))
      : e(window.jQuery);
  })(function (l) {
    "use strict";
    var c = 0;
    l.ajaxTransport("iframe", function (r) {
      if (r.async) {
        var o,
          a,
          i,
          s = r.initialIframeSrc || "javascript:false;";
        return {
          send: function (t, n) {
            (o = l('<form style="display:none;"></form>')).attr(
              "accept-charset",
              r.formAcceptCharset
            ),
              (i = /\?/.test(r.url) ? "&" : "?"),
              "DELETE" === r.type
                ? ((r.url = r.url + i + "_method=DELETE"), (r.type = "POST"))
                : "PUT" === r.type
                ? ((r.url = r.url + i + "_method=PUT"), (r.type = "POST"))
                : "PATCH" === r.type &&
                  ((r.url = r.url + i + "_method=PATCH"), (r.type = "POST")),
              (a = l(
                '<iframe src="' +
                  s +
                  '" name="iframe-transport-' +
                  (c += 1) +
                  '"></iframe>'
              ).bind("load", function () {
                var i,
                  t = l.isArray(r.paramName) ? r.paramName : [r.paramName];
                a.unbind("load").bind("load", function () {
                  var t;
                  try {
                    if (!(t = a.contents()).length || !t[0].firstChild)
                      throw new Error();
                  } catch (e) {
                    t = undefined;
                  }
                  n(200, "success", { iframe: t }),
                    l('<iframe src="' + s + '"></iframe>').appendTo(o),
                    window.setTimeout(function () {
                      o.remove();
                    }, 0);
                }),
                  o
                    .prop("target", a.prop("name"))
                    .prop("action", r.url)
                    .prop("method", r.type),
                  r.formData &&
                    l.each(r.formData, function (e, t) {
                      l('<input type="hidden"/>')
                        .prop("name", t.name)
                        .val(t.value)
                        .appendTo(o);
                    }),
                  r.fileInput &&
                    r.fileInput.length &&
                    "POST" === r.type &&
                    ((i = r.fileInput.clone()),
                    r.fileInput.after(function (e) {
                      return i[e];
                    }),
                    r.paramName &&
                      r.fileInput.each(function (e) {
                        l(this).prop("name", t[e] || r.paramName);
                      }),
                    o
                      .append(r.fileInput)
                      .prop("enctype", "multipart/form-data")
                      .prop("encoding", "multipart/form-data"),
                    r.fileInput.removeAttr("form")),
                  o.submit(),
                  i &&
                    i.length &&
                    r.fileInput.each(function (e, t) {
                      var n = l(i[e]);
                      l(t)
                        .prop("name", n.prop("name"))
                        .attr("form", n.attr("form")),
                        n.replaceWith(t);
                    });
              })),
              o.append(a).appendTo(document.body);
          },
          abort: function () {
            a && a.unbind("load").prop("src", s), o && o.remove();
          },
        };
      }
    }),
      l.ajaxSetup({
        converters: {
          "iframe text": function (e) {
            return e && l(e[0].body).text();
          },
          "iframe json": function (e) {
            return e && l.parseJSON(l(e[0].body).text());
          },
          "iframe html": function (e) {
            return e && l(e[0].body).html();
          },
          "iframe xml": function (e) {
            var t = e && e[0];
            return t && l.isXMLDoc(t)
              ? t
              : l.parseXML(
                  (t.XMLDocument && t.XMLDocument.xml) || l(t.body).html()
                );
          },
          "iframe script": function (e) {
            return e && l.globalEval(l(e[0].body).text());
          },
        },
      });
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery", "jquery.ui.widget"], e)
      : "object" == typeof exports
      ? e(require("jquery"), require("./vendor/jquery.ui.widget"))
      : e(window.jQuery);
  })(function (v) {
    "use strict";
    function e(n) {
      var i = "dragover" === n;
      return function (e) {
        e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
        var t = e.dataTransfer;
        t &&
          -1 !== v.inArray("Files", t.types) &&
          !1 !== this._trigger(n, v.Event(n, { delegatedEvent: e })) &&
          (e.preventDefault(), i && (t.dropEffect = "copy"));
      };
    }
    (v.support.fileInput = !(
      new RegExp(
        "(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))"
      ).test(window.navigator.userAgent) ||
      v('<input type="file">').prop("disabled")
    )),
      (v.support.xhrFileUpload = !(
        !window.ProgressEvent || !window.FileReader
      )),
      (v.support.xhrFormDataFileUpload = !!window.FormData),
      (v.support.blobSlice =
        window.Blob &&
        (Blob.prototype.slice ||
          Blob.prototype.webkitSlice ||
          Blob.prototype.mozSlice)),
      v.widget("blueimp.fileupload", {
        options: {
          dropZone: v(document),
          pasteZone: undefined,
          fileInput: undefined,
          replaceFileInput: !0,
          paramName: undefined,
          singleFileUploads: !0,
          limitMultiFileUploads: undefined,
          limitMultiFileUploadSize: undefined,
          limitMultiFileUploadSizeOverhead: 512,
          sequentialUploads: !1,
          limitConcurrentUploads: undefined,
          forceIframeTransport: !1,
          redirect: undefined,
          redirectParamName: undefined,
          postMessage: undefined,
          multipart: !0,
          maxChunkSize: undefined,
          uploadedBytes: undefined,
          recalculateProgress: !0,
          progressInterval: 100,
          bitrateInterval: 500,
          autoUpload: !0,
          messages: { uploadedBytes: "Uploaded bytes exceed file size" },
          i18n: function (n, e) {
            return (
              (n = this.messages[n] || n.toString()),
              e &&
                v.each(e, function (e, t) {
                  n = n.replace("{" + e + "}", t);
                }),
              n
            );
          },
          formData: function (e) {
            return e.serializeArray();
          },
          add: function (e, t) {
            if (e.isDefaultPrevented()) return !1;
            (t.autoUpload ||
              (!1 !== t.autoUpload &&
                v(this).fileupload("option", "autoUpload"))) &&
              t.process().done(function () {
                t.submit();
              });
          },
          processData: !1,
          contentType: !1,
          cache: !1,
        },
        _specialOptions: [
          "fileInput",
          "dropZone",
          "pasteZone",
          "multipart",
          "forceIframeTransport",
        ],
        _blobSlice:
          v.support.blobSlice &&
          function () {
            return (this.slice || this.webkitSlice || this.mozSlice).apply(
              this,
              arguments
            );
          },
        _BitrateTimer: function () {
          (this.timestamp = Date.now ? Date.now() : new Date().getTime()),
            (this.loaded = 0),
            (this.bitrate = 0),
            (this.getBitrate = function (e, t, n) {
              var i = e - this.timestamp;
              return (
                (!this.bitrate || !n || n < i) &&
                  ((this.bitrate = (t - this.loaded) * (1e3 / i) * 8),
                  (this.loaded = t),
                  (this.timestamp = e)),
                this.bitrate
              );
            });
        },
        _isXHRUpload: function (e) {
          return (
            !e.forceIframeTransport &&
            ((!e.multipart && v.support.xhrFileUpload) ||
              v.support.xhrFormDataFileUpload)
          );
        },
        _getFormData: function (e) {
          var n;
          return "function" === v.type(e.formData)
            ? e.formData(e.form)
            : v.isArray(e.formData)
            ? e.formData
            : "object" === v.type(e.formData)
            ? ((n = []),
              v.each(e.formData, function (e, t) {
                n.push({ name: e, value: t });
              }),
              n)
            : [];
        },
        _getTotal: function (e) {
          var n = 0;
          return (
            v.each(e, function (e, t) {
              n += t.size || 1;
            }),
            n
          );
        },
        _initProgressObject: function (e) {
          var t = { loaded: 0, total: 0, bitrate: 0 };
          e._progress ? v.extend(e._progress, t) : (e._progress = t);
        },
        _initResponseObject: function (e) {
          var t;
          if (e._response)
            for (t in e._response)
              e._response.hasOwnProperty(t) && delete e._response[t];
          else e._response = {};
        },
        _onProgress: function (e, t) {
          if (e.lengthComputable) {
            var n,
              i = Date.now ? Date.now() : new Date().getTime();
            if (
              t._time &&
              t.progressInterval &&
              i - t._time < t.progressInterval &&
              e.loaded !== e.total
            )
              return;
            (t._time = i),
              (n =
                Math.floor(
                  (e.loaded / e.total) * (t.chunkSize || t._progress.total)
                ) + (t.uploadedBytes || 0)),
              (this._progress.loaded += n - t._progress.loaded),
              (this._progress.bitrate = this._bitrateTimer.getBitrate(
                i,
                this._progress.loaded,
                t.bitrateInterval
              )),
              (t._progress.loaded = t.loaded = n),
              (t._progress.bitrate = t.bitrate =
                t._bitrateTimer.getBitrate(i, n, t.bitrateInterval)),
              this._trigger(
                "progress",
                v.Event("progress", { delegatedEvent: e }),
                t
              ),
              this._trigger(
                "progressall",
                v.Event("progressall", { delegatedEvent: e }),
                this._progress
              );
          }
        },
        _initProgressListener: function (n) {
          var i = this,
            e = n.xhr ? n.xhr() : v.ajaxSettings.xhr();
          e.upload &&
            (v(e.upload).bind("progress", function (e) {
              var t = e.originalEvent;
              (e.lengthComputable = t.lengthComputable),
                (e.loaded = t.loaded),
                (e.total = t.total),
                i._onProgress(e, n);
            }),
            (n.xhr = function () {
              return e;
            }));
        },
        _isInstanceOf: function (e, t) {
          return Object.prototype.toString.call(t) === "[object " + e + "]";
        },
        _initXHRData: function (n) {
          var i,
            r = this,
            e = n.files[0],
            t = n.multipart || !v.support.xhrFileUpload,
            o = "array" === v.type(n.paramName) ? n.paramName[0] : n.paramName;
          (n.headers = v.extend({}, n.headers)),
            n.contentRange && (n.headers["Content-Range"] = n.contentRange),
            (t && !n.blob && this._isInstanceOf("File", e)) ||
              (n.headers["Content-Disposition"] =
                'attachment; filename="' + encodeURI(e.name) + '"'),
            t
              ? v.support.xhrFormDataFileUpload &&
                (n.postMessage
                  ? ((i = this._getFormData(n)),
                    n.blob
                      ? i.push({ name: o, value: n.blob })
                      : v.each(n.files, function (e, t) {
                          i.push({
                            name:
                              ("array" === v.type(n.paramName) &&
                                n.paramName[e]) ||
                              o,
                            value: t,
                          });
                        }))
                  : (r._isInstanceOf("FormData", n.formData)
                      ? (i = n.formData)
                      : ((i = new FormData()),
                        v.each(this._getFormData(n), function (e, t) {
                          i.append(t.name, t.value);
                        })),
                    n.blob
                      ? i.append(o, n.blob, e.name)
                      : v.each(n.files, function (e, t) {
                          (r._isInstanceOf("File", t) ||
                            r._isInstanceOf("Blob", t)) &&
                            i.append(
                              ("array" === v.type(n.paramName) &&
                                n.paramName[e]) ||
                                o,
                              t,
                              t.uploadName || t.name
                            );
                        })),
                (n.data = i))
              : ((n.contentType = e.type || "application/octet-stream"),
                (n.data = n.blob || e)),
            (n.blob = null);
        },
        _initIframeSettings: function (e) {
          var t = v("<a></a>").prop("href", e.url).prop("host");
          (e.dataType = "iframe " + (e.dataType || "")),
            (e.formData = this._getFormData(e)),
            e.redirect &&
              t &&
              t !== location.host &&
              e.formData.push({
                name: e.redirectParamName || "redirect",
                value: e.redirect,
              });
        },
        _initDataSettings: function (e) {
          this._isXHRUpload(e)
            ? (this._chunkedUpload(e, !0) ||
                (e.data || this._initXHRData(e), this._initProgressListener(e)),
              e.postMessage &&
                (e.dataType = "postmessage " + (e.dataType || "")))
            : this._initIframeSettings(e);
        },
        _getParamName: function (e) {
          var t = v(e.fileInput),
            i = e.paramName;
          return (
            i
              ? v.isArray(i) || (i = [i])
              : ((i = []),
                t.each(function () {
                  for (
                    var e = v(this),
                      t = e.prop("name") || "files[]",
                      n = (e.prop("files") || [1]).length;
                    n;

                  )
                    i.push(t), (n -= 1);
                }),
                i.length || (i = [t.prop("name") || "files[]"])),
            i
          );
        },
        _initFormSettings: function (e) {
          (e.form && e.form.length) ||
            ((e.form = v(e.fileInput.prop("form"))),
            e.form.length || (e.form = v(this.options.fileInput.prop("form")))),
            (e.paramName = this._getParamName(e)),
            e.url || (e.url = e.form.prop("action") || location.href),
            (e.type = (
              e.type ||
              ("string" === v.type(e.form.prop("method")) &&
                e.form.prop("method")) ||
              ""
            ).toUpperCase()),
            "POST" !== e.type &&
              "PUT" !== e.type &&
              "PATCH" !== e.type &&
              (e.type = "POST"),
            e.formAcceptCharset ||
              (e.formAcceptCharset = e.form.attr("accept-charset"));
        },
        _getAJAXSettings: function (e) {
          var t = v.extend({}, this.options, e);
          return this._initFormSettings(t), this._initDataSettings(t), t;
        },
        _getDeferredState: function (e) {
          return e.state
            ? e.state()
            : e.isResolved()
            ? "resolved"
            : e.isRejected()
            ? "rejected"
            : "pending";
        },
        _enhancePromise: function (e) {
          return (
            (e.success = e.done), (e.error = e.fail), (e.complete = e.always), e
          );
        },
        _getXHRPromise: function (e, t, n) {
          var i = v.Deferred(),
            r = i.promise();
          return (
            (t = t || this.options.context || r),
            !0 === e ? i.resolveWith(t, n) : !1 === e && i.rejectWith(t, n),
            (r.abort = i.promise),
            this._enhancePromise(r)
          );
        },
        _addConvenienceMethods: function (e, n) {
          var i = this,
            r = function (e) {
              return v.Deferred().resolveWith(i, e).promise();
            };
          (n.process = function (e, t) {
            return (
              (e || t) &&
                (n._processQueue = this._processQueue =
                  (this._processQueue || r([this]))
                    .pipe(function () {
                      return n.errorThrown
                        ? v.Deferred().rejectWith(i, [n]).promise()
                        : r(arguments);
                    })
                    .pipe(e, t)),
              this._processQueue || r([this])
            );
          }),
            (n.submit = function () {
              return (
                "pending" !== this.state() &&
                  (n.jqXHR = this.jqXHR =
                    !1 !==
                      i._trigger(
                        "submit",
                        v.Event("submit", { delegatedEvent: e }),
                        this
                      ) && i._onSend(e, this)),
                this.jqXHR || i._getXHRPromise()
              );
            }),
            (n.abort = function () {
              return this.jqXHR
                ? this.jqXHR.abort()
                : ((this.errorThrown = "abort"),
                  i._trigger("fail", null, this),
                  i._getXHRPromise(!1));
            }),
            (n.state = function () {
              return this.jqXHR
                ? i._getDeferredState(this.jqXHR)
                : this._processQueue
                ? i._getDeferredState(this._processQueue)
                : void 0;
            }),
            (n.processing = function () {
              return (
                !this.jqXHR &&
                this._processQueue &&
                "pending" === i._getDeferredState(this._processQueue)
              );
            }),
            (n.progress = function () {
              return this._progress;
            }),
            (n.response = function () {
              return this._response;
            });
        },
        _getUploadedBytes: function (e) {
          var t = e.getResponseHeader("Range"),
            n = t && t.split("-"),
            i = n && 1 < n.length && parseInt(n[1], 10);
          return i && i + 1;
        },
        _chunkedUpload: function (o, e) {
          o.uploadedBytes = o.uploadedBytes || 0;
          var t,
            a,
            s = this,
            n = o.files[0],
            l = n.size,
            c = o.uploadedBytes,
            u = o.maxChunkSize || l,
            h = this._blobSlice,
            d = v.Deferred(),
            i = d.promise();
          return (
            !(!(this._isXHRUpload(o) && h && (c || u < l)) || o.data) &&
            (!!e ||
              (l <= c
                ? ((n.error = o.i18n("uploadedBytes")),
                  this._getXHRPromise(!1, o.context, [null, "error", n.error]))
                : ((a = function () {
                    var i = v.extend({}, o),
                      r = i._progress.loaded;
                    (i.blob = h.call(n, c, c + u, n.type)),
                      (i.chunkSize = i.blob.size),
                      (i.contentRange =
                        "bytes " + c + "-" + (c + i.chunkSize - 1) + "/" + l),
                      s._initXHRData(i),
                      s._initProgressListener(i),
                      (t = (
                        (!1 !== s._trigger("chunksend", null, i) &&
                          v.ajax(i)) ||
                        s._getXHRPromise(!1, i.context)
                      )
                        .done(function (e, t, n) {
                          (c = s._getUploadedBytes(n) || c + i.chunkSize),
                            r + i.chunkSize - i._progress.loaded &&
                              s._onProgress(
                                v.Event("progress", {
                                  lengthComputable: !0,
                                  loaded: c - i.uploadedBytes,
                                  total: c - i.uploadedBytes,
                                }),
                                i
                              ),
                            (o.uploadedBytes = i.uploadedBytes = c),
                            (i.result = e),
                            (i.textStatus = t),
                            (i.jqXHR = n),
                            s._trigger("chunkdone", null, i),
                            s._trigger("chunkalways", null, i),
                            c < l ? a() : d.resolveWith(i.context, [e, t, n]);
                        })
                        .fail(function (e, t, n) {
                          (i.jqXHR = e),
                            (i.textStatus = t),
                            (i.errorThrown = n),
                            s._trigger("chunkfail", null, i),
                            s._trigger("chunkalways", null, i),
                            d.rejectWith(i.context, [e, t, n]);
                        }));
                  }),
                  this._enhancePromise(i),
                  (i.abort = function () {
                    return t.abort();
                  }),
                  a(),
                  i)))
          );
        },
        _beforeSend: function (e, t) {
          0 === this._active &&
            (this._trigger("start"),
            (this._bitrateTimer = new this._BitrateTimer()),
            (this._progress.loaded = this._progress.total = 0),
            (this._progress.bitrate = 0)),
            this._initResponseObject(t),
            this._initProgressObject(t),
            (t._progress.loaded = t.loaded = t.uploadedBytes || 0),
            (t._progress.total = t.total = this._getTotal(t.files) || 1),
            (t._progress.bitrate = t.bitrate = 0),
            (this._active += 1),
            (this._progress.loaded += t.loaded),
            (this._progress.total += t.total);
        },
        _onDone: function (e, t, n, i) {
          var r = i._progress.total,
            o = i._response;
          i._progress.loaded < r &&
            this._onProgress(
              v.Event("progress", {
                lengthComputable: !0,
                loaded: r,
                total: r,
              }),
              i
            ),
            (o.result = i.result = e),
            (o.textStatus = i.textStatus = t),
            (o.jqXHR = i.jqXHR = n),
            this._trigger("done", null, i);
        },
        _onFail: function (e, t, n, i) {
          var r = i._response;
          i.recalculateProgress &&
            ((this._progress.loaded -= i._progress.loaded),
            (this._progress.total -= i._progress.total)),
            (r.jqXHR = i.jqXHR = e),
            (r.textStatus = i.textStatus = t),
            (r.errorThrown = i.errorThrown = n),
            this._trigger("fail", null, i);
        },
        _onAlways: function (e, t, n, i) {
          this._trigger("always", null, i);
        },
        _onSend: function (e, t) {
          t.submit || this._addConvenienceMethods(e, t);
          var n,
            i,
            r,
            o,
            a = this,
            s = a._getAJAXSettings(t),
            l = function () {
              return (
                (a._sending += 1),
                (s._bitrateTimer = new a._BitrateTimer()),
                (n =
                  n ||
                  (
                    ((i ||
                      !1 ===
                        a._trigger(
                          "send",
                          v.Event("send", { delegatedEvent: e }),
                          s
                        )) &&
                      a._getXHRPromise(!1, s.context, i)) ||
                    a._chunkedUpload(s) ||
                    v.ajax(s)
                  )
                    .done(function (e, t, n) {
                      a._onDone(e, t, n, s);
                    })
                    .fail(function (e, t, n) {
                      a._onFail(e, t, n, s);
                    })
                    .always(function (e, t, n) {
                      if (
                        (a._onAlways(e, t, n, s),
                        (a._sending -= 1),
                        (a._active -= 1),
                        s.limitConcurrentUploads &&
                          s.limitConcurrentUploads > a._sending)
                      )
                        for (var i = a._slots.shift(); i; ) {
                          if ("pending" === a._getDeferredState(i)) {
                            i.resolve();
                            break;
                          }
                          i = a._slots.shift();
                        }
                      0 === a._active && a._trigger("stop");
                    }))
              );
            };
          return (
            this._beforeSend(e, s),
            this.options.sequentialUploads ||
            (this.options.limitConcurrentUploads &&
              this.options.limitConcurrentUploads <= this._sending)
              ? (1 < this.options.limitConcurrentUploads
                  ? ((r = v.Deferred()), this._slots.push(r), (o = r.pipe(l)))
                  : ((this._sequence = this._sequence.pipe(l, l)),
                    (o = this._sequence)),
                (o.abort = function () {
                  return (
                    (i = [undefined, "abort", "abort"]),
                    n ? n.abort() : (r && r.rejectWith(s.context, i), l())
                  );
                }),
                this._enhancePromise(o))
              : l()
          );
        },
        _onAdd: function (i, r) {
          var o,
            e,
            a,
            t,
            s = this,
            l = !0,
            n = v.extend({}, this.options, r),
            c = r.files,
            u = c.length,
            h = n.limitMultiFileUploads,
            d = n.limitMultiFileUploadSize,
            p = n.limitMultiFileUploadSizeOverhead,
            f = 0,
            m = this._getParamName(n),
            g = 0;
          if (
            (!d || (u && c[0].size !== undefined) || (d = undefined),
            (n.singleFileUploads || h || d) && this._isXHRUpload(n))
          )
            if (n.singleFileUploads || d || !h)
              if (!n.singleFileUploads && d)
                for (a = [], o = [], t = 0; t < u; t += 1)
                  (f += c[t].size + p),
                    (t + 1 === u ||
                      f + c[t + 1].size + p > d ||
                      (h && h <= t + 1 - g)) &&
                      (a.push(c.slice(g, t + 1)),
                      (e = m.slice(g, t + 1)).length || (e = m),
                      o.push(e),
                      (g = t + 1),
                      (f = 0));
              else o = m;
            else
              for (a = [], o = [], t = 0; t < u; t += h)
                a.push(c.slice(t, t + h)),
                  (e = m.slice(t, t + h)).length || (e = m),
                  o.push(e);
          else (a = [c]), (o = [m]);
          return (
            (r.originalFiles = c),
            v.each(a || c, function (e, t) {
              var n = v.extend({}, r);
              return (
                (n.files = a ? t : [t]),
                (n.paramName = o[e]),
                s._initResponseObject(n),
                s._initProgressObject(n),
                s._addConvenienceMethods(i, n),
                (l = s._trigger(
                  "add",
                  v.Event("add", { delegatedEvent: i }),
                  n
                ))
              );
            }),
            l
          );
        },
        _replaceFileInput: function (e) {
          var n = e.fileInput,
            i = n.clone(!0);
          (e.fileInputClone = i),
            v("<form></form>").append(i)[0].reset(),
            n.after(i).detach(),
            v.cleanData(n.unbind("remove")),
            (this.options.fileInput = this.options.fileInput.map(function (
              e,
              t
            ) {
              return t === n[0] ? i[0] : t;
            })),
            n[0] === this.element[0] && (this.element = i);
        },
        _handleFileTreeEntry: function (t, n) {
          var e,
            i = this,
            r = v.Deferred(),
            o = function (e) {
              e && !e.entry && (e.entry = t), r.resolve([e]);
            },
            a = function (e) {
              i._handleFileTreeEntries(e, n + t.name + "/")
                .done(function (e) {
                  r.resolve(e);
                })
                .fail(o);
            },
            s = function () {
              e.readEntries(function (e) {
                e.length ? ((l = l.concat(e)), s()) : a(l);
              }, o);
            },
            l = [];
          return (
            (n = n || ""),
            t.isFile
              ? t._file
                ? ((t._file.relativePath = n), r.resolve(t._file))
                : t.file(function (e) {
                    (e.relativePath = n), r.resolve(e);
                  }, o)
              : t.isDirectory
              ? ((e = t.createReader()), s())
              : r.resolve([]),
            r.promise()
          );
        },
        _handleFileTreeEntries: function (e, t) {
          var n = this;
          return v.when
            .apply(
              v,
              v.map(e, function (e) {
                return n._handleFileTreeEntry(e, t);
              })
            )
            .pipe(function () {
              return Array.prototype.concat.apply([], arguments);
            });
        },
        _getDroppedFiles: function (e) {
          var t = (e = e || {}).items;
          return t && t.length && (t[0].webkitGetAsEntry || t[0].getAsEntry)
            ? this._handleFileTreeEntries(
                v.map(t, function (e) {
                  var t;
                  return e.webkitGetAsEntry
                    ? ((t = e.webkitGetAsEntry()) && (t._file = e.getAsFile()),
                      t)
                    : e.getAsEntry();
                })
              )
            : v.Deferred().resolve(v.makeArray(e.files)).promise();
        },
        _getSingleFileInputFiles: function (e) {
          var t,
            n,
            i = (e = v(e)).prop("webkitEntries") || e.prop("entries");
          if (i && i.length) return this._handleFileTreeEntries(i);
          if ((t = v.makeArray(e.prop("files"))).length)
            t[0].name === undefined &&
              t[0].fileName &&
              v.each(t, function (e, t) {
                (t.name = t.fileName), (t.size = t.fileSize);
              });
          else {
            if (!(n = e.prop("value")))
              return v.Deferred().resolve([]).promise();
            t = [{ name: n.replace(/^.*\\/, "") }];
          }
          return v.Deferred().resolve(t).promise();
        },
        _getFileInputFiles: function (e) {
          return e instanceof v && 1 !== e.length
            ? v.when
                .apply(v, v.map(e, this._getSingleFileInputFiles))
                .pipe(function () {
                  return Array.prototype.concat.apply([], arguments);
                })
            : this._getSingleFileInputFiles(e);
        },
        _onChange: function (t) {
          var n = this,
            i = { fileInput: v(t.target), form: v(t.target.form) };
          this._getFileInputFiles(i.fileInput).always(function (e) {
            (i.files = e),
              n.options.replaceFileInput && n._replaceFileInput(i),
              !1 !==
                n._trigger(
                  "change",
                  v.Event("change", { delegatedEvent: t }),
                  i
                ) && n._onAdd(t, i);
          });
        },
        _onPaste: function (e) {
          var t =
              e.originalEvent &&
              e.originalEvent.clipboardData &&
              e.originalEvent.clipboardData.items,
            i = { files: [] };
          t &&
            t.length &&
            (v.each(t, function (e, t) {
              var n = t.getAsFile && t.getAsFile();
              n && i.files.push(n);
            }),
            !1 !==
              this._trigger(
                "paste",
                v.Event("paste", { delegatedEvent: e }),
                i
              ) && this._onAdd(e, i));
        },
        _onDrop: function (t) {
          t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
          var n = this,
            e = t.dataTransfer,
            i = {};
          e &&
            e.files &&
            e.files.length &&
            (t.preventDefault(),
            this._getDroppedFiles(e).always(function (e) {
              (i.files = e),
                !1 !==
                  n._trigger(
                    "drop",
                    v.Event("drop", { delegatedEvent: t }),
                    i
                  ) && n._onAdd(t, i);
            }));
        },
        _onDragOver: e("dragover"),
        _onDragEnter: e("dragenter"),
        _onDragLeave: e("dragleave"),
        _initEventHandlers: function () {
          this._isXHRUpload(this.options) &&
            (this._on(this.options.dropZone, {
              dragover: this._onDragOver,
              drop: this._onDrop,
              dragenter: this._onDragEnter,
              dragleave: this._onDragLeave,
            }),
            this._on(this.options.pasteZone, { paste: this._onPaste })),
            v.support.fileInput &&
              this._on(this.options.fileInput, { change: this._onChange });
        },
        _destroyEventHandlers: function () {
          this._off(this.options.dropZone, "dragenter dragleave dragover drop"),
            this._off(this.options.pasteZone, "paste"),
            this._off(this.options.fileInput, "change");
        },
        _setOption: function (e, t) {
          var n = -1 !== v.inArray(e, this._specialOptions);
          n && this._destroyEventHandlers(),
            this._super(e, t),
            n && (this._initSpecialOptions(), this._initEventHandlers());
        },
        _initSpecialOptions: function () {
          var e = this.options;
          e.fileInput === undefined
            ? (e.fileInput = this.element.is('input[type="file"]')
                ? this.element
                : this.element.find('input[type="file"]'))
            : e.fileInput instanceof v || (e.fileInput = v(e.fileInput)),
            e.dropZone instanceof v || (e.dropZone = v(e.dropZone)),
            e.pasteZone instanceof v || (e.pasteZone = v(e.pasteZone));
        },
        _getRegExp: function (e) {
          var t = e.split("/"),
            n = t.pop();
          return t.shift(), new RegExp(t.join("/"), n);
        },
        _isRegExpOption: function (e, t) {
          return (
            "url" !== e &&
            "string" === v.type(t) &&
            /^\/.*\/[igm]{0,3}$/.test(t)
          );
        },
        _initDataAttributes: function () {
          var r = this,
            o = this.options,
            a = this.element.data();
          v.each(this.element[0].attributes, function (e, t) {
            var n,
              i = t.name.toLowerCase();
            /^data-/.test(i) &&
              ((i = i.slice(5).replace(/-[a-z]/g, function (e) {
                return e.charAt(1).toUpperCase();
              })),
              (n = a[i]),
              r._isRegExpOption(i, n) && (n = r._getRegExp(n)),
              (o[i] = n));
          });
        },
        _create: function () {
          this._initDataAttributes(),
            this._initSpecialOptions(),
            (this._slots = []),
            (this._sequence = this._getXHRPromise(!0)),
            (this._sending = this._active = 0),
            this._initProgressObject(this),
            this._initEventHandlers();
        },
        active: function () {
          return this._active;
        },
        progress: function () {
          return this._progress;
        },
        add: function (t) {
          var n = this;
          t &&
            !this.options.disabled &&
            (t.fileInput && !t.files
              ? this._getFileInputFiles(t.fileInput).always(function (e) {
                  (t.files = e), n._onAdd(null, t);
                })
              : ((t.files = v.makeArray(t.files)), this._onAdd(null, t)));
        },
        send: function (t) {
          if (t && !this.options.disabled) {
            if (t.fileInput && !t.files) {
              var n,
                i,
                r = this,
                o = v.Deferred(),
                e = o.promise();
              return (
                (e.abort = function () {
                  return (
                    (i = !0),
                    n ? n.abort() : (o.reject(null, "abort", "abort"), e)
                  );
                }),
                this._getFileInputFiles(t.fileInput).always(function (e) {
                  i ||
                    (e.length
                      ? ((t.files = e),
                        (n = r._onSend(null, t)).then(
                          function (e, t, n) {
                            o.resolve(e, t, n);
                          },
                          function (e, t, n) {
                            o.reject(e, t, n);
                          }
                        ))
                      : o.reject());
                }),
                this._enhancePromise(e)
              );
            }
            if (((t.files = v.makeArray(t.files)), t.files.length))
              return this._onSend(null, t);
          }
          return this._getXHRPromise(!1, t && t.context);
        },
      });
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery", "./jquery.fileupload"], e)
      : "object" == typeof exports
      ? e(require("jquery"))
      : e(window.jQuery);
  })(function (a) {
    "use strict";
    var i = a.blueimp.fileupload.prototype.options.add;
    a.widget("blueimp.fileupload", a.blueimp.fileupload, {
      options: {
        processQueue: [],
        add: function (e, t) {
          var n = a(this);
          t.process(function () {
            return n.fileupload("process", t);
          }),
            i.call(this, e, t);
        },
      },
      processActions: {},
      _processFile: function (e, i) {
        var r = this,
          o = a.Deferred().resolveWith(r, [e]).promise();
        return (
          this._trigger("process", null, e),
          a.each(e.processQueue, function (e, t) {
            var n = function (e) {
              return i.errorThrown
                ? a.Deferred().rejectWith(r, [i]).promise()
                : r.processActions[t.action].call(r, e, t);
            };
            o = o.pipe(n, t.always && n);
          }),
          o
            .done(function () {
              r._trigger("processdone", null, e),
                r._trigger("processalways", null, e);
            })
            .fail(function () {
              r._trigger("processfail", null, e),
                r._trigger("processalways", null, e);
            }),
          o
        );
      },
      _transformProcessQueue: function (r) {
        var t = [];
        a.each(r.processQueue, function () {
          var n = {},
            e = this.action,
            i = !0 === this.prefix ? e : this.prefix;
          a.each(this, function (e, t) {
            "string" === a.type(t) && "@" === t.charAt(0)
              ? (n[e] =
                  r[
                    t.slice(1) ||
                      (i ? i + e.charAt(0).toUpperCase() + e.slice(1) : e)
                  ])
              : (n[e] = t);
          }),
            t.push(n);
        }),
          (r.processQueue = t);
      },
      processing: function () {
        return this._processing;
      },
      process: function (i) {
        var r = this,
          o = a.extend({}, this.options, i);
        return (
          o.processQueue &&
            o.processQueue.length &&
            (this._transformProcessQueue(o),
            0 === this._processing && this._trigger("processstart"),
            a.each(i.files, function (e) {
              var t = e ? a.extend({}, o) : o,
                n = function () {
                  return i.errorThrown
                    ? a.Deferred().rejectWith(r, [i]).promise()
                    : r._processFile(t, i);
                };
              (t.index = e),
                (r._processing += 1),
                (r._processingQueue = r._processingQueue
                  .pipe(n, n)
                  .always(function () {
                    (r._processing -= 1),
                      0 === r._processing && r._trigger("processstop");
                  }));
            })),
          this._processingQueue
        );
      },
      _create: function () {
        this._super(),
          (this._processing = 0),
          (this._processingQueue = a.Deferred().resolveWith(this).promise());
      },
    });
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery", "./jquery.fileupload-process"], e)
      : "object" == typeof exports
      ? e(require("jquery"))
      : e(window.jQuery);
  })(function (a) {
    "use strict";
    a.blueimp.fileupload.prototype.options.processQueue.push({
      action: "validate",
      always: !0,
      acceptFileTypes: "@",
      maxFileSize: "@",
      minFileSize: "@",
      maxNumberOfFiles: "@",
      disabled: "@disableValidation",
    }),
      a.widget("blueimp.fileupload", a.blueimp.fileupload, {
        options: {
          getNumberOfFiles: a.noop,
          messages: {
            maxNumberOfFiles: "Maximum number of files exceeded",
            acceptFileTypes: "File type not allowed",
            maxFileSize: "File is too large",
            minFileSize: "File is too small",
          },
        },
        processActions: {
          validate: function (e, t) {
            if (t.disabled) return e;
            var n,
              i = a.Deferred(),
              r = this.options,
              o = e.files[e.index];
            return (
              (t.minFileSize || t.maxFileSize) && (n = o.size),
              "number" === a.type(t.maxNumberOfFiles) &&
              (r.getNumberOfFiles() || 0) + e.files.length > t.maxNumberOfFiles
                ? (o.error = r.i18n("maxNumberOfFiles"))
                : !t.acceptFileTypes ||
                  t.acceptFileTypes.test(o.type) ||
                  t.acceptFileTypes.test(o.name)
                ? n > t.maxFileSize
                  ? (o.error = r.i18n("maxFileSize"))
                  : "number" === a.type(n) && n < t.minFileSize
                  ? (o.error = r.i18n("minFileSize"))
                  : delete o.error
                : (o.error = r.i18n("acceptFileTypes")),
              o.error || e.files.error
                ? ((e.files.error = !0), i.rejectWith(this, [e]))
                : i.resolveWith(this, [e]),
              i.promise()
            );
          },
        },
      });
  }),
  (window.S3DirectUploader = function (e) {
    function t(e) {
      (w = (b = e || {}).$dropZone),
        (x = b.$form),
        (_ = b.$progressBar),
        (E = b.$trigger),
        (S = b.$fileTypes),
        n(),
        r();
    }
    function n() {
      x.fileupload({
        dataType: "xml",
        dropZone: w,
        add: c,
        progress: a,
        done: s,
        fail: l,
        always: v,
      });
    }
    function i() {
      var e = x.serializeArray();
      return (
        e.push({ name: "Content-Type", value: "application/octet-stream" }), e
      );
    }
    function r() {
      E.on("click", y);
    }
    function o(e) {
      (C[e.name] = !0), x.fileupload("add", { files: [e] });
    }
    function a(e, t) {
      var n = (t.loaded / t.total) * 100;
      _.find(".bar").css("width", n + "%");
    }
    function s(e, t) {
      var n = t.files[0],
        i = $(t.result.documentElement.getElementsByTagName("Location")).text();
      b.uploadComplete({ filename: n.name, url: i });
    }
    function l(e, t) {
      var n = t.jqXHR && t.jqXHR.responseText;
      "abort" !== t.textStatus ? b.uploadFailed(e, n) : b.uploadCancelled();
    }
    function c(e, t) {
      var n = t.files[0];
      u(),
        b.uploadStarted(),
        g(n)
          ? ((t.formData = i(n)),
            m(t.submit()),
            w.removeClass("highlight"),
            w.hide(),
            _.show())
          : t.submit().abort();
    }
    function u() {
      h(), d();
    }
    function h() {
      var e = x.find('input[name="key"]'),
        t = x.data("key-template");
      (t = t.replace("{timestamp}", p()).replace("{unique_id}", f())),
        e.attr("value", t);
    }
    function d() {
      0 < x.find('input[name="authenticity_token"]').length ||
        x.append(
          $("<input/>").attr("name", "authenticity_token").attr("value", f())
        );
    }
    function p() {
      return new Date().getTime();
    }
    function f() {
      return Math.random().toString(36).substr(2, 16);
    }
    function m(e) {
      (cancel = _.find(".cancel")),
        cancel.unbind("click"),
        cancel.click(function () {
          e.abort();
        });
    }
    function g(e) {
      return !(
        !e.name ||
        (S
          ? 0 !== S.length &&
            !C[e.name] &&
            !Validate.specificFileFormat(S)(e.name) &&
            (alert(
              "Invalid file format selected. Allowed formats are: " +
                S.join(", ")
            ),
            1)
          : ("undefined" != typeof Rollbar &&
              Rollbar.error(
                "A list of valid file types is available for this organization."
              ),
            alert(
              "We were unable to accept your file upload for unknown reasons."
            ),
            1))
      );
    }
    function v() {
      _.hide();
    }
    function y() {
      x.find(":file").click();
    }
    var b,
      w,
      x,
      _,
      E,
      S,
      C = {};
    return t(e), { uploadFile: o };
  }),
  (window.DropboxChooser = function (e) {
    function t(e) {
      (o = (r = e || {}).$trigger),
        (r.uploadComplete = r.uploadComplete || function () {}),
        o.on("click", i);
    }
    function n(e) {
      var t = e[0];
      r.$messages.hide(), r.uploadComplete({ filename: t.name, url: t.link });
    }
    function i() {
      if (Dropbox) {
        if (!Dropbox.isBrowserSupported())
          return (
            r.$messages
              .text(Message.Uploaders.Dropbox.WithoutBrowserSupport)
              .show(),
            void o.remove()
          );
        Dropbox.choose({
          success: n,
          cancel: r.uploadCancelled,
          linkType: "direct",
          extensions: ["documents", "text"],
        }),
          r.uploadStarted(),
          r.$messages.text(Message.Uploaders.Dropbox.LoadingAttachment).show();
      } else r.$messages.text(Message.Uploaders.Dropbox.TryAgain).show();
    }
    var r, o;
    t(e);
  });
var JBEN,
  Util = Util || {};
(Util.unsupportedBrowser = function () {
  return (
    "Microsoft Internet Explorer" == window.navigator.appName &&
    document.documentMode <= 9
  );
}),
  (Util.mobileDevice = function () {
    return /Mobi/.test(navigator.userAgent);
  }),
  (Util.setIdsOnLabelsAndInputs = function (e, i) {
    e.find('input[id]:not([type="hidden"])').each(function (e, t) {
      var n = $(t).attr("id") + "_" + i;
      $(t).attr("id", n), $(t).parents(".field").find("label").attr("for", n);
    });
  }),
  (Util.setIdsOnAllElements = function (e, a) {
    e.find(".field > [id]").each(function (e, t) {
      var n = $(t),
        i = n.attr("id"),
        r = i + "_" + a;
      if ((n.attr("id", r), n.is("input") || n.is("select"))) {
        var o = n.parent(".field").find('> label[for="' + i + '"]');
        o && o.attr("for", r);
      }
    });
  }),
  (Util.addAriaToSelect2 = function (r, o) {
    var a = 0;
    r.each(function (e, t) {
      var n = $(t),
        i = "select2List" + a;
      n.on("select2-open", function () {
        var e = $("#select2-drop");
        e.find(".select2-results").attr("role", "listbox"),
          e
            .find("input")
            .attr({
              role: "combobox",
              "aria-expanded": "true",
              "aria-autocomplete": "both",
              "aria-activedescendant": "selectedOption",
              "aria-controls": i,
            }),
          r
            .siblings(".select2-container-multi")
            .find(".select2-search-field input")
            .attr({
              role: "combobox",
              "aria-expanded": "true",
              "aria-autocomplete": "inline",
              "aria-activedescendant": "selectedOption",
              "aria-controls": i,
            });
      }),
        n.on("select2-loaded", function () {
          var e = $("#select2-drop");
          e.find("ul").attr("id", i), e.find("li").attr("role", "option");
        }),
        n.on("select2-highlight", function () {
          $(".select2-result").attr({ "aria-selected": !1, id: "" }),
            $(".select2-highlighted").attr({
              "aria-selected": !0,
              id: "selectedOption",
            });
        }),
        o &&
          n.on("change", function (e) {
            $(e.target)
              .siblings(".select2-container")
              .find("input")
              .val(e.added.text);
          }),
        a++;
    });
  }),
  ((JBEN = JBEN || {}).FormControl = {
    initFileChooser: function (e) {
      $("#" + e + "_button").click(function () {
        JBEN.FormControl.attachFileButton(e);
      });
    },
    initFilenameDisplayWithValidation: function (e, t, n, i, r) {
      $("#" + e + "_chooser").change(function () {
        JBEN.FormControl.validateAndSetFilename(e, t, n, i, r);
      });
    },
    attachFileButton: function (e) {
      is_safari || is_explorer
        ? this.initFileChooserForSafari(e)
        : $("#" + e + "_chooser").trigger("click"),
        $("#" + e).val(""),
        $("#" + e + "_paste").hide();
    },
    initFileChooserForSafari: function (e) {
      var t = $("#" + e + "_chooser"),
        n = Handlebars.compile('<div class="{{alt_css_class}}"></div>'),
        i = "alt-upload-" + e.replace(/_/g, "-"),
        r = $("#" + e + "_actions");
      r.after(n({ alt_css_class: i })),
        $("." + i).append(t.detach()),
        t.show(),
        r.hide();
    },
    validateAndSetFilename: function (e, t, n, i, r) {
      var o = $("#" + e + "_chooser"),
        a = FileUtil.getFilenameFromPath(o.val());
      Validate.field("#" + e + "_chooser", t, n)
        ? ($("#" + e + "_filename").html(a),
          is_safari || is_explorer || $("#" + e + "_filename_container").show(),
          "function" == typeof i && i())
        : (JBEN.FormControl.clearFileChooserAndFilename(e),
          "function" == typeof r && r());
    },
    clearFileChooserAndFilename: function (e) {
      JBEN.FormControl.clearFileChooser("#" + e + "_chooser"),
        $("#" + e + "_filename").html(""),
        $("#" + e + "_filename_container").hide(),
        $("#" + e + "_url").val("");
    },
    clearFileChooser: function (e) {
      var t = $(e);
      t.val("");
      var n = t.clone(!0);
      return t.replaceWith(n), n;
    },
    attachOrPaste: function (e, t) {
      var E = (t = t || {}).uploadStarted || function () {},
        S = t.uploadFinished || function () {},
        C = t.attachmentRemoved || function () {};
      $(e).each(function () {
        function e() {
          g.find('[data-source="paste"]').on("click", o),
            h(g)
              ? ($(document).on("greenhouse.s3forms.loaded", n), t())
              : b.remove(),
            i();
        }
        function t() {
          new GoogleDrivePicker({
            $trigger: b,
            $messages: x,
            uploadCancelled: c,
            uploadComplete: l,
            uploadFinished: s,
            uploadStarted: a,
            uploadToS3: r,
          });
        }
        function n() {
          m = new S3DirectUploader({
            $form: $(p("#s3_upload_for_" + y)),
            $trigger: g.find('[data-source="attach"]'),
            $dropZone: g.find(".drop-zone"),
            $progressBar: g.find(".progress-bar"),
            $fileTypes: g.data("file-types"),
            uploadCancelled: c,
            uploadComplete: l,
            uploadFailed: u,
            uploadStarted: a,
          });
        }
        function i() {
          new DropboxChooser({
            $trigger: g.find('[data-source="dropbox"]'),
            $messages: x,
            uploadComplete: l,
            uploadCancelled: c,
            uploadStarted: a,
          });
        }
        function r(e) {
          m.uploadFile(e);
        }
        function o() {
          var e = g.find("textarea.paste");
          $(this).toggleClass("active"),
            $(this).attr(
              "aria-pressed",
              "false" === $(this).attr("aria-pressed")
            ),
            e.toggle(),
            e.is(":visible") && e.focus(),
            $(document).trigger("greenhouse.jobApplication.heightExpanded");
        }
        function a() {
          g.find("textarea.paste").hide(), w.hide(), E();
        }
        function s() {
          x.hide(), S(y);
        }
        function l(e) {
          JBEN.FormControl.attachFromUrl(
            g.closest("form"),
            _,
            y,
            e.filename,
            e.url,
            C
          ),
            s();
        }
        function c() {
          x.hide(),
            JBEN.FormControl.clearFileChooserAndFilename(_),
            w.show(),
            S(y);
        }
        function u(e, t) {
          "undefined" != typeof Rollbar &&
            Rollbar.warn("Failed S3 Direct Upload for field: " + y, t),
            w
              .addClass("error")
              .text(
                "Application form expired.  Please refresh the page and try again."
              ),
            c(),
            console && console.log("Total failure. Event:", e, ", error:", t);
        }
        function h(e) {
          return !!f(e) || (v.on("click", d), !1);
        }
        function d() {
          var e = $("<span />"),
            t = $("<input type='file' />")
              .attr("id", y + "_file")
              .attr("name", _ + "[" + y + "]"),
            n = $('<a href="#" />').text("Cancel");
          e.append(t).append(n),
            ($oldLinkContainer = w.replaceWith(e)),
            (fileTypes = t.closest(".attach-or-paste").data("file-types")),
            n.on("click", function () {
              e.replaceWith($oldLinkContainer),
                (w = $oldLinkContainer),
                v.on("click", d),
                g.find('[data-source="paste"]').on("click", o);
            }),
            t.on("change", function () {
              Validate.specificFileFormat(fileTypes)(t.val()) ||
                (alert(
                  "Invalid file format selected. Allowed formats are: " +
                    fileTypes.join(", ")
                ),
                t.val(""),
                t.replaceWith((t = t.clone(!0))));
            });
        }
        function p(e) {
          return e.replace(/\[/, "\\[").replace(/\]/, "\\]");
        }
        function f(e) {
          return e.data("allowS3") && !Util.unsupportedBrowser();
        }
        var m,
          g = $(this),
          v = g.find('[data-source="attach"]'),
          y = g.data("field"),
          b = g.find('[data-source="google-drive"]'),
          w = g.find(".link-container"),
          x = g.find('[data-messages="uploaders"]'),
          _ = g.data("model");
        e();
      });
    },
    registerFileChooser: function (e) {
      function t() {
        var e = $(this).parent().attr("data-id");
        i.val(_.compact([i.val(), e]).join(",")),
          n.show(),
          $(this).parent().remove();
      }
      var n = $(e).next("input[type=file]"),
        i = n.next("input[type=hidden].clear-attachment");
      $(e).find(".x").on("click", t);
    },
    attachFromUrl: function (e, t, n, i, r, o) {
      function a() {
        JBEN.FormControl.clearFileChooserAndFilename(n),
          u.hide(),
          d.hide(),
          h.show(),
          l.remove(),
          c.remove(),
          u.find('[data-source="attach"]').focus(),
          o();
      }
      var s = n + "_url",
        l = $("#" + s),
        c = $("#" + s + "_filename"),
        u = $("#" + n + "_chosen"),
        h = u.parent().find(".link-container"),
        d = u.find("button.remove"),
        p = h.closest(".attach-or-paste").data("file-types");
      if (p && !Validate.specificFileFormat(p, i))
        return (
          alert(
            "Invalid file format selected. Allowed formats are: " + p.join(", ")
          ),
          a(),
          !1
        );
      0 === l.length &&
        ((l = $("<input type='hidden' />")
          .attr("id", s)
          .attr("name", t + "[" + s + "]")
          .appendTo(e)),
        (c = $("<input type='hidden' />")
          .attr("id", s + "_filename")
          .attr("name", t + "[" + s + "_filename]")
          .appendTo(e))),
        u.on("click", "button.remove", a),
        d.css("display", "inline-block"),
        JBEN.FormControl.clearFileChooserAndFilename(n),
        l.val(r),
        c.val(i),
        e.find("div[data-field='" + n + "'] .link-container").hide(),
        u.show(),
        d.css("display", "inline-block"),
        $("#" + n + "_text").hide(),
        $("#" + n + "_filename").text(i);
    },
    useUploadResumeChooser: function (e, t) {
      var n = $("div[data-field='resume']");
      n.find('[name="person[resume]"]').remove(),
        n.find(".link-container").hide(),
        $("#resume_filename").text(e),
        $("#resume_chosen").show(),
        $("#resume_text").hide(),
        JBEN.FormControl.attachFromUrl(
          n.closest("form"),
          "job_application",
          "resume",
          e,
          t,
          function () {}
        );
    },
    addHiddenFormField: function (e, t) {
      var n = $('div[data-field="resume"]').closest("form"),
        i = $("#" + e);
      0 === i.length &&
        (i = $('<input type="hidden" />')
          .attr("id", e)
          .attr("name", e)
          .appendTo(n)),
        i.val(t);
    },
  }),
  ((JBEN = JBEN || {}).DropZones = {
    setup: function (t) {
      function e() {
        t.hide(), t.html("Drop files here"), t.removeClass("highlight");
      }
      var n = 0;
      $(document).on("drop dragover", function (e) {
        t.hide(), e.preventDefault();
      }),
        $(document).on("dragover", function () {
          t.css({ display: "inline-block" }), window.clearTimeout(n);
        }),
        $(document).on("dragleave", function () {
          window.clearTimeout(n),
            (n = window.setTimeout(function () {
              e();
            }, 85));
        }),
        t.on("dragenter", function () {
          $(this).addClass("highlight");
        }),
        t.on("dragleave", function () {
          $(this).removeClass("highlight");
        });
    },
  }),
  ((JBEN = JBEN || {}).QuestionDropdowns = {
    selector: "select.question.dropdown",
    init: function () {
      $(this.selector).select2({
        minimumResultsForSearch: 3,
        allowClear: !0,
        width: "526px",
      });
    },
    translateValues: function () {
      $(this.selector).each(function (e, t) {
        var n = $(t),
          i = n.parents("form"),
          r = n.data("prefix"),
          o = n.data("suffix");
        _.each(n.val(), function (e, t) {
          $('<input type="hidden">')
            .attr("name", r + "[" + t + "]" + o)
            .val(e)
            .appendTo(i);
        });
      });
    },
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return t(e);
        })
      : "object" == typeof exports
      ? (module.exports = t(e))
      : (e.Polyglot = t(e));
  })(this, function (t) {
    "use strict";
    function e(e) {
      (e = e || {}),
        (this.phrases = {}),
        this.extend(e.phrases || {}),
        (this.currentLocale = e.locale || "en"),
        (this.allowMissing = !!e.allowMissing),
        (this.warn = e.warn || l);
    }
    function n(e) {
      var t,
        n,
        i,
        r = {};
      for (t in e) if (e.hasOwnProperty(t)) for (i in (n = e[t])) r[n[i]] = t;
      return r;
    }
    function o(e) {
      var t = /^\s+|\s+$/g;
      return e.replace(t, "");
    }
    function r(e, t, n) {
      var i, r;
      return (
        null != n && e ? (i = o((r = e.split(u))[a(t, n)] || r[0])) : (i = e), i
      );
    }
    function i(e) {
      var t = n(d);
      return t[e] || t.en;
    }
    function a(e, t) {
      return h[i(e)](t);
    }
    function s(e, t) {
      for (var n in t)
        "_" !== n &&
          t.hasOwnProperty(n) &&
          (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
      return e;
    }
    function l(e) {
      t.console && t.console.warn && t.console.warn("WARNING: " + e);
    }
    function c(e) {
      var t = {};
      for (var n in e) t[n] = e[n];
      return t;
    }
    (e.VERSION = "0.4.3"),
      (e.prototype.locale = function (e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }),
      (e.prototype.extend = function (e, t) {
        var n;
        for (var i in e)
          e.hasOwnProperty(i) &&
            ((n = e[i]),
            t && (i = t + "." + i),
            "object" == typeof n ? this.extend(n, i) : (this.phrases[i] = n));
      }),
      (e.prototype.clear = function () {
        this.phrases = {};
      }),
      (e.prototype.replace = function (e) {
        this.clear(), this.extend(e);
      }),
      (e.prototype.t = function (e, t) {
        var n, i;
        return (
          "number" == typeof (t = null == t ? {} : t) &&
            (t = { smart_count: t }),
          "string" == typeof this.phrases[e]
            ? (n = this.phrases[e])
            : "string" == typeof t._
            ? (n = t._)
            : this.allowMissing
            ? (n = e)
            : (this.warn('Missing translation for key: "' + e + '"'), (i = e)),
          "string" == typeof n &&
            ((t = c(t)),
            (i = s((i = r(n, this.currentLocale, t.smart_count)), t))),
          i
        );
      }),
      (e.prototype.has = function (e) {
        return e in this.phrases;
      });
    var u = "||||",
      h = {
        chinese: function () {
          return 0;
        },
        german: function (e) {
          return 1 !== e ? 1 : 0;
        },
        french: function (e) {
          return 1 < e ? 1 : 0;
        },
        russian: function (e) {
          return e % 10 == 1 && e % 100 != 11
            ? 0
            : 2 <= e % 10 && e % 10 <= 4 && (e % 100 < 10 || 20 <= e % 100)
            ? 1
            : 2;
        },
        czech: function (e) {
          return 1 === e ? 0 : 2 <= e && e <= 4 ? 1 : 2;
        },
        polish: function (e) {
          return 1 === e
            ? 0
            : 2 <= e % 10 && e % 10 <= 4 && (e % 100 < 10 || 20 <= e % 100)
            ? 1
            : 2;
        },
        icelandic: function (e) {
          return e % 10 != 1 || e % 100 == 11 ? 1 : 0;
        },
      },
      d = {
        chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
        german: [
          "da",
          "de",
          "en",
          "es",
          "fi",
          "el",
          "he",
          "hu",
          "it",
          "nl",
          "no",
          "pt",
          "sv",
        ],
        french: ["fr", "tl", "pt-br"],
        russian: ["hr", "ru"],
        czech: ["cs"],
        polish: ["pl"],
        icelandic: ["is"],
      };
    return e;
  }),
  ((JBEN = JBEN || {}).DemographicQuestions = {
    setup: function () {
      $("#demographic_questions")
        .find(".free-form-checkbox")
        .on("change", this.toggleTextWrapper),
        this.declineToAnswerToggle();
    },
    declineToAnswerToggle: function () {
      $(".demographic_question input[type=checkbox]").on("click", function () {
        var e = $(this);
        if (e.is(":checked")) {
          var t,
            n = e.closest(".demographic_question");
          (t = e.hasClass("decline-answer-checkbox")
            ? n.find(
                "input[type=checkbox]:not(.decline-answer-checkbox):checked"
              )
            : e.hasClass("single-select")
            ? n.find("input[type=checkbox]:checked").not(e)
            : n.find(
                "input[type=checkbox].decline-answer-checkbox"
              )).removeAttr("checked"),
            t.change();
        }
      });
    },
    toggleTextWrapper: function () {
      var e = $(this),
        t = e.is(":checked"),
        n = e.parents(".field").find(".free-form-text"),
        i = n.find("input[type=text]");
      i.val(""), i.enable(t), n.toggle(), t && i.focus();
    },
  }),
  ((JBEN = JBEN || {}).Location = {
    setup: function () {
      if (window.customElements) this.initialize();
      else {
        var e = this;
        this.loadScript(
          "/assets/location_control_polyfill-f6c4c2f5ecdde85951e3ed44676fa3063993a648d68cd57a98ff7a4860e79094.js",
          function () {
            e.initialize();
          }
        );
      }
    },
    initialize: function () {
      var e = "#location_autocomplete_root",
        t = "#job_application_location",
        n = $(e).data();
      if (n) {
        var i = LocationControl.Providers.Mapbox.apiKey,
          r = LocationControl.Providers.Pelias.apiKey;
        new LocationControl.Initializer(e).createElement({
          location_provider: n.location_provider,
          location_type: n.location_type,
          required: n.required,
          maxlength: n.maxlength,
        }),
          (LocationControl.Providers.Mapbox.apiKey = i),
          (LocationControl.Providers.Pelias.apiKey = r),
          $(t).locationControl();
      }
    },
    loadScript: function (e, t) {
      var n = document.createElement("script");
      (n.src = e),
        (n.onload = function () {
          t();
        }),
        (n.onerror = function () {
          t(new Error("Failed to load script " + e));
        }),
        document.head.appendChild(n);
    },
  }),
  (function () {
    function h(e, t) {
      var n =
        ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = (function (e, t) {
            if (e) {
              if ("string" == typeof e) return l(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              return (
                "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(e)
                  : "Arguments" === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? l(e, t)
                  : void 0
              );
            }
          })(e)) ||
          (t && e && "number" == typeof e.length)
        ) {
          n && (e = n);
          var i = 0,
            r = function () {};
          return {
            s: r,
            n: function () {
              return i >= e.length ? { done: !0 } : { done: !1, value: e[i++] };
            },
            e: function (e) {
              throw e;
            },
            f: r,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var o,
        a = !0,
        s = !1;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          return (a = e.done), e;
        },
        e: function (e) {
          (s = !0), (o = e);
        },
        f: function () {
          try {
            a || null == n["return"] || n["return"]();
          } finally {
            if (s) throw o;
          }
        },
      };
    }
    function l(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function c(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    function u(e) {
      if (e.target instanceof Element) {
        var t = e.target.closest('[role="option"]');
        t &&
          "true" !== t.getAttribute("aria-disabled") &&
          t.dispatchEvent(new CustomEvent("combobox-commit", { bubbles: !0 }));
      }
    }
    function d(e, t) {
      var n = t.querySelector(
        '[aria-selected="true"], [data-combobox-option-default="true"]'
      );
      return !(
        !n ||
        ("true" !== n.getAttribute("aria-disabled") && (n.click(), 0))
      );
    }
    function p(e) {
      return (
        !e.hidden &&
        !(e instanceof HTMLInputElement && "hidden" === e.type) &&
        (0 < e.offsetWidth || 0 < e.offsetHeight)
      );
    }
    function f(e, t) {
      var n, i, r, o, a, s;
      (i = t),
        (r = (n = e).scrollTop),
        (o = r + n.clientHeight),
        (a = i.offsetTop),
        (s = a + i.clientHeight),
        (r <= a && s <= o) || (e.scrollTop = t.offsetTop);
    }
    function T(e) {
      return (T =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function A() {
      "use strict";
      function n(e, t, n) {
        return (
          Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          e[t]
        );
      }
      function a(e, t, n, i) {
        var o,
          a,
          s,
          l,
          r = t && t.prototype instanceof d ? t : d,
          c = Object.create(r.prototype),
          u = new f(i || []);
        return (
          (c._invoke =
            ((o = e),
            (a = n),
            (s = u),
            (l = "suspendedStart"),
            function (e, t) {
              if ("executing" === l)
                throw new Error("Generator is already running");
              if ("completed" === l) {
                if ("throw" === e) throw t;
                return m();
              }
              for (s.method = e, s.arg = t; ; ) {
                var n = s.delegate;
                if (n) {
                  var i = p(n, s);
                  if (i) {
                    if (i === x) continue;
                    return i;
                  }
                }
                if ("next" === s.method) s.sent = s._sent = s.arg;
                else if ("throw" === s.method) {
                  if ("suspendedStart" === l) throw ((l = "completed"), s.arg);
                  s.dispatchException(s.arg);
                } else "return" === s.method && s.abrupt("return", s.arg);
                l = "executing";
                var r = h(o, a, s);
                if ("normal" === r.type) {
                  if (
                    ((l = s.done ? "completed" : "suspendedYield"), r.arg === x)
                  )
                    continue;
                  return { value: r.arg, done: s.done };
                }
                "throw" === r.type &&
                  ((l = "completed"), (s.method = "throw"), (s.arg = r.arg));
              }
            })),
          c
        );
      }
      function h(e, t, n) {
        try {
          return { type: "normal", arg: e.call(t, n) };
        } catch (i) {
          return { type: "throw", arg: i };
        }
      }
      function d() {}
      function i() {}
      function t() {}
      function e(e) {
        ["next", "throw", "return"].forEach(function (t) {
          n(e, t, function (e) {
            return this._invoke(t, e);
          });
        });
      }
      function s(l, c) {
        var i;
        this._invoke = function (t, n) {
          function e() {
            return new c(function (s, e) {
              !(function s(e, t, n, i) {
                var r = h(l[e], l, t);
                if ("throw" !== r.type) {
                  var o = r.arg,
                    a = o.value;
                  return a && "object" == T(a) && g.call(a, "__await")
                    ? c.resolve(a.__await).then(
                        function (e) {
                          s("next", e, n, i);
                        },
                        function (e) {
                          s("throw", e, n, i);
                        }
                      )
                    : c.resolve(a).then(
                        function (e) {
                          (o.value = e), n(o);
                        },
                        function (e) {
                          return s("throw", e, n, i);
                        }
                      );
                }
                i(r.arg);
              })(t, n, s, e);
            });
          }
          return (i = i ? i.then(e, e) : e());
        };
      }
      function p(e, t) {
        var n = e.iterator[t.method];
        if (void 0 === n) {
          if (((t.delegate = null), "throw" === t.method)) {
            if (
              e.iterator["return"] &&
              ((t.method = "return"),
              (t.arg = void 0),
              p(e, t),
              "throw" === t.method)
            )
              return x;
            (t.method = "throw"),
              (t.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return x;
        }
        var i = h(n, e.iterator, t.arg);
        if ("throw" === i.type)
          return (t.method = "throw"), (t.arg = i.arg), (t.delegate = null), x;
        var r = i.arg;
        return r
          ? r.done
            ? ((t[e.resultName] = r.value),
              (t.next = e.nextLoc),
              "return" !== t.method && ((t.method = "next"), (t.arg = void 0)),
              (t.delegate = null),
              x)
            : r
          : ((t.method = "throw"),
            (t.arg = new TypeError("iterator result is not an object")),
            (t.delegate = null),
            x);
      }
      function r(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function o(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function f(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(r, this),
          this.reset(!0);
      }
      function l(e) {
        if (e) {
          var t = e[y];
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var n = -1,
              i = function t() {
                for (; ++n < e.length; )
                  if (g.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                return (t.value = void 0), (t.done = !0), t;
              };
            return (i.next = i);
          }
        }
        return { next: m };
      }
      function m() {
        return { value: void 0, done: !0 };
      }
      A = function () {
        return c;
      };
      var c = {},
        u = Object.prototype,
        g = u.hasOwnProperty,
        v = "function" == typeof Symbol ? Symbol : {},
        y = v.iterator || "@@iterator",
        b = v.asyncIterator || "@@asyncIterator",
        w = v.toStringTag || "@@toStringTag";
      try {
        n({}, "");
      } catch (k) {
        n = function (e, t, n) {
          return (e[t] = n);
        };
      }
      c.wrap = a;
      var x = {},
        _ = {};
      n(_, y, function () {
        return this;
      });
      var E = Object.getPrototypeOf,
        S = E && E(E(l([])));
      S && S !== u && g.call(S, y) && (_ = S);
      var C = (t.prototype = d.prototype = Object.create(_));
      return (
        (i.prototype = t),
        n(C, "constructor", t),
        n(t, "constructor", i),
        (i.displayName = n(t, w, "GeneratorFunction")),
        (c.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;
          return (
            !!t &&
            (t === i || "GeneratorFunction" === (t.displayName || t.name))
          );
        }),
        (c.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : ((e.__proto__ = t), n(e, w, "GeneratorFunction")),
            (e.prototype = Object.create(C)),
            e
          );
        }),
        (c.awrap = function (e) {
          return { __await: e };
        }),
        e(s.prototype),
        n(s.prototype, b, function () {
          return this;
        }),
        (c.AsyncIterator = s),
        (c.async = function (e, t, n, i, r) {
          void 0 === r && (r = Promise);
          var o = new s(a(e, t, n, i), r);
          return c.isGeneratorFunction(t)
            ? o
            : o.next().then(function (e) {
                return e.done ? e.value : o.next();
              });
        }),
        e(C),
        n(C, w, "Generator"),
        n(C, y, function () {
          return this;
        }),
        n(C, "toString", function () {
          return "[object Generator]";
        }),
        (c.keys = function (t) {
          var n = [];
          for (var i in t) n.push(i);
          return (
            n.reverse(),
            function i() {
              for (; n.length; ) {
                var e = n.pop();
                if (e in t) return (i.value = e), (i.done = !1), i;
              }
              return (i.done = !0), i;
            }
          );
        }),
        (c.values = l),
        (f.prototype = {
          constructor: f,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(o),
              !e)
            )
              for (var t in this)
                "t" === t.charAt(0) &&
                  g.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = void 0);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (n) {
            function e(e, t) {
              return (
                (o.type = "throw"),
                (o.arg = n),
                (i.next = e),
                t && ((i.method = "next"), (i.arg = void 0)),
                !!t
              );
            }
            if (this.done) throw n;
            for (var i = this, t = this.tryEntries.length - 1; 0 <= t; --t) {
              var r = this.tryEntries[t],
                o = r.completion;
              if ("root" === r.tryLoc) return e("end");
              if (r.tryLoc <= this.prev) {
                var a = g.call(r, "catchLoc"),
                  s = g.call(r, "finallyLoc");
                if (a && s) {
                  if (this.prev < r.catchLoc) return e(r.catchLoc, !0);
                  if (this.prev < r.finallyLoc) return e(r.finallyLoc);
                } else if (a) {
                  if (this.prev < r.catchLoc) return e(r.catchLoc, !0);
                } else {
                  if (!s)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < r.finallyLoc) return e(r.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
              var i = this.tryEntries[n];
              if (
                i.tryLoc <= this.prev &&
                g.call(i, "finallyLoc") &&
                this.prev < i.finallyLoc
              ) {
                var r = i;
                break;
              }
            }
            r &&
              ("break" === e || "continue" === e) &&
              r.tryLoc <= t &&
              t <= r.finallyLoc &&
              (r = null);
            var o = r ? r.completion : {};
            return (
              (o.type = e),
              (o.arg = t),
              r
                ? ((this.method = "next"), (this.next = r.finallyLoc), x)
                : this.complete(o)
            );
          },
          complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;
            return (
              "break" === e.type || "continue" === e.type
                ? (this.next = e.arg)
                : "return" === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === e.type && t && (this.next = t),
              x
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
              var n = this.tryEntries[t];
              if (n.finallyLoc === e)
                return this.complete(n.completion, n.afterLoc), o(n), x;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
              var n = this.tryEntries[t];
              if (n.tryLoc === e) {
                var i = n.completion;
                if ("throw" === i.type) {
                  var r = i.arg;
                  o(n);
                }
                return r;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, t, n) {
            return (
              (this.delegate = { iterator: l(e), resultName: t, nextLoc: n }),
              "next" === this.method && (this.arg = void 0),
              x
            );
          },
        }),
        c
      );
    }
    function m(e, t, n, i, r, o, a) {
      try {
        var s = e[o](a),
          l = s.value;
      } catch (u) {
        return void n(u);
      }
      s.done ? t(l) : Promise.resolve(l).then(i, r);
    }
    function o(s) {
      return function () {
        var e = this,
          a = arguments;
        return new Promise(function (t, n) {
          function i(e) {
            m(o, t, n, i, r, "next", e);
          }
          function r(e) {
            m(o, t, n, i, r, "throw", e);
          }
          var o = s.apply(e, a);
          i(void 0);
        });
      };
    }
    var t,
      k,
      e =
        ((t = function (e, t) {
          "use strict";
          function n(e) {
            return (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function o(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              Object.defineProperty(e, "prototype", { writable: !1 }),
              t && u(e, t);
          }
          function l(i) {
            var r = c();
            return function () {
              var e,
                t = h(i);
              if (r) {
                var n = h(this).constructor;
                e = Reflect.construct(t, arguments, n);
              } else e = t.apply(this, arguments);
              return a(this, e);
            };
          }
          function a(e, t) {
            if (t && ("object" === n(t) || "function" == typeof t)) return t;
            if (void 0 !== t)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e);
          }
          function s(e) {
            var i = "function" == typeof Map ? new Map() : void 0;
            return (s = function (e) {
              function t() {
                return r(e, arguments, h(this).constructor);
              }
              if (
                null === e ||
                ((n = e),
                -1 === Function.toString.call(n).indexOf("[native code]"))
              )
                return e;
              var n;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== i) {
                if (i.has(e)) return i.get(e);
                i.set(e, t);
              }
              return (
                (t.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                u(t, e)
              );
            })(e);
          }
          function r() {
            return (r = c()
              ? Reflect.construct.bind()
              : function (e, t, n) {
                  var i = [null];
                  i.push.apply(i, t);
                  var r = new (Function.bind.apply(e, i))();
                  return n && u(r, n.prototype), r;
                }).apply(null, arguments);
          }
          function c() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (k) {
              return !1;
            }
          }
          function u(e, t) {
            return (u = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                })(e, t);
          }
          function h(e) {
            return (h = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                })(e);
          }
          function d(e, t) {
            return (
              (function (e) {
                if (Array.isArray(e)) return e;
              })(e) ||
              (function (e, t) {
                var n =
                  null == e
                    ? null
                    : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                      e["@@iterator"];
                if (null != n) {
                  var i,
                    r,
                    o = [],
                    a = !0,
                    s = !1;
                  try {
                    for (
                      n = n.call(e);
                      !(a = (i = n.next()).done) &&
                      (o.push(i.value), !t || o.length !== t);
                      a = !0
                    );
                  } catch (l) {
                    (s = !0), (r = l);
                  } finally {
                    try {
                      a || null == n["return"] || n["return"]();
                    } finally {
                      if (s) throw r;
                    }
                  }
                  return o;
                }
              })(e, t) ||
              p(e, t) ||
              (function () {
                throw new TypeError(
                  "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                );
              })()
            );
          }
          function p(e, t) {
            if (e) {
              if ("string" == typeof e) return i(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              return (
                "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(e)
                  : "Arguments" === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? i(e, t)
                  : void 0
              );
            }
          }
          function i(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
            return i;
          }
          function f(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          function m(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
            }
          }
          function g(e, t, n) {
            return (
              t && m(e.prototype, t),
              n && m(e, n),
              Object.defineProperty(e, "prototype", { writable: !1 }),
              e
            );
          }
          function v(e, t) {
            var n = new XMLHttpRequest();
            return (
              n.open("GET", t, !0),
              n.setRequestHeader("Accept", "text/fragment+html"),
              (function (e, t) {
                var n = E.get(e);
                n && n.abort(), E.set(e, t);
                var i,
                  r = function () {
                    return E["delete"](e);
                  },
                  o =
                    ((i = t),
                    new Promise(function (e, t) {
                      (i.onload = function () {
                        200 <= i.status && i.status < 300
                          ? e(i.responseText)
                          : t(new Error(i.responseText));
                      }),
                        (i.onerror = t),
                        i.send();
                    }));
                return o.then(r, r), o;
              })(e, n)
            );
          }
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t["default"] = t.AutocompleteEvent = void 0);
          var y,
            b = (y = N) && y.__esModule ? y : { default: y },
            w = window.testScreenReaderDelay || 100,
            x = (function () {
              function s(e, t, n, i) {
                var r,
                  o = 3 < arguments.length && void 0 !== i && arguments[3];
                if (
                  (f(this, s),
                  (this.container = e),
                  (this.input = t),
                  (this.results = n),
                  (this.combobox = new b["default"](t, n)),
                  (this.feedback = document.getElementById(
                    "".concat(this.results.id, "-feedback")
                  )),
                  (this.autoselectEnabled = o),
                  (this.clearButton = document.getElementById(
                    "".concat(this.input.id || this.input.name, "-clear")
                  )),
                  (this.clientOptions = n.querySelectorAll("[role=option]")),
                  this.feedback &&
                    (this.feedback.setAttribute("aria-live", "polite"),
                    this.feedback.setAttribute("aria-atomic", "true")),
                  this.clearButton &&
                    !this.clearButton.getAttribute("aria-label"))
                ) {
                  var a = document.querySelector(
                    'label[for="'.concat(this.input.name, '"]')
                  );
                  this.clearButton.setAttribute("aria-label", "clear:"),
                    this.clearButton.setAttribute(
                      "aria-labelledby",
                      ""
                        .concat(this.clearButton.id, " ")
                        .concat((null == a ? void 0 : a.id) || "")
                    );
                }
                this.input.getAttribute("aria-expanded") ||
                  this.input.setAttribute("aria-expanded", "false"),
                  (this.results.hidden = !0),
                  this.results.setAttribute("aria-label", "results"),
                  this.input.setAttribute("autocomplete", "off"),
                  this.input.setAttribute("spellcheck", "false"),
                  (this.interactingWithList = !1),
                  (this.onInputChange = (function (i, e) {
                    var r,
                      o =
                        1 < arguments.length && void 0 !== e ? arguments[1] : 0;
                    return function () {
                      for (
                        var e = arguments.length, t = new Array(e), n = 0;
                        n < e;
                        n++
                      )
                        t[n] = arguments[n];
                      clearTimeout(r),
                        (r = window.setTimeout(function () {
                          clearTimeout(r), i.apply(void 0, t);
                        }, o));
                    };
                  })(this.onInputChange.bind(this), 300)),
                  (this.onResultsMouseDown =
                    this.onResultsMouseDown.bind(this)),
                  (this.onInputBlur = this.onInputBlur.bind(this)),
                  (this.onInputFocus = this.onInputFocus.bind(this)),
                  (this.onKeydown = this.onKeydown.bind(this)),
                  (this.onCommit = this.onCommit.bind(this)),
                  (this.handleClear = this.handleClear.bind(this)),
                  this.input.addEventListener("keydown", this.onKeydown),
                  this.input.addEventListener("focus", this.onInputFocus),
                  this.input.addEventListener("blur", this.onInputBlur),
                  this.input.addEventListener("input", this.onInputChange),
                  this.results.addEventListener(
                    "mousedown",
                    this.onResultsMouseDown
                  ),
                  this.results.addEventListener(
                    "combobox-commit",
                    this.onCommit
                  ),
                  null === (r = this.clearButton) ||
                    void 0 === r ||
                    r.addEventListener("click", this.handleClear);
              }
              return (
                g(s, [
                  {
                    key: "destroy",
                    value: function () {
                      this.input.removeEventListener("keydown", this.onKeydown),
                        this.input.removeEventListener(
                          "focus",
                          this.onInputFocus
                        ),
                        this.input.removeEventListener(
                          "blur",
                          this.onInputBlur
                        ),
                        this.input.removeEventListener(
                          "input",
                          this.onInputChange
                        ),
                        this.results.removeEventListener(
                          "mousedown",
                          this.onResultsMouseDown
                        ),
                        this.results.removeEventListener(
                          "combobox-commit",
                          this.onCommit
                        );
                    },
                  },
                  {
                    key: "handleClear",
                    value: function (e) {
                      e.preventDefault(),
                        "true" === this.input.getAttribute("aria-expanded") &&
                          (this.input.setAttribute("aria-expanded", "false"),
                          this.updateFeedbackForScreenReaders(
                            "Results hidden."
                          )),
                        (this.input.value = ""),
                        (this.container.value = ""),
                        this.input.focus(),
                        this.input.dispatchEvent(new Event("change")),
                        (this.container.open = !1);
                    },
                  },
                  {
                    key: "onKeydown",
                    value: function (e) {
                      if (
                        "Enter" === e.key &&
                        this.container.open &&
                        this.autoselectEnabled
                      ) {
                        var t = this.results.children[0];
                        t &&
                          (e.stopPropagation(),
                          e.preventDefault(),
                          this.onCommit({ target: t }));
                      }
                      if ("Escape" === e.key && this.container.open)
                        (this.container.open = !1),
                          e.stopPropagation(),
                          e.preventDefault();
                      else if (
                        e.altKey &&
                        "ArrowUp" === e.key &&
                        this.container.open
                      )
                        (this.container.open = !1),
                          e.stopPropagation(),
                          e.preventDefault();
                      else if (
                        e.altKey &&
                        "ArrowDown" === e.key &&
                        !this.container.open
                      ) {
                        if (!this.input.value.trim()) return;
                        (this.container.open = !0),
                          e.stopPropagation(),
                          e.preventDefault();
                      }
                    },
                  },
                  {
                    key: "onInputFocus",
                    value: function () {
                      this.fetchResults();
                    },
                  },
                  {
                    key: "onInputBlur",
                    value: function () {
                      this.interactingWithList
                        ? (this.interactingWithList = !1)
                        : (this.container.open = !1);
                    },
                  },
                  {
                    key: "onCommit",
                    value: function (e) {
                      var t = e.target;
                      if (
                        t instanceof HTMLElement &&
                        ((this.container.open = !1),
                        !(t instanceof HTMLAnchorElement))
                      ) {
                        var n =
                          t.getAttribute("data-autocomplete-value") ||
                          t.textContent;
                        this.updateFeedbackForScreenReaders(
                          "".concat(t.textContent || "", " selected.")
                        ),
                          (this.container.value = n) ||
                            this.updateFeedbackForScreenReaders(
                              "Results hidden."
                            );
                      }
                    },
                  },
                  {
                    key: "onResultsMouseDown",
                    value: function () {
                      this.interactingWithList = !0;
                    },
                  },
                  {
                    key: "onInputChange",
                    value: function () {
                      this.feedback &&
                        this.feedback.textContent &&
                        (this.feedback.textContent = ""),
                        this.container.removeAttribute("value"),
                        this.fetchResults();
                    },
                  },
                  {
                    key: "identifyOptions",
                    value: function () {
                      var e,
                        t = 0,
                        n = (function (e, t) {
                          var n =
                            ("undefined" != typeof Symbol &&
                              e[Symbol.iterator]) ||
                            e["@@iterator"];
                          if (!n) {
                            if (
                              Array.isArray(e) ||
                              (n = p(e)) ||
                              (t && e && "number" == typeof e.length)
                            ) {
                              n && (e = n);
                              var i = 0,
                                r = function () {};
                              return {
                                s: r,
                                n: function () {
                                  return i >= e.length
                                    ? { done: !0 }
                                    : { done: !1, value: e[i++] };
                                },
                                e: function (e) {
                                  throw e;
                                },
                                f: r,
                              };
                            }
                            throw new TypeError(
                              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                            );
                          }
                          var o,
                            a = !0,
                            s = !1;
                          return {
                            s: function () {
                              n = n.call(e);
                            },
                            n: function () {
                              var e = n.next();
                              return (a = e.done), e;
                            },
                            e: function (e) {
                              (s = !0), (o = e);
                            },
                            f: function () {
                              try {
                                a || null == n["return"] || n["return"]();
                              } finally {
                                if (s) throw o;
                              }
                            },
                          };
                        })(
                          this.results.querySelectorAll(
                            '[role="option"]:not([id])'
                          )
                        );
                      try {
                        for (n.s(); !(e = n.n()).done; )
                          e.value.id = ""
                            .concat(this.results.id, "-option-")
                            .concat(t++);
                      } catch (N) {
                        n.e(N);
                      } finally {
                        n.f();
                      }
                    },
                  },
                  {
                    key: "updateFeedbackForScreenReaders",
                    value: function (e) {
                      var t = this;
                      setTimeout(function () {
                        t.feedback && (t.feedback.textContent = e);
                      }, w);
                    },
                  },
                  {
                    key: "fetchResults",
                    value: function () {
                      var a = this,
                        e = this.input.value.trim();
                      if (e) {
                        var t = this.container.src;
                        if (t) {
                          var n = new URL(t, window.location.href),
                            i = new URLSearchParams(n.search.slice(1));
                          i.append("q", e),
                            (n.search = i.toString()),
                            this.container.dispatchEvent(
                              new CustomEvent("loadstart")
                            ),
                            this.container
                              .fetchResult(this.input, n.toString())
                              .then(function (e) {
                                (a.results.innerHTML = e), a.identifyOptions();
                                var t =
                                    a.results.querySelectorAll(
                                      '[role="option"]'
                                    ),
                                  n = !!t.length,
                                  i = t.length,
                                  r = d(t, 1)[0],
                                  o = null == r ? void 0 : r.textContent;
                                a.autoselectEnabled && o
                                  ? a.updateFeedbackForScreenReaders(
                                      ""
                                        .concat(i, " results. ")
                                        .concat(
                                          o,
                                          " is the top result: Press Enter to activate."
                                        )
                                    )
                                  : a.updateFeedbackForScreenReaders(
                                      "".concat(i || "No", " results.")
                                    ),
                                  (a.container.open = n),
                                  a.container.dispatchEvent(
                                    new CustomEvent("load")
                                  ),
                                  a.container.dispatchEvent(
                                    new CustomEvent("loadend")
                                  );
                              })
                              ["catch"](function () {
                                a.container.dispatchEvent(
                                  new CustomEvent("error")
                                ),
                                  a.container.dispatchEvent(
                                    new CustomEvent("loadend")
                                  );
                              });
                        }
                      } else this.container.open = !1;
                    },
                  },
                  {
                    key: "open",
                    value: function () {
                      this.results.hidden &&
                        (this.combobox.start(), (this.results.hidden = !1));
                    },
                  },
                  {
                    key: "close",
                    value: function () {
                      this.results.hidden ||
                        (this.combobox.stop(), (this.results.hidden = !0));
                    },
                  },
                ]),
                s
              );
            })(),
            _ = (function () {
              function i(e, t) {
                var n;
                return (
                  f(this, i),
                  ((n = r.call(this, e, t)).relatedTarget = t.relatedTarget),
                  n
                );
              }
              o(i, s(CustomEvent));
              var r = l(i);
              return g(i);
            })();
          t.AutocompleteEvent = _;
          var E = new WeakMap(),
            S = new WeakMap(),
            C = (function () {
              function t() {
                var e;
                return (
                  f(this, t),
                  ((e = n.apply(this, arguments)).fetchResult = v),
                  e
                );
              }
              o(t, s(HTMLElement));
              var n = l(t);
              return (
                g(
                  t,
                  [
                    {
                      key: "connectedCallback",
                      value: function () {
                        var e = this.getAttribute("for");
                        if (e) {
                          var t = this.querySelector("input"),
                            n = document.getElementById(e);
                          if (t instanceof HTMLInputElement && n) {
                            var i =
                              "true" === this.getAttribute("data-autoselect");
                            S.set(this, new x(this, t, n, i)),
                              n.setAttribute("role", "listbox");
                          }
                        }
                      },
                    },
                    {
                      key: "disconnectedCallback",
                      value: function () {
                        var e = S.get(this);
                        e && (e.destroy(), S["delete"](this));
                      },
                    },
                    {
                      key: "src",
                      get: function () {
                        return this.getAttribute("src") || "";
                      },
                      set: function (e) {
                        this.setAttribute("src", e);
                      },
                    },
                    {
                      key: "value",
                      get: function () {
                        return this.getAttribute("value") || "";
                      },
                      set: function (e) {
                        this.setAttribute("value", e);
                      },
                    },
                    {
                      key: "open",
                      get: function () {
                        return this.hasAttribute("open");
                      },
                      set: function (e) {
                        e
                          ? this.setAttribute("open", "")
                          : this.removeAttribute("open");
                      },
                    },
                    {
                      key: "attributeChangedCallback",
                      value: function (e, t, n) {
                        if (t !== n) {
                          var i = S.get(this);
                          if (i)
                            switch (e) {
                              case "open":
                                null === n ? i.close() : i.open();
                                break;
                              case "value":
                                null !== n && (i.input.value = n),
                                  this.dispatchEvent(
                                    new _("auto-complete-change", {
                                      bubbles: !0,
                                      relatedTarget: i.input,
                                    })
                                  );
                            }
                        }
                      },
                    },
                  ],
                  [
                    {
                      key: "observedAttributes",
                      get: function () {
                        return ["open", "value"];
                      },
                    },
                  ]
                ),
                t
              );
            })();
          (t["default"] = C),
            window.customElements.get("auto-complete") ||
              ((window.AutocompleteElement = C),
              window.customElements.define("auto-complete", C));
        }),
        function (e) {
          return k || t((k = { exports: {}, parent: e }), k.exports), k.exports;
        }),
      N = {};
    Object.defineProperty(N, "__esModule", { value: !0 }),
      (N["default"] = void 0);
    var n = (function () {
      function s(e, t, n) {
        var i = this,
          r = 2 < arguments.length && void 0 !== n ? n : {},
          o = r.tabInsertsSuggestions,
          a = r.defaultFirstOption;
        c(this, s),
          (this.input = e),
          (this.list = t),
          (this.tabInsertsSuggestions = null == o || o),
          (this.defaultFirstOption = null != a && a),
          (this.isComposing = !1),
          t.id ||
            (t.id = "combobox-".concat(Math.random().toString().slice(2, 6))),
          (this.ctrlBindings = !!navigator.userAgent.match(/Macintosh/)),
          (this.keyboardEventHandler = function (e) {
            return (function (e, t) {
              if (
                !(e.shiftKey || e.metaKey || e.altKey) &&
                (t.ctrlBindings || !e.ctrlKey) &&
                !t.isComposing
              )
                switch (e.key) {
                  case "Enter":
                    d(t.input, t.list) && e.preventDefault();
                    break;
                  case "Tab":
                    t.tabInsertsSuggestions &&
                      d(t.input, t.list) &&
                      e.preventDefault();
                    break;
                  case "Escape":
                    t.clearSelection();
                    break;
                  case "ArrowDown":
                    t.navigate(1), e.preventDefault();
                    break;
                  case "ArrowUp":
                    t.navigate(-1), e.preventDefault();
                    break;
                  case "n":
                    t.ctrlBindings &&
                      e.ctrlKey &&
                      (t.navigate(1), e.preventDefault());
                    break;
                  case "p":
                    t.ctrlBindings &&
                      e.ctrlKey &&
                      (t.navigate(-1), e.preventDefault());
                    break;
                  default:
                    if (e.ctrlKey) break;
                    t.clearSelection();
                }
            })(e, i);
          }),
          (this.compositionEventHandler = function (e) {
            return (
              (t = e),
              ((n = i).isComposing = "compositionstart" === t.type),
              void (
                document.getElementById(
                  n.input.getAttribute("aria-controls") || ""
                ) && n.clearSelection()
              )
            );
            var t, n;
          }),
          (this.inputHandler = this.clearSelection.bind(this)),
          e.setAttribute("role", "combobox"),
          e.setAttribute("aria-controls", t.id),
          e.setAttribute("aria-expanded", "false"),
          e.setAttribute("aria-autocomplete", "list"),
          e.setAttribute("aria-haspopup", "listbox");
      }
      var e, n, t;
      return (
        (n = [
          {
            key: "destroy",
            value: function () {
              this.clearSelection(),
                this.stop(),
                this.input.removeAttribute("role"),
                this.input.removeAttribute("aria-controls"),
                this.input.removeAttribute("aria-expanded"),
                this.input.removeAttribute("aria-autocomplete"),
                this.input.removeAttribute("aria-haspopup");
            },
          },
          {
            key: "start",
            value: function () {
              this.input.setAttribute("aria-expanded", "true"),
                this.input.addEventListener(
                  "compositionstart",
                  this.compositionEventHandler
                ),
                this.input.addEventListener(
                  "compositionend",
                  this.compositionEventHandler
                ),
                this.input.addEventListener("input", this.inputHandler),
                this.input.addEventListener(
                  "keydown",
                  this.keyboardEventHandler
                ),
                this.list.addEventListener("click", u),
                this.indicateDefaultOption();
            },
          },
          {
            key: "stop",
            value: function () {
              this.clearSelection(),
                this.input.setAttribute("aria-expanded", "false"),
                this.input.removeEventListener(
                  "compositionstart",
                  this.compositionEventHandler
                ),
                this.input.removeEventListener(
                  "compositionend",
                  this.compositionEventHandler
                ),
                this.input.removeEventListener("input", this.inputHandler),
                this.input.removeEventListener(
                  "keydown",
                  this.keyboardEventHandler
                ),
                this.list.removeEventListener("click", u);
            },
          },
          {
            key: "indicateDefaultOption",
            value: function () {
              this.defaultFirstOption &&
                Array.from(
                  this.list.querySelectorAll(
                    '[role="option"]:not([aria-disabled="true"])'
                  )
                )
                  .filter(p)[0]
                  .setAttribute("data-combobox-option-default", "true");
            },
          },
          {
            key: "navigate",
            value: function (e) {
              var t = 0 < arguments.length && void 0 !== e ? e : 1,
                n = Array.from(
                  this.list.querySelectorAll('[aria-selected="true"]')
                ).filter(p)[0],
                i = Array.from(
                  this.list.querySelectorAll('[role="option"]')
                ).filter(p),
                r = i.indexOf(n);
              if ((r === i.length - 1 && 1 === t) || (0 === r && -1 === t))
                return this.clearSelection(), void this.input.focus();
              var o = 1 === t ? 0 : i.length - 1;
              if (n && 0 <= r) {
                var a = r + t;
                0 <= a && a < i.length && (o = a);
              }
              var s = i[o];
              if (s) {
                var l,
                  c = h(i);
                try {
                  for (c.s(); !(l = c.n()).done; ) {
                    var u = l.value;
                    u.removeAttribute("data-combobox-option-default"),
                      s === u
                        ? (this.input.setAttribute(
                            "aria-activedescendant",
                            s.id
                          ),
                          s.setAttribute("aria-selected", "true"),
                          f(this.list, s))
                        : u.removeAttribute("aria-selected");
                  }
                } catch (T) {
                  c.e(T);
                } finally {
                  c.f();
                }
              }
            },
          },
          {
            key: "clearSelection",
            value: function () {
              this.input.removeAttribute("aria-activedescendant");
              var e,
                t = h(this.list.querySelectorAll('[aria-selected="true"]'));
              try {
                for (t.s(); !(e = t.n()).done; )
                  e.value.removeAttribute("aria-selected");
              } catch (n) {
                t.e(n);
              } finally {
                t.f();
              }
              this.indicateDefaultOption();
            },
          },
        ]),
        i((e = s).prototype, n),
        t && i(e, t),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        s
      );
    })();
    (N["default"] = n),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Initializer = function (l) {
        var c = this;
        (this.createElement = function (e) {
          var t = 0 < arguments.length && void 0 !== e ? e : {},
            n = t.location_provider,
            i = t.location_type,
            r = t.required,
            o = t.maxlength;
          c.loadAutoCompleteElement();
          var a = document.createElement("auto-complete");
          a.setAttribute("id", "job_application_location"),
            a.setAttribute("for", "location_autocomplete-items-popup"),
            a.setAttribute("src", "#"),
            n && a.setAttribute("data-provider", n),
            i && a.setAttribute("data-type", i);
          var s = document.createElement("input");
          s.setAttribute("id", "auto_complete_input"),
            s.setAttribute("name", "job_application[location]"),
            s.setAttribute("type", "text"),
            s.setAttribute("aria-labelledby", "location_autocomplete_label"),
            r && s.setAttribute("aria-required", r),
            o && s.setAttribute("maxlength", o),
            (a.innerHTML = "\n      ".concat(
              s.outerHTML,
              '\n      <ul id="location_autocomplete-items-popup"></ul>\n      <div id="location_autocomplete-items-popup-feedback" class="sr-only"></div>\n    '
            )),
            document.querySelector(l).appendChild(a);
        }),
          (this.loadAutoCompleteElement = function () {
            e({});
          });
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Mapbox = function (r, o, a) {
        (this.geocode = function (e, t) {
          new LocationControl.Providers.Mapbox.Request({
            locationType: r,
            language: o,
            country: a,
          }).autoComplete(e, t);
        }),
          (this.reverseGeocode = function (e, t, n) {
            var i = [t, e].join(",");
            new LocationControl.Providers.Mapbox.Request({
              locationType: r,
              language: o,
              country: a,
              limit: !1,
            }).autoComplete(i, n);
          }),
          (this.resultSelected = function (e, t) {
            new LocationControl.Providers.Mapbox.StorableResult(
              e,
              t
            ).ensureStorable();
          });
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Mapbox =
        LocationControl.Providers.Mapbox || {}),
      (LocationControl.Providers.Mapbox.Result = function (e) {
        function i(e, t) {
          return e.id.includes(t) || (e.place_type && e.place_type.includes(t));
        }
        function r(e, t) {
          if (e.properties && e.properties.short_code)
            return r(e.properties, t);
          var n = e.short_code || "";
          return n.includes("-") && (n = n.split(/-/)[t]), n.toUpperCase();
        }
        function t(e, n) {
          $.each(e, function (e, t) {
            i(t, "place") && (n.city = t.text),
              i(t, "postcode") && (n.postal_code = t.text),
              i(t, "region") &&
                ((n.state_long_name = t.text), (n.state_short_name = r(t, 1))),
              i(t, "country") &&
                ((n.country_long_name = t.text),
                (n.country_short_name = r(t, 0)));
          });
        }
        t([e], this), e.context && t(e.context, this);
        var n = e.place_name;
        e.text &&
          this.city &&
          this.state_long_name &&
          this.country_long_name &&
          ((this.city == this.state_long_name &&
            this.state_long_name == this.country_long_name) ||
            (n = [e.text, this.state_long_name, this.country_long_name].join(
              ", "
            )),
          (this.city = e.text)),
          (this.displayName = n),
          (this.name = n),
          (this.id = e.id),
          (this.latitude = e.geometry.coordinates[1]),
          (this.longitude = e.geometry.coordinates[0]);
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Mapbox =
        LocationControl.Providers.Mapbox || {}),
      (LocationControl.Providers.Mapbox.StorableResult = function (i, r) {
        function o(e) {
          var t, n;
          0 < e.length
            ? (((n = e[0]).city = i.city),
              (n.country_long_name = i.country_long_name),
              (n.country_short_name = i.country_short_name),
              (n.displayName = i.displayName),
              (n.name = i.name),
              (n.postal_code = i.postal_code),
              (n.state_long_name = i.state_long_name),
              (n.state_short_name = i.state_short_name),
              r(n))
            : ((t = new LocationControl.Providers.Mapbox.DummyResult(a)), r(t));
        }
        var a = i.name;
        this.ensureStorable = function () {
          var e = i.id.split(".")[0],
            t = new LocationControl.Providers.Mapbox.Request({
              locationType: e,
            }),
            n = [i.longitude, i.latitude].join(",");
          t.permanent(n, o);
        };
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Mapbox =
        LocationControl.Providers.Mapbox || {}),
      (LocationControl.Providers.Mapbox.Request = function (e) {
        function n(e, t, n, i) {
          $.ajax({
            url: r(e, t),
            data: o(i),
            success: function (e) {
              var t;
              n(
                ((t = e),
                $.map(t.features, function (e) {
                  return new LocationControl.Providers.Mapbox.Result(e);
                }))
              );
            },
            error: function () {
              n([]);
            },
          });
        }
        function r(e, t) {
          return "https://api.mapbox.com/geocoding/v5/" + e + "/" + t + ".json";
        }
        function o(e) {
          var t = { access_token: LocationControl.Providers.Mapbox.apiKey };
          return (
            a && (t.language = a),
            l && (t.country = l),
            e
              ? (i && (t.limit = 1), (t.types = u[s] || s))
              : ((t.autocomplete = !0), (t.types = c[s]), i && (t.limit = 10)),
            t
          );
        }
        var i = (e = e || {}).limit,
          a = e.language,
          s = e.locationType || "city",
          l = e.country,
          c = {
            address: "address,place,locality",
            city: "place,locality",
            state: "region,place,locality",
            country: "country",
          },
          u = { city: "place" };
        void 0 === i && (i = !0),
          (this.autoComplete = function (e, t) {
            n("mapbox.places", e, t, !1);
          }),
          (this.permanent = function (e, t) {
            n("mapbox.places-permanent", e, t, !0);
          });
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Mapbox =
        LocationControl.Providers.Mapbox || {}),
      (LocationControl.Providers.Mapbox.DummyResult = function (e) {
        (this.city = null),
          (this.country_long_name = null),
          (this.country_short_name = null),
          (this.displayName = e),
          (this.id = "dummy"),
          (this.latitude = null),
          (this.longitude = null),
          (this.name = e),
          (this.postal_code = null),
          (this.state_long_name = null),
          (this.state_short_name = null);
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Pelias = function (n) {
        (this.geocode = function (e, t) {
          new LocationControl.Providers.Pelias.Request({
            locationType: n,
          }).autoComplete(e, t);
        }),
          (this.reverseGeocode = function (e, t, n) {
            new LocationControl.Providers.Pelias.Request({
              locationType:
                "locality,localadmin,borough,macrohood,postalcode,county",
            }).reverseGeocode(e, t, n);
          }),
          (this.resultSelected = function (e, t) {
            t(e);
          });
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Pelias =
        LocationControl.Providers.Pelias || {}),
      (LocationControl.Providers.Pelias.Result = function (e) {
        var t = e.properties.label;
        (this.id = e.properties.id),
          (this.city = e.properties.name),
          (this.state_long_name = e.properties.region),
          (this.state_short_name = e.properties.region_a),
          (this.country_long_name = e.properties.country),
          (this.country_short_name = e.properties.country_a),
          this.city &&
            this.state_long_name &&
            this.country_long_name &&
            this.city !== this.state_long_name &&
            this.state_long_name !== this.country_long_name &&
            (t = [this.city, this.state_long_name, this.country_long_name].join(
              ", "
            )),
          (this.displayName = t),
          (this.name = t),
          (this.latitude = e.geometry.coordinates[1]),
          (this.longitude = e.geometry.coordinates[0]);
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Pelias =
        LocationControl.Providers.Pelias || {}),
      (LocationControl.Providers.Pelias.Request = function (e) {
        function i(e, t, n) {
          $.ajax({
            url: r(e, o(t)),
            success: function (e) {
              var t;
              n(
                ((t = e),
                $.map(t.features, function (e) {
                  return new LocationControl.Providers.Pelias.Result(e);
                }))
              );
            },
            error: function () {
              n([]);
            },
          });
        }
        function r(e, t) {
          return n + e + "?" + t;
        }
        function o(e) {
          var t = {
            api_key: LocationControl.Providers.Pelias.apiKey,
            layers: s,
            size: a,
          };
          return (e = $.extend({}, t, e)), $.param(e);
        }
        var n = (e = e || {}).baseUrl || "https://api.geocode.earth/",
          a = e.limit,
          s = e.locationType || "coarse";
        (this.autoComplete = function (e, t) {
          i("v1/autocomplete", { text: e }, t);
        }),
          (this.reverseGeocode = function (e, t, n) {
            i("v1/reverse", { "point.lat": e, "point.lon": t }, n);
          });
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Providers = LocationControl.Providers || {}),
      (LocationControl.Providers.Pelias =
        LocationControl.Providers.Pelias || {}),
      (LocationControl.Providers.Pelias.DummyResult = function (e) {
        (this.city = null),
          (this.country_long_name = null),
          (this.country_short_name = null),
          (this.displayName = e),
          (this.id = "dummy"),
          (this.latitude = null),
          (this.longitude = null),
          (this.name = e),
          (this.state_long_name = null),
          (this.state_short_name = null);
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.AutoComplete = function (i) {
        var r = [];
        !(function () {
          var n,
            e = i.getElement().attr("id");
          document.querySelector("auto-complete#".concat(e)).fetchResult =
            ((n = o(
              A().mark(function n(t) {
                return A().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          (function () {
                            var n = o(
                              A().mark(function n(t) {
                                return A().wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        return e.abrupt(
                                          "return",
                                          new Promise(function (n) {
                                            i.geocode(t.value, function (e) {
                                              var t = (r = e).map(function (
                                                e,
                                                t
                                              ) {
                                                var n = e.displayName;
                                                return '<li role="option" data-autocomplete-value="'
                                                  .concat(n, '" data-index="')
                                                  .concat(t, '">')
                                                  .concat(n, "</li>");
                                              });
                                              n(t.join("\n"));
                                            });
                                          })
                                        );
                                      case 1:
                                      case "end":
                                        return e.stop();
                                    }
                                }, n);
                              })
                            );
                            return function (e) {
                              return n.apply(this, arguments);
                            };
                          })()(t)
                        );
                      case 2:
                        return e.abrupt("return", e.sent);
                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, n);
              })
            )),
            function (e, t) {
              return n.apply(this, arguments);
            });
          var t = document.querySelector("auto-complete");
          t.addEventListener("auto-complete-change", function () {
            var e = r.find(function (e) {
              return e.displayName === t.value;
            });
            e && i.resultSelected(e);
          }),
            t.addEventListener("load", function () {
              var e = $("#auto_complete_input"),
                t = $("#location_autocomplete-items-popup"),
                n = e.position(),
                i = n.top,
                r = n.left,
                o = e.outerHeight();
              t.css({ top: "".concat(i + o, "px"), left: "".concat(r, "px") });
            });
        })();
      }),
      jQuery.widget("gh.locationControl", {
        options: {
          locateMe: !0,
          language: null,
          onLocationSelect: function () {},
          provider: "Mapbox",
          type: "city",
          locateMeText: "Locate me",
          country: null,
        },
        _create: function () {
          var e = this.element.data("locate-me"),
            t = this.options.onLocationSelect,
            n = this.element.data("provider") || this.options.provider,
            i = this.element.data("type") || this.options.type,
            r = this.options.locateMeText,
            o = this.element.data("language") || this.options.language,
            a = this.element.data("country") || this.options.country,
            s = new LocationControl.Providers[n](i, o, a),
            l = new LocationControl.Control(s, this.element, t);
          void 0 === e && (e = this.options.locateMe),
            e && new LocationControl.LocateMe(l, r),
            new LocationControl.AutoComplete(l);
        },
        clear: function () {
          this.element.val("").blur();
        },
        disable: function () {
          this.element.attr("disabled", !0).addClass("disabled");
        },
        enable: function () {
          this.element.attr("disabled", !1).removeClass("disabled");
        },
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.LocateMe = function (t, e) {
        function n(e) {
          t.reverseGeocode(e.coords.latitude, e.coords.longitude, r);
        }
        function i(e) {
          a.addClass("error").text(s[e.code]),
            setTimeout(function () {
              a.removeClass("error").text("");
            }, 6e3);
        }
        function r(e) {
          t.resultSelected(e[0]);
        }
        var o,
          a,
          s = {
            1: "Permission denied",
            2: "Position unavailable",
            3: "Request timeout",
          };
        navigator &&
          navigator.geolocation &&
          ((o = $('<a href="#" />').addClass("locate-me").text(e)).on(
            "click",
            function (e) {
              e.preventDefault(),
                navigator.geolocation.getCurrentPosition(n, i, {
                  enableHighAccuracy: !0,
                  timeout: 6e4,
                });
            }
          ),
          (a = $("<span />")),
          $("<label>&nbsp;</label>").insertAfter(t.getElement()),
          o.insertAfter(t.getElement()),
          a.insertAfter(o));
      }),
      (window.LocationControl = window.LocationControl || {}),
      (LocationControl.Control = function (t, a, e) {
        var n,
          i,
          s = [];
        (e = e || function () {}),
          (this.geocode = t.geocode),
          (this.reverseGeocode = t.reverseGeocode),
          (this.getElement = function () {
            return a;
          }),
          (this.resultSelected = function (e) {
            t.resultSelected(e, this.updateDataElement);
          }),
          (this.updateDataElement = function (n) {
            $.each(s, function (e, t) {
              t.val(n[t.data("locationField")]);
            }),
              a.addClass("ran"),
              a.data("valid", !0),
              a.val(n.name),
              a.blur(),
              e(n);
          }),
          (n = Date.now ? Date.now() : new Date().getTime()),
          (i = $(
            '<span data-id="' + n + '" data-for="location-control"></span>'
          )),
          a.data("valid", !1),
          $.each(
            [
              "city",
              "country_long_name",
              "country_short_name",
              "latitude",
              "longitude",
              "state_short_name",
              "state_long_name",
              "postal_code",
            ],
            function (e, t) {
              var n, i, r, o;
              s.push(
                ((i = "location-" + (n = t).replace(/_/g, "-")),
                (r =
                  a
                    .find("#auto_complete_input")
                    .attr("name")
                    .replace("[location]", "") +
                  "[" +
                  n +
                  "]"),
                0 === (o = $('[name="' + r + '"]')).length &&
                  (o = $("<input />").attr("type", "hidden").attr("name", r)),
                o.data("locationField", n).addClass(i),
                o)
              );
            }
          ),
          $.each(s, function (e, t) {
            i.append(t);
          }),
          i.insertAfter(a),
          a.on("input", function () {
            $.each(s, function (e, t) {
              t.val("");
            }),
              a.addClass("ran"),
              a.data("valid", !1);
          });
      });
  })(),
  $(function () {
    Grnhse.findAndConvertMetadata();
  }),
  function () {}.call(this);
var ENTER_KEY_CODE = 13,
  is_chrome = -1 < navigator.userAgent.indexOf("Chrome"),
  is_explorer = -1 < navigator.userAgent.indexOf("MSIE"),
  is_firefox = -1 < navigator.userAgent.indexOf("Firefox"),
  is_opera = -1 < navigator.userAgent.indexOf("Presto"),
  is_safari = -1 < navigator.userAgent.indexOf("Safari") && !is_chrome,
  FileUtil = {
    getFilenameFromPath: function (e) {
      return e.substr(e.lastIndexOf("\\") + 1);
    },
  },
  contentSecurityPolicy = {
    hrefPreventDefault: function (e) {
      e.preventDefault();
    },
  };
$(document).on(
  "click",
  'a[href="#"]',
  contentSecurityPolicy.hrefPreventDefault
),
  ($.fn.validateOn = function (e, n, i, r) {
    $(this).on(e, function (e) {
      var t = n.call(this, e);
      return (
        "function" == typeof t.isValid ? t.isValid() : Validate.isValid(t)
      )
        ? i
          ? i.call(this, e)
          : void 0
        : ((r !== undefined && !1 === r.scroll) ||
            Validate.scrollToFirstError(),
          !1);
    });
  }),
  (function () {
    "use strict";
    var e = $.fn.offset;
    $.fn.offset = function () {
      return $.fn.hasClass.call(this, "gh-jquery-override-offset")
        ? { top: this[0].offsetTop, left: this[0].offsetLeft }
        : e.apply(this, arguments);
    };
  })();
