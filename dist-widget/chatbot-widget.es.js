import oe, { createContext as Fe, useContext as z, useState as I, useEffect as Se, useCallback as ke } from "react";
import _r from "react-dom";
function xr(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var K = { exports: {} }, L = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ie;
function wr() {
  if (Ie) return L;
  Ie = 1;
  var o = oe, i = Symbol.for("react.element"), l = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, x = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function C(f, c, P) {
    var y, E = {}, h = null, j = null;
    P !== void 0 && (h = "" + P), c.key !== void 0 && (h = "" + c.key), c.ref !== void 0 && (j = c.ref);
    for (y in c) v.call(c, y) && !g.hasOwnProperty(y) && (E[y] = c[y]);
    if (f && f.defaultProps) for (y in c = f.defaultProps, c) E[y] === void 0 && (E[y] = c[y]);
    return { $$typeof: i, type: f, key: h, ref: j, props: E, _owner: x.current };
  }
  return L.Fragment = l, L.jsx = C, L.jsxs = C, L;
}
var Y = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var De;
function jr() {
  return De || (De = 1, process.env.NODE_ENV !== "production" && function() {
    var o = oe, i = Symbol.for("react.element"), l = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), f = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), j = Symbol.for("react.offscreen"), D = Symbol.iterator, Le = "@@iterator";
    function Ye(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = D && e[D] || e[Le];
      return typeof r == "function" ? r : null;
    }
    var $ = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Ve("error", e, t);
      }
    }
    function Ve(e, r, t) {
      {
        var n = $.ReactDebugCurrentFrame, d = n.getStackAddendum();
        d !== "" && (r += "%s", t = t.concat([d]));
        var p = t.map(function(u) {
          return String(u);
        });
        p.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, p);
      }
    }
    var Be = !1, Ue = !1, qe = !1, Ke = !1, ze = !1, ae;
    ae = Symbol.for("react.module.reference");
    function Je(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === v || e === g || ze || e === x || e === P || e === y || Ke || e === j || Be || Ue || qe || typeof e == "object" && e !== null && (e.$$typeof === h || e.$$typeof === E || e.$$typeof === C || e.$$typeof === f || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ae || e.getModuleId !== void 0));
    }
    function He(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var d = r.displayName || r.name || "";
      return d !== "" ? t + "(" + d + ")" : t;
    }
    function ie(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case v:
          return "Fragment";
        case l:
          return "Portal";
        case g:
          return "Profiler";
        case x:
          return "StrictMode";
        case P:
          return "Suspense";
        case y:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            var r = e;
            return ie(r) + ".Consumer";
          case C:
            var t = e;
            return ie(t._context) + ".Provider";
          case c:
            return He(e, e.render, "ForwardRef");
          case E:
            var n = e.displayName || null;
            return n !== null ? n : O(e.type) || "Memo";
          case h: {
            var d = e, p = d._payload, u = d._init;
            try {
              return O(u(p));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var S = Object.assign, W = 0, se, le, ue, ce, fe, de, ve;
    function pe() {
    }
    pe.__reactDisabledLog = !0;
    function Ge() {
      {
        if (W === 0) {
          se = console.log, le = console.info, ue = console.warn, ce = console.error, fe = console.group, de = console.groupCollapsed, ve = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        W++;
      }
    }
    function Xe() {
      {
        if (W--, W === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: S({}, e, {
              value: se
            }),
            info: S({}, e, {
              value: le
            }),
            warn: S({}, e, {
              value: ue
            }),
            error: S({}, e, {
              value: ce
            }),
            group: S({}, e, {
              value: fe
            }),
            groupCollapsed: S({}, e, {
              value: de
            }),
            groupEnd: S({}, e, {
              value: ve
            })
          });
        }
        W < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var H = $.ReactCurrentDispatcher, G;
    function V(e, r, t) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (d) {
            var n = d.stack.trim().match(/\n( *(at )?)/);
            G = n && n[1] || "";
          }
        return `
` + G + e;
      }
    }
    var X = !1, B;
    {
      var Ze = typeof WeakMap == "function" ? WeakMap : Map;
      B = new Ze();
    }
    function ge(e, r) {
      if (!e || X)
        return "";
      {
        var t = B.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      X = !0;
      var d = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var p;
      p = H.current, H.current = null, Ge();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (w) {
              n = w;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (w) {
              n = w;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (w) {
            n = w;
          }
          e();
        }
      } catch (w) {
        if (w && n && typeof w.stack == "string") {
          for (var s = w.stack.split(`
`), _ = n.stack.split(`
`), m = s.length - 1, b = _.length - 1; m >= 1 && b >= 0 && s[m] !== _[b]; )
            b--;
          for (; m >= 1 && b >= 0; m--, b--)
            if (s[m] !== _[b]) {
              if (m !== 1 || b !== 1)
                do
                  if (m--, b--, b < 0 || s[m] !== _[b]) {
                    var T = `
` + s[m].replace(" at new ", " at ");
                    return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), typeof e == "function" && B.set(e, T), T;
                  }
                while (m >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        X = !1, H.current = p, Xe(), Error.prepareStackTrace = d;
      }
      var F = e ? e.displayName || e.name : "", k = F ? V(F) : "";
      return typeof e == "function" && B.set(e, k), k;
    }
    function Qe(e, r, t) {
      return ge(e, !1);
    }
    function er(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function U(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, er(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case P:
          return V("Suspense");
        case y:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return Qe(e.render);
          case E:
            return U(e.type, r, t);
          case h: {
            var n = e, d = n._payload, p = n._init;
            try {
              return U(p(d), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var N = Object.prototype.hasOwnProperty, ye = {}, he = $.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, t = U(e.type, e._source, r ? r.type : null);
        he.setExtraStackFrame(t);
      } else
        he.setExtraStackFrame(null);
    }
    function rr(e, r, t, n, d) {
      {
        var p = Function.call.bind(N);
        for (var u in e)
          if (p(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var _ = Error((n || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              s = e[u](r, u, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (m) {
              s = m;
            }
            s && !(s instanceof Error) && (q(d), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, u, typeof s), q(null)), s instanceof Error && !(s.message in ye) && (ye[s.message] = !0, q(d), R("Failed %s type: %s", t, s.message), q(null));
          }
      }
    }
    var tr = Array.isArray;
    function Z(e) {
      return tr(e);
    }
    function nr(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function or(e) {
      try {
        return me(e), !1;
      } catch {
        return !0;
      }
    }
    function me(e) {
      return "" + e;
    }
    function be(e) {
      if (or(e))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nr(e)), me(e);
    }
    var Ee = $.ReactCurrentOwner, ar = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, Re;
    function ir(e) {
      if (N.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function sr(e) {
      if (N.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function lr(e, r) {
      typeof e.ref == "string" && Ee.current;
    }
    function ur(e, r) {
      {
        var t = function() {
          Ce || (Ce = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function cr(e, r) {
      {
        var t = function() {
          Re || (Re = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var fr = function(e, r, t, n, d, p, u) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: i,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: p
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function dr(e, r, t, n, d) {
      {
        var p, u = {}, s = null, _ = null;
        t !== void 0 && (be(t), s = "" + t), sr(r) && (be(r.key), s = "" + r.key), ir(r) && (_ = r.ref, lr(r, d));
        for (p in r)
          N.call(r, p) && !ar.hasOwnProperty(p) && (u[p] = r[p]);
        if (e && e.defaultProps) {
          var m = e.defaultProps;
          for (p in m)
            u[p] === void 0 && (u[p] = m[p]);
        }
        if (s || _) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && ur(u, b), _ && cr(u, b);
        }
        return fr(e, s, _, d, n, Ee.current, u);
      }
    }
    var Q = $.ReactCurrentOwner, _e = $.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = U(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(t);
      } else
        _e.setExtraStackFrame(null);
    }
    var ee;
    ee = !1;
    function re(e) {
      return typeof e == "object" && e !== null && e.$$typeof === i;
    }
    function xe() {
      {
        if (Q.current) {
          var e = O(Q.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function vr(e) {
      return "";
    }
    var we = {};
    function pr(e) {
      {
        var r = xe();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function je(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = pr(r);
        if (we[t])
          return;
        we[t] = !0;
        var n = "";
        e && e._owner && e._owner !== Q.current && (n = " It was passed a child from " + O(e._owner.type) + "."), A(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Z(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            re(n) && je(n, r);
          }
        else if (re(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = Ye(e);
          if (typeof d == "function" && d !== e.entries)
            for (var p = d.call(e), u; !(u = p.next()).done; )
              re(u.value) && je(u.value, r);
        }
      }
    }
    function gr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === E))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = O(r);
          rr(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !ee) {
          ee = !0;
          var d = O(r);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function yr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var Pe = {};
    function Oe(e, r, t, n, d, p) {
      {
        var u = Je(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = vr();
          _ ? s += _ : s += xe();
          var m;
          e === null ? m = "null" : Z(e) ? m = "array" : e !== void 0 && e.$$typeof === i ? (m = "<" + (O(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : m = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", m, s);
        }
        var b = dr(e, r, t, d, p);
        if (b == null)
          return b;
        if (u) {
          var T = r.children;
          if (T !== void 0)
            if (n)
              if (Z(T)) {
                for (var F = 0; F < T.length; F++)
                  Te(T[F], e);
                Object.freeze && Object.freeze(T);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(T, e);
        }
        if (N.call(r, "key")) {
          var k = O(e), w = Object.keys(r).filter(function(Rr) {
            return Rr !== "key";
          }), te = w.length > 0 ? "{key: someKey, " + w.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Pe[k + te]) {
            var Cr = w.length > 0 ? "{" + w.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, te, k, Cr, k), Pe[k + te] = !0;
          }
        }
        return e === v ? yr(b) : gr(b), b;
      }
    }
    function hr(e, r, t) {
      return Oe(e, r, t, !0);
    }
    function mr(e, r, t) {
      return Oe(e, r, t, !1);
    }
    var br = mr, Er = hr;
    Y.Fragment = v, Y.jsx = br, Y.jsxs = Er;
  }()), Y;
}
var $e;
function Tr() {
  return $e || ($e = 1, process.env.NODE_ENV === "production" ? K.exports = wr() : K.exports = jr()), K.exports;
}
var a = Tr(), M = {}, Ae;
function Pr() {
  if (Ae) return M;
  Ae = 1;
  var o = _r;
  if (process.env.NODE_ENV === "production")
    M.createRoot = o.createRoot, M.hydrateRoot = o.hydrateRoot;
  else {
    var i = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    M.createRoot = function(l, v) {
      i.usingClientEntryPoint = !0;
      try {
        return o.createRoot(l, v);
      } finally {
        i.usingClientEntryPoint = !1;
      }
    }, M.hydrateRoot = function(l, v, x) {
      i.usingClientEntryPoint = !0;
      try {
        return o.hydrateRoot(l, v, x);
      } finally {
        i.usingClientEntryPoint = !1;
      }
    };
  }
  return M;
}
var Or = Pr();
const Sr = /* @__PURE__ */ xr(Or), J = Fe({
  isOpen: !1,
  setIsOpen: () => {
  },
  clientKey: "",
  isEditModalOpen: !1,
  setIsEditModalOpen: () => {
  }
}), ne = {
  widgetPrimaryColor: "#007bff",
  widgetPrimaryTextColor: "#ffffff",
  headerBackgroundColor: "#f7f7f7",
  headerTextColor: "#333333",
  chatBackgroundColor: "#ffffff",
  userMessageBackgroundColor: "#007bff",
  userMessageTextColor: "#ffffff",
  botMessageBackgroundColor: "#f0f0f0",
  botMessageTextColor: "#333333",
  inputBackgroundColor: "#ffffff",
  inputTextColor: "#333333",
  inputPlaceholderColor: "#999999",
  buttonBackgroundColor: "#007bff",
  buttonTextColor: "#ffffff",
  scrollbarThumbColor: "#007bff",
  scrollbarTrackColor: "#f0f0f0"
}, Me = Fe({
  styles: ne,
  setStyles: () => {
  },
  updateStyle: () => {
  },
  resetStyles: () => {
  }
}), kr = async (o, i) => {
  console.log(
    `Mock API called with clientKey: ${i} and message: ${o}`
  ), await new Promise((v) => setTimeout(v, 1e3));
  let l = "I am a generic bot.";
  return i === "test-key" ? o.toLowerCase().includes("hello") ? l = "Hi there! How can I help you today?" : o.toLowerCase().includes("help") ? l = "Sure, I can help. What do you need assistance with?" : l = `Thanks for your message about "${o}". I am processing it.` : i === "another-key" ? l = "Hello from another configuration!" : l = `Received your message: ${o}`, { text: l };
};
function Ir() {
  const { clientKey: o } = z(J), [i, l] = I([]), [v, x] = I(""), [g, C] = I(!1), f = async () => {
    if (v.trim() === "") return;
    const c = {
      id: Date.now().toString(),
      text: v,
      sender: "user"
    };
    l((y) => [...y, c]);
    const P = v;
    x(""), C(!0);
    try {
      const y = await kr(P, o), E = {
        id: (Date.now() + 1).toString(),
        text: y.text,
        sender: "bot"
      };
      l((h) => [...h, E]);
    } catch (y) {
      console.error("Error fetching bot response:", y);
      const E = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't get a response. Please try again.",
        sender: "bot"
      };
      l((h) => [...h, E]);
    } finally {
      C(!1);
    }
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "chat-view", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "messages-container", children: [
      i.map((c) => /* @__PURE__ */ a.jsx("div", { className: `message ${c.sender}`, children: c.text }, c.id)),
      g && /* @__PURE__ */ a.jsx("div", { className: "message bot typing-indicator", children: /* @__PURE__ */ a.jsx("em", { children: "Bot is typing..." }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "input-container", children: [
      /* @__PURE__ */ a.jsx(
        "input",
        {
          type: "text",
          value: v,
          onChange: (c) => x(c.target.value),
          onKeyPress: (c) => {
            c.key === "Enter" && !g && f();
          },
          placeholder: "Type a message...",
          disabled: g
        }
      ),
      /* @__PURE__ */ a.jsx("button", { onClick: f, disabled: g, children: g ? "Sending..." : "Send" })
    ] })
  ] });
}
const Dr = () => /* @__PURE__ */ a.jsxs(
  "svg",
  {
    fill: "currentColor",
    viewBox: "0 0 16 16",
    height: "1em",
    width: "1em",
    style: { display: "inline-block", verticalAlign: "middle" },
    children: [
      /* @__PURE__ */ a.jsx("path", { d: "M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z" }),
      /* @__PURE__ */ a.jsx("path", { d: "M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.893 3.434-.901 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 002.679 1.118l.292-.16c.786-.426 1.658.219 1.232.998l-.16.292a1.873 1.873 0 001.118 2.679l.319.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 00-1.118 2.679l.16.292c.426.786-.219 1.658-.998 1.232l-.292-.16a1.873 1.873 0 00-2.679 1.118l-.094.319c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 00-2.679-1.118l-.292.16c-.786.426-1.658-.219-1.232-.998l.16-.292a1.873 1.873 0 00-1.118-2.679l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 003.005 4.88l-.16-.292c-.426-.786.219-1.658.998-1.232l.292.16a1.873 1.873 0 002.679-1.118l.094-.319z" })
    ]
  }
);
function We() {
  const { isOpen: o, setIsOpen: i, setIsEditModalOpen: l } = z(J);
  return o ? /* @__PURE__ */ a.jsxs("div", { className: "widget-container", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "widget-header", children: [
      /* @__PURE__ */ a.jsx("h3", { children: "Widget Title" }),
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx(
          "button",
          {
            onClick: () => l(!0),
            title: "Customize Styles",
            style: { marginRight: "10px" },
            children: /* @__PURE__ */ a.jsx(Dr, {})
          }
        ),
        /* @__PURE__ */ a.jsx("button", { onClick: () => i(!1), title: "Close Widget", children: "X" })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "widget-content", children: /* @__PURE__ */ a.jsx(Ir, {}) })
  ] }) : /* @__PURE__ */ a.jsx("button", { className: "widget-button", onClick: () => i(!0), children: "Open Widget" });
}
const $r = (o) => o.replace(/([A-Z])/g, " $1").replace(/^./, (i) => i.toUpperCase());
function Ar({}) {
  const { styles: o, updateStyle: i, resetStyles: l } = z(Me), v = (g, C) => {
    i(g, C);
  }, x = Object.keys(o).filter(
    (g) => !g.endsWith("Rgb")
  );
  return /* @__PURE__ */ a.jsxs("div", { className: "style-editor", children: [
    /* @__PURE__ */ a.jsx("h4", { children: "Customize Widget Styles" }),
    x.map((g) => {
      const C = o[g], f = typeof C == "string" && C.startsWith("#");
      return /* @__PURE__ */ a.jsxs("div", { className: "form-group flex flex-row flex-wrap", children: [
        /* @__PURE__ */ a.jsx("label", { htmlFor: g, children: $r(g) }),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: f ? "color" : "text",
            id: g,
            name: g,
            value: C,
            onChange: (c) => v(g, c.target.value)
          }
        )
      ] }, g);
    }),
    /* @__PURE__ */ a.jsx("button", { onClick: l, style: { marginTop: "10px" }, children: "Reset to Defaults" })
  ] });
}
function Fr() {
  const { isEditModalOpen: o, setIsEditModalOpen: i } = z(J);
  return o ? /* @__PURE__ */ a.jsx(
    "div",
    {
      className: "edit-modal-overlay",
      onClick: () => i(!1),
      children: /* @__PURE__ */ a.jsxs("div", { className: "edit-modal-content", onClick: (l) => l.stopPropagation(), children: [
        /* @__PURE__ */ a.jsx("div", { className: "style-editor-wrapper", children: /* @__PURE__ */ a.jsx(Ar, {}) }),
        /* @__PURE__ */ a.jsxs("div", { className: "widget-preview-wrapper", children: [
          /* @__PURE__ */ a.jsx(
            "p",
            {
              style: {
                textAlign: "center",
                marginBottom: "10px",
                color: "var(--header-text-color)"
              },
              children: "Live Preview"
            }
          ),
          /* @__PURE__ */ a.jsx(We, {})
        ] })
      ] })
    }
  ) : null;
}
const Mr = (o) => `--${o.replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`)}`;
function Wr({ clientKey: o }) {
  const [i, l] = I(!1), [v, x] = I(!1), [g, C] = I(!1), [f, c] = I(ne);
  Se(() => {
    l(!0);
  }, []), Se(() => {
    const E = document.documentElement;
    for (const h in f)
      if (Object.prototype.hasOwnProperty.call(f, h)) {
        const j = Mr(h);
        E.style.setProperty(j, f[h]);
      }
    if (f.widgetPrimaryColor) {
      let h = 0, j = 0, D = 0;
      f.widgetPrimaryColor.length === 7 ? (h = parseInt(f.widgetPrimaryColor.substring(1, 3), 16), j = parseInt(f.widgetPrimaryColor.substring(3, 5), 16), D = parseInt(f.widgetPrimaryColor.substring(5, 7), 16)) : f.widgetPrimaryColor.length === 4 && (h = parseInt(
        f.widgetPrimaryColor.substring(1, 2) + f.widgetPrimaryColor.substring(1, 2),
        16
      ), j = parseInt(
        f.widgetPrimaryColor.substring(2, 3) + f.widgetPrimaryColor.substring(2, 3),
        16
      ), D = parseInt(
        f.widgetPrimaryColor.substring(3, 4) + f.widgetPrimaryColor.substring(3, 4),
        16
      )), E.style.setProperty("--widget-primary-color-rgb", `${h}, ${j}, ${D}`);
    }
  }, [f]);
  const P = ke((E, h) => {
    c((j) => ({
      ...j,
      [E]: h
    }));
  }, []), y = ke(() => {
    c(ne);
  }, []);
  return i ? /* @__PURE__ */ a.jsx(
    Me.Provider,
    {
      value: { styles: f, setStyles: c, updateStyle: P, resetStyles: y },
      children: /* @__PURE__ */ a.jsxs(
        J.Provider,
        {
          value: {
            isOpen: v,
            setIsOpen: x,
            clientKey: o,
            isEditModalOpen: g,
            setIsEditModalOpen: C
          },
          children: [
            /* @__PURE__ */ a.jsx(We, {}),
            /* @__PURE__ */ a.jsx(Fr, {})
          ]
        }
      )
    }
  ) : null;
}
const Ne = "chatbot-widget-container";
function Nr(o) {
  const { clientKey: i, targetElementId: l = Ne } = o;
  let v = document.getElementById(l);
  v ? v.innerHTML = "" : (console.log(
    `ChatbotWidget: Target element '#${l}' not found. Creating one.`
  ), v = document.createElement("div"), v.id = l, document.body.appendChild(v)), Sr.createRoot(v).render(
    /* @__PURE__ */ a.jsx(oe.StrictMode, { children: /* @__PURE__ */ a.jsx(Wr, { clientKey: i }) })
  ), console.log(
    `ChatbotWidget initialized on '#${l}' with clientKey: ${i}`
  );
}
function Lr(o = Ne) {
  const i = document.getElementById(o);
  if (i) {
    const l = i._reactRootContainer;
    l && typeof l.unmount == "function" ? l.unmount() : i.innerHTML = "", console.log(`ChatbotWidget destroyed on '#${o}'.`);
  } else
    console.warn(
      `ChatbotWidget: Target element '#${o}' not found for destruction.`
    );
}
window.ChatbotWidget = {
  init: Nr,
  destroy: Lr
};
//# sourceMappingURL=chatbot-widget.es.js.map
