/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2022 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
var _self =
		'undefined' !== typeof window
			? window
			: 'undefined' !== typeof WorkerGlobalScope &&
			  self instanceof WorkerGlobalScope
			? self
			: {},
	Prism = (function () {
		var e = /\blang(?:uage)?-([\w-]+)\b/i,
			t = 0,
			n = (_self.Prism = {
				manual: _self.Prism && _self.Prism.manual,
				disableWorkerMessageHandler:
					_self.Prism && _self.Prism.disableWorkerMessageHandler,
				util: {
					encode: function (e) {
						return e instanceof r
							? new r(e.type, n.util.encode(e.content), e.alias)
							: 'Array' === n.util.type(e)
							? e.map(n.util.encode)
							: e
									.replace(/&/g, '&amp;')
									.replace(/</g, '&lt;')
									.replace(/\u00a0/g, ' ');
					},
					type: function (e) {
						return Object.prototype.toString
							.call(e)
							.match(/\[object (\w+)\]/)[1];
					},
					objId: function (e) {
						return (
							e.__id ||
								Object.defineProperty(e, '__id', {
									value: ++t
								}),
							e.__id
						);
					},
					clone: function (e, t) {
						var r = n.util.type(e);
						switch (((t = t || {}), r)) {
							case 'Object':
								if (t[n.util.objId(e)]) {
									return t[n.util.objId(e)];
								}
								var a = {};
								t[n.util.objId(e)] = a;
								for (var l in e) {
									e.hasOwnProperty(l) &&
										(a[l] = n.util.clone(e[l], t));
								}
								return a;
							case 'Array':
								if (t[n.util.objId(e)]) {
									return t[n.util.objId(e)];
								}
								var a = [];
								return (
									(t[n.util.objId(e)] = a),
									e.forEach(function (e, r) {
										a[r] = n.util.clone(e, t);
									}),
									a
								);
						}
						return e;
					}
				},
				languages: {
					extend: function (e, t) {
						var r = n.util.clone(n.languages[e]);
						for (var a in t) {
							r[a] = t[a];
						}
						return r;
					},
					insertBefore: function (e, t, r, a) {
						a = a || n.languages;
						var l = a[e];
						if (2 == arguments.length) {
							r = arguments[1];
							for (var i in r) {
								r.hasOwnProperty(i) && (l[i] = r[i]);
							}
							return l;
						}
						var o = {};
						for (var s in l) {
							if (l.hasOwnProperty(s)) {
								if (s == t) {
									for (var i in r) {
										r.hasOwnProperty(i) && (o[i] = r[i]);
									}
								}
								o[s] = l[s];
							}
						}
						return (
							n.languages.DFS(n.languages, function (t, n) {
								n === a[e] && t != e && (this[t] = o);
							}),
							(a[e] = o)
						);
					},
					DFS: function (e, t, r, a) {
						a = a || {};
						for (var l in e) {
							e.hasOwnProperty(l) &&
								(t.call(e, l, e[l], r || l),
								'Object' !== n.util.type(e[l]) ||
								a[n.util.objId(e[l])]
									? 'Array' !== n.util.type(e[l]) ||
									  a[n.util.objId(e[l])] ||
									  ((a[n.util.objId(e[l])] = !0),
									  n.languages.DFS(e[l], t, l, a))
									: ((a[n.util.objId(e[l])] = !0),
									  n.languages.DFS(e[l], t, null, a)));
						}
					}
				},
				plugins: {},
				highlightAll: function (e, t) {
					n.highlightAllUnder(document, e, t);
				},
				highlightAllUnder: function (e, t, r) {
					var a = {
						callback: r,
						selector:
							'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
					};
					n.hooks.run('before-highlightall', a);
					for (
						var l,
							i = a.elements || e.querySelectorAll(a.selector),
							o = 0;
						(l = i[o++]);

					) {
						n.highlightElement(l, t === !0, a.callback);
					}
				},
				highlightElement: function (t, r, a) {
					for (var l, i, o = t; o && !e.test(o.className); ) {
						o = o.parentNode;
					}
					o &&
						((l = (o.className.match(e) || [
							,
							''
						])[1].toLowerCase()),
						(i = n.languages[l])),
						(t.className =
							t.className.replace(e, '').replace(/\s+/g, ' ') +
							' language-' +
							l),
						t.parentNode &&
							((o = t.parentNode),
							/pre/i.test(o.nodeName) &&
								(o.className =
									o.className
										.replace(e, '')
										.replace(/\s+/g, ' ') +
									' language-' +
									l));
					var s = t.textContent,
						u = { element: t, language: l, grammar: i, code: s };
					if (
						(n.hooks.run('before-sanity-check', u),
						!u.code || !u.grammar)
					) {
						return (
							u.code &&
								(n.hooks.run('before-highlight', u),
								(u.element.textContent = u.code),
								n.hooks.run('after-highlight', u)),
							n.hooks.run('complete', u),
							void 0
						);
					}
					if (
						(n.hooks.run('before-highlight', u), r && _self.Worker)
					) {
						var g = new Worker(n.filename);
						(g.onmessage = function (e) {
							(u.highlightedCode = e.data),
								n.hooks.run('before-insert', u),
								(u.element.innerHTML = u.highlightedCode),
								a && a.call(u.element),
								n.hooks.run('after-highlight', u),
								n.hooks.run('complete', u);
						}),
							g.postMessage(
								JSON.stringify({
									language: u.language,
									code: u.code,
									immediateClose: !0
								})
							);
					} else {
						(u.highlightedCode = n.highlight(
							u.code,
							u.grammar,
							u.language
						)),
							n.hooks.run('before-insert', u),
							(u.element.innerHTML = u.highlightedCode),
							a && a.call(t),
							n.hooks.run('after-highlight', u),
							n.hooks.run('complete', u);
					}
				},
				highlight: function (e, t, a) {
					var l = { code: e, grammar: t, language: a };
					return (
						n.hooks.run('before-tokenize', l),
						(l.tokens = n.tokenize(l.code, l.grammar)),
						n.hooks.run('after-tokenize', l),
						r.stringify(n.util.encode(l.tokens), l.language)
					);
				},
				matchGrammar: function (e, t, r, a, l, i, o) {
					var s = n.Token;
					for (var u in r) {
						if (r.hasOwnProperty(u) && r[u]) {
							if (u == o) {
								return;
							}
							var g = r[u];
							g = 'Array' === n.util.type(g) ? g : [g];
							for (var c = 0; c < g.length; ++c) {
								var h = g[c],
									f = h.inside,
									d = Boolean(h.lookbehind),
									m = Boolean(h.greedy),
									p = 0,
									y = h.alias;
								if (m && !h.pattern.global) {
									var v = h.pattern
										.toString()
										.match(/[imuy]*$/)[0];
									h.pattern = RegExp(
										h.pattern.source,
										v + 'g'
									);
								}
								h = h.pattern || h;
								for (
									var b = a, k = l;
									b < t.length;
									k += t[b].length, ++b
								) {
									var w = t[b];
									if (t.length > e.length) {
										return;
									}
									if (!(w instanceof s)) {
										if (m && b != t.length - 1) {
											h.lastIndex = k;
											var _ = h.exec(e);
											if (!_) {
												break;
											}
											for (
												var j =
														_.index +
														(d ? _[1].length : 0),
													P = _.index + _[0].length,
													A = b,
													x = k,
													O = t.length;
												O > A &&
												(P > x ||
													(!t[A].type &&
														!t[A - 1].greedy));
												++A
											) {
												(x += t[A].length),
													j >= x && (++b, (k = x));
											}
											if (t[b] instanceof s) {
												continue;
											}
											(I = A - b),
												(w = e.slice(k, x)),
												(_.index -= k);
										} else {
											h.lastIndex = 0;
											var _ = h.exec(w),
												I = 1;
										}
										if (_) {
											d && (p = _[1] ? _[1].length : 0);
											var j = _.index + p,
												_ = _[0].slice(p),
												P = j + _.length,
												N = w.slice(0, j),
												S = w.slice(P),
												C = [b, I];
											N &&
												(++b,
												(k += N.length),
												C.push(N));
											var E = new s(
												u,
												f ? n.tokenize(_, f) : _,
												y,
												_,
												m
											);
											if (
												(C.push(E),
												S && C.push(S),
												Array.prototype.splice.apply(
													t,
													C
												),
												1 != I &&
													n.matchGrammar(
														e,
														t,
														r,
														b,
														k,
														!0,
														u
													),
												i)
											) {
												break;
											}
										} else if (i) {
											break;
										}
									}
								}
							}
						}
					}
				},
				tokenize: function (e, t) {
					var r = [e],
						a = t.rest;
					if (a) {
						for (var l in a) {
							t[l] = a[l];
						}
						delete t.rest;
					}
					return n.matchGrammar(e, r, t, 0, 0, !1), r;
				},
				hooks: {
					all: {},
					add: function (e, t) {
						var r = n.hooks.all;
						(r[e] = r[e] || []), r[e].push(t);
					},
					run: function (e, t) {
						var r = n.hooks.all[e];
						if (r && r.length) {
							for (var a, l = 0; (a = r[l++]); ) {
								a(t);
							}
						}
					}
				}
			}),
			r = (n.Token = function (e, t, n, r, a) {
				(this.type = e),
					(this.content = t),
					(this.alias = n),
					(this.length = 0 | (r || '').length),
					(this.greedy = Boolean(a));
			});
		if (
			((r.stringify = function (e, t, a) {
				if ('string' === typeof e) {
					return e;
				}
				if ('Array' === n.util.type(e)) {
					return e
						.map(function (n) {
							return r.stringify(n, t, e);
						})
						.join('');
				}
				var l = {
					type: e.type,
					content: r.stringify(e.content, t, a),
					tag: 'span',
					classes: ['token', e.type],
					attributes: {},
					language: t,
					parent: a
				};
				if (e.alias) {
					var i =
						'Array' === n.util.type(e.alias) ? e.alias : [e.alias];
					Array.prototype.push.apply(l.classes, i);
				}
				n.hooks.run('wrap', l);
				var o = Object.keys(l.attributes)
					.map(function (e) {
						return (
							e +
							'="' +
							(l.attributes[e] || '').replace(/"/g, '&quot;') +
							'"'
						);
					})
					.join(' ');
				return (
					'<' +
					l.tag +
					' class="' +
					l.classes.join(' ') +
					'"' +
					(o ? ' ' + o : '') +
					'>' +
					l.content +
					'</' +
					l.tag +
					'>'
				);
			}),
			!_self.document)
		) {
			return _self.addEventListener
				? (n.disableWorkerMessageHandler ||
						_self.addEventListener(
							'message',
							function (e) {
								var t = JSON.parse(e.data),
									r = t.language,
									a = t.code,
									l = t.immediateClose;
								_self.postMessage(
									n.highlight(a, n.languages[r], r)
								),
									l && _self.close();
							},
							!1
						),
				  _self.Prism)
				: _self.Prism;
		}
		var a =
			document.currentScript ||
			[].slice.call(document.getElementsByTagName('script')).pop();
		return (
			a &&
				((n.filename = a.src),
				n.manual ||
					a.hasAttribute('data-manual') ||
					('loading' !== document.readyState
						? window.requestAnimationFrame
							? window.requestAnimationFrame(n.highlightAll)
							: window.setTimeout(n.highlightAll, 16)
						: document.addEventListener(
								'DOMContentLoaded',
								n.highlightAll
						  ))),
			_self.Prism
		);
	})();
'undefined' !== typeof module && module.exports && (module.exports = Prism),
	'undefined' !== typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
	comment: /<!--[\s\S]*?-->/,
	prolog: /<\?[\s\S]+?\?>/,
	doctype: /<!DOCTYPE[\s\S]+?>/i,
	cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
	tag: {
		pattern:
			/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		greedy: !0,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
			},
			'attr-value': {
				pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
				inside: {
					punctuation: [
						/^=/,
						{ pattern: /(^|[^\\])["']/, lookbehind: !0 }
					]
				}
			},
			punctuation: /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: { namespace: /^[^\s>\/:]+:/ }
			}
		}
	},
	entity: /&#?[\da-z]{1,8};/i
}),
	(Prism.languages.markup.tag.inside['attr-value'].inside.entity =
		Prism.languages.markup.entity),
	Prism.hooks.add('wrap', function (a) {
		'entity' === a.type &&
			(a.attributes.title = a.content.replace(/&amp;/, '&'));
	}),
	(Prism.languages.xml = Prism.languages.markup),
	(Prism.languages.html = Prism.languages.markup),
	(Prism.languages.mathml = Prism.languages.markup),
	(Prism.languages.svg = Prism.languages.markup);
(Prism.languages.css = {
	comment: /\/\*[\s\S]*?\*\//,
	atrule: {
		pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
		inside: { rule: /@[\w-]+/ }
	},
	url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	selector: /[^{}\s][^{};]*?(?=\s*\{)/,
	string: {
		pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
	important: /\B!important\b/i,
	function: /[-a-z0-9]+(?=\()/i,
	punctuation: /[(){};:]/
}),
	(Prism.languages.css.atrule.inside.rest = Prism.languages.css),
	Prism.languages.markup &&
		(Prism.languages.insertBefore('markup', 'tag', {
			style: {
				pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
				lookbehind: !0,
				inside: Prism.languages.css,
				alias: 'language-css',
				greedy: !0
			}
		}),
		Prism.languages.insertBefore(
			'inside',
			'attr-value',
			{
				'style-attr': {
					pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
					inside: {
						'attr-name': {
							pattern: /^\s*style/i,
							inside: Prism.languages.markup.tag.inside
						},
						punctuation: /^\s*=\s*['"]|['"]\s*$/,
						'attr-value': {
							pattern: /.+/i,
							inside: Prism.languages.css
						}
					},
					alias: 'language-css'
				}
			},
			Prism.languages.markup.tag
		));
Prism.languages.clike = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
	],
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	'class-name': {
		pattern:
			/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /[.\\]/ }
	},
	keyword:
		/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	boolean: /\b(?:true|false)\b/,
	function: /[a-z0-9_]+(?=\()/i,
	number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	punctuation: /[{}[\];(),.:]/
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
	keyword:
		/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
	operator:
		/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
})),
	Prism.languages.insertBefore('javascript', 'keyword', {
		regex: {
			pattern:
				/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
			lookbehind: !0,
			greedy: !0
		},
		'function-variable': {
			pattern:
				/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
			alias: 'function'
		},
		constant: /\b[A-Z][A-Z\d_]*\b/
	}),
	Prism.languages.insertBefore('javascript', 'string', {
		'template-string': {
			pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
			greedy: !0,
			inside: {
				interpolation: {
					pattern: /\${[^}]+}/,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\${|}$/,
							alias: 'punctuation'
						},
						rest: null
					}
				},
				string: /[\s\S]+/
			}
		}
	}),
	(Prism.languages.javascript[
		'template-string'
	].inside.interpolation.inside.rest = Prism.languages.javascript),
	Prism.languages.markup &&
		Prism.languages.insertBefore('markup', 'tag', {
			script: {
				pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
				lookbehind: !0,
				inside: Prism.languages.javascript,
				alias: 'language-javascript',
				greedy: !0
			}
		}),
	(Prism.languages.js = Prism.languages.javascript);
(Prism.languages['markup-templating'] = {}),
	Object.defineProperties(Prism.languages['markup-templating'], {
		buildPlaceholders: {
			value: function (e, t, n, a) {
				e.language === t &&
					((e.tokenStack = []),
					(e.code = e.code.replace(n, function (n) {
						if ('function' === typeof a && !a(n)) {
							return n;
						}
						for (
							var r = e.tokenStack.length;
							-1 !==
							e.code.indexOf('___' + t.toUpperCase() + r + '___');

						) {
							++r;
						}
						return (
							(e.tokenStack[r] = n),
							'___' + t.toUpperCase() + r + '___'
						);
					})),
					(e.grammar = Prism.languages.markup));
			}
		},
		tokenizePlaceholders: {
			value: function (e, t) {
				if (e.language === t && e.tokenStack) {
					e.grammar = Prism.languages[t];
					var n = 0,
						a = Object.keys(e.tokenStack),
						r = function (o) {
							if (!(n >= a.length)) {
								for (var i = 0; i < o.length; i++) {
									var g = o[i];
									if (
										'string' === typeof g ||
										(g.content &&
											'string' === typeof g.content)
									) {
										var c = a[n],
											s = e.tokenStack[c],
											l =
												'string' === typeof g
													? g
													: g.content,
											p = l.indexOf(
												'___' +
													t.toUpperCase() +
													c +
													'___'
											);
										if (p > -1) {
											++n;
											var f,
												u = l.substring(0, p),
												_ = new Prism.Token(
													t,
													Prism.tokenize(
														s,
														e.grammar,
														t
													),
													'language-' + t,
													s
												),
												k = l.substring(
													p +
														(
															'___' +
															t.toUpperCase() +
															c +
															'___'
														).length
												);
											if (
												(u || k
													? ((f = [u, _, k].filter(
															function (e) {
																return Boolean(
																	e
																);
															}
													  )),
													  r(f))
													: (f = _),
												'string' === typeof g
													? Array.prototype.splice.apply(
															o,
															[i, 1].concat(f)
													  )
													: (g.content = f),
												n >= a.length)
											) {
												break;
											}
										}
									} else {
										g.content &&
											'string' !== typeof g.content &&
											r(g.content);
									}
								}
							}
						};
					r(e.tokens);
				}
			}
		}
	});
(Prism.languages.json = {
	property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
	string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
	number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	punctuation: /[{}[\]);,]/,
	operator: /:/g,
	boolean: /\b(?:true|false)\b/i,
	null: /\bnull\b/i
}),
	(Prism.languages.jsonp = Prism.languages.json);
!(function (e) {
	(e.languages.php = e.languages.extend('clike', {
		keyword:
			/\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
		constant: /\b[A-Z0-9_]{2,}\b/,
		comment: {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: !0
		}
	})),
		e.languages.insertBefore('php', 'string', {
			'shell-comment': {
				pattern: /(^|[^\\])#.*/,
				lookbehind: !0,
				alias: 'comment'
			}
		}),
		e.languages.insertBefore('php', 'keyword', {
			delimiter: { pattern: /\?>|<\?(?:php|=)?/i, alias: 'important' },
			variable: /\$+(?:\w+\b|(?={))/i,
			package: {
				pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
				lookbehind: !0,
				inside: { punctuation: /\\/ }
			}
		}),
		e.languages.insertBefore('php', 'operator', {
			property: { pattern: /(->)[\w]+/, lookbehind: !0 }
		}),
		e.languages.insertBefore('php', 'string', {
			'nowdoc-string': {
				pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
				greedy: !0,
				alias: 'string',
				inside: {
					delimiter: {
						pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
						alias: 'symbol',
						inside: { punctuation: /^<<<'?|[';]$/ }
					}
				}
			},
			'heredoc-string': {
				pattern:
					/<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
				greedy: !0,
				alias: 'string',
				inside: {
					delimiter: {
						pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
						alias: 'symbol',
						inside: { punctuation: /^<<<"?|[";]$/ }
					},
					interpolation: null
				}
			},
			'single-quoted-string': {
				pattern: /'(?:\\[\s\S]|[^\\'])*'/,
				greedy: !0,
				alias: 'string'
			},
			'double-quoted-string': {
				pattern: /"(?:\\[\s\S]|[^\\"])*"/,
				greedy: !0,
				alias: 'string',
				inside: { interpolation: null }
			}
		}),
		delete e.languages.php.string;
	var n = {
		pattern:
			/{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
		lookbehind: !0,
		inside: { rest: e.languages.php }
	};
	(e.languages.php['heredoc-string'].inside.interpolation = n),
		(e.languages.php['double-quoted-string'].inside.interpolation = n),
		e.hooks.add('before-tokenize', function (n) {
			if (/(?:<\?php|<\?)/gi.test(n.code)) {
				var i = /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi;
				e.languages['markup-templating'].buildPlaceholders(n, 'php', i);
			}
		}),
		e.hooks.add('after-tokenize', function (n) {
			e.languages['markup-templating'].tokenizePlaceholders(n, 'php');
		});
})(Prism);
Prism.languages.insertBefore('php', 'variable', {
	this: /\$this\b/,
	global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
	scope: {
		pattern: /\b[\w\\]+::/,
		inside: { keyword: /static|self|parent/, punctuation: /::|\\/ }
	}
});
!(function () {
	if ('undefined' !== typeof self && self.Prism && self.document) {
		var t = [],
			e = {},
			n = function () {};
		Prism.plugins.toolbar = {};
		var a = (Prism.plugins.toolbar.registerButton = function (n, a) {
				var o;
				(o =
					'function' === typeof a
						? a
						: function (t) {
								var e;
								return (
									'function' === typeof a.onClick
										? ((e =
												document.createElement(
													'button'
												)),
										  (e.type = 'button'),
										  e.addEventListener(
												'click',
												function () {
													a.onClick.call(this, t);
												}
										  ))
										: 'string' === typeof a.url
										? ((e = document.createElement('a')),
										  (e.href = a.url))
										: (e = document.createElement('span')),
									(e.textContent = a.text),
									e
								);
						  }),
					t.push((e[n] = o));
			}),
			o = (Prism.plugins.toolbar.hook = function (a) {
				var o = a.element.parentNode;
				if (
					o &&
					/pre/i.test(o.nodeName) &&
					!o.parentNode.classList.contains('code-toolbar')
				) {
					var r = document.createElement('div');
					r.classList.add('code-toolbar'),
						o.parentNode.insertBefore(r, o),
						r.appendChild(o);
					var i = document.createElement('div');
					i.classList.add('toolbar'),
						document.body.hasAttribute('data-toolbar-order') &&
							(t = document.body
								.getAttribute('data-toolbar-order')
								.split(',')
								.map(function (t) {
									return e[t] || n;
								})),
						t.forEach(function (t) {
							var e = t(a);
							if (e) {
								var n = document.createElement('div');
								n.classList.add('toolbar-item'),
									n.appendChild(e),
									i.appendChild(n);
							}
						}),
						r.appendChild(i);
				}
			});
		a('label', function (t) {
			var e = t.element.parentNode;
			if (e && /pre/i.test(e.nodeName) && e.hasAttribute('data-label')) {
				var n,
					a,
					o = e.getAttribute('data-label');
				try {
					a = document.querySelector('template#' + o);
				} catch (r) {}
				return (
					a
						? (n = a.content)
						: (e.hasAttribute('data-url')
								? ((n = document.createElement('a')),
								  (n.href = e.getAttribute('data-url')))
								: (n = document.createElement('span')),
						  (n.textContent = o)),
					n
				);
			}
		}),
			Prism.hooks.add('complete', o);
	}
})();
!(function () {
	function e(e) {
		this.defaults = r({}, e);
	}
	function n(e) {
		return e.replace(/-(\w)/g, function (e, n) {
			return n.toUpperCase();
		});
	}
	function t(e) {
		for (var n = 0, t = 0; t < e.length; ++t) {
			e.charCodeAt(t) == '	'.charCodeAt(0) && (n += 3);
		}
		return e.length + n;
	}
	var r =
		Object.assign ||
		function (e, n) {
			for (var t in n) {
				n.hasOwnProperty(t) && (e[t] = n[t]);
			}
			return e;
		};
	(e.prototype = {
		setDefaults: function (e) {
			this.defaults = r(this.defaults, e);
		},
		normalize: function (e, t) {
			t = r(this.defaults, t);
			for (var i in t) {
				var o = n(i);
				'normalize' !== i &&
					'setDefaults' !== o &&
					t[i] &&
					this[o] &&
					(e = this[o].call(this, e, t[i]));
			}
			return e;
		},
		leftTrim: function (e) {
			return e.replace(/^\s+/, '');
		},
		rightTrim: function (e) {
			return e.replace(/\s+$/, '');
		},
		tabsToSpaces: function (e, n) {
			return (n = 0 | n || 4), e.replace(/\t/g, new Array(++n).join(' '));
		},
		spacesToTabs: function (e, n) {
			return (
				(n = 0 | n || 4), e.replace(new RegExp(' {' + n + '}', 'g'), '	')
			);
		},
		removeTrailing: function (e) {
			return e.replace(/\s*?$/gm, '');
		},
		removeInitialLineFeed: function (e) {
			return e.replace(/^(?:\r?\n|\r)/, '');
		},
		removeIndent: function (e) {
			var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
			return n && n[0].length
				? (n.sort(function (e, n) {
						return e.length - n.length;
				  }),
				  n[0].length ? e.replace(new RegExp('^' + n[0], 'gm'), '') : e)
				: e;
		},
		indent: function (e, n) {
			return e.replace(
				/^[^\S\n\r]*(?=\S)/gm,
				new Array(++n).join('	') + '$&'
			);
		},
		breakLines: function (e, n) {
			n = n === !0 ? 80 : 0 | n || 80;
			for (var r = e.split('\n'), i = 0; i < r.length; ++i) {
				if (!(t(r[i]) <= n)) {
					for (
						var o = r[i].split(/(\s+)/g), a = 0, s = 0;
						s < o.length;
						++s
					) {
						var l = t(o[s]);
						(a += l), a > n && ((o[s] = '\n' + o[s]), (a = l));
					}
					r[i] = o.join('');
				}
			}
			return r.join('\n');
		}
	}),
		'undefined' !== typeof module && module.exports && (module.exports = e),
		'undefined' !== typeof Prism &&
			((Prism.plugins.NormalizeWhitespace = new e({
				'remove-trailing': !0,
				'remove-indent': !0,
				'left-trim': !0,
				'right-trim': !0
			})),
			Prism.hooks.add('before-sanity-check', function (e) {
				var n = Prism.plugins.NormalizeWhitespace;
				if (
					!e.settings ||
					e.settings['whitespace-normalization'] !== !1
				) {
					if ((!e.element || !e.element.parentNode) && e.code) {
						return (
							(e.code = n.normalize(e.code, e.settings)), void 0
						);
					}
					var t = e.element.parentNode,
						r = /\bno-whitespace-normalization\b/;
					if (
						e.code &&
						t &&
						'pre' === t.nodeName.toLowerCase() &&
						!r.test(t.className) &&
						!r.test(e.element.className)
					) {
						for (
							var i = t.childNodes, o = '', a = '', s = !1, l = 0;
							l < i.length;
							++l
						) {
							var c = i[l];
							c == e.element
								? (s = !0)
								: '#text' === c.nodeName &&
								  (s ? (a += c.nodeValue) : (o += c.nodeValue),
								  t.removeChild(c),
								  --l);
						}
						if (
							e.element.children.length &&
							Prism.plugins.KeepMarkup
						) {
							var u = o + e.element.innerHTML + a;
							(e.element.innerHTML = n.normalize(u, e.settings)),
								(e.code = e.element.textContent);
						} else {
							(e.code = o + e.code + a),
								(e.code = n.normalize(e.code, e.settings));
						}
					}
				}
			}));
})();
!(function () {
	if ('undefined' !== typeof self && self.Prism && self.document) {
		if (!Prism.plugins.toolbar) {
			return (
				console.warn(
					'Show Languages plugin loaded before Toolbar plugin.'
				),
				void 0
			);
		}
		var e = {
			html: 'HTML',
			xml: 'XML',
			svg: 'SVG',
			mathml: 'MathML',
			css: 'CSS',
			clike: 'C-like',
			javascript: 'JavaScript',
			abap: 'ABAP',
			actionscript: 'ActionScript',
			apacheconf: 'Apache Configuration',
			apl: 'APL',
			applescript: 'AppleScript',
			arff: 'ARFF',
			asciidoc: 'AsciiDoc',
			asm6502: '6502 Assembly',
			aspnet: 'ASP.NET (C#)',
			autohotkey: 'AutoHotkey',
			autoit: 'AutoIt',
			basic: 'BASIC',
			csharp: 'C#',
			cpp: 'C++',
			coffeescript: 'CoffeeScript',
			csp: 'Content-Security-Policy',
			'css-extras': 'CSS Extras',
			django: 'Django/Jinja2',
			erb: 'ERB',
			fsharp: 'F#',
			gedcom: 'GEDCOM',
			glsl: 'GLSL',
			graphql: 'GraphQL',
			http: 'HTTP',
			hpkp: 'HTTP Public-Key-Pins',
			hsts: 'HTTP Strict-Transport-Security',
			ichigojam: 'IchigoJam',
			inform7: 'Inform 7',
			json: 'JSON',
			latex: 'LaTeX',
			livescript: 'LiveScript',
			lolcode: 'LOLCODE',
			'markup-templating': 'Markup templating',
			matlab: 'MATLAB',
			mel: 'MEL',
			n4js: 'N4JS',
			nasm: 'NASM',
			nginx: 'nginx',
			nsis: 'NSIS',
			objectivec: 'Objective-C',
			ocaml: 'OCaml',
			opencl: 'OpenCL',
			parigp: 'PARI/GP',
			php: 'PHP',
			'php-extras': 'PHP Extras',
			plsql: 'PL/SQL',
			powershell: 'PowerShell',
			properties: '.properties',
			protobuf: 'Protocol Buffers',
			q: 'Q (kdb+ database)',
			jsx: 'React JSX',
			tsx: 'React TSX',
			renpy: "Ren'py",
			rest: 'reST (reStructuredText)',
			sas: 'SAS',
			sass: 'Sass (Sass)',
			scss: 'Sass (Scss)',
			sql: 'SQL',
			soy: 'Soy (Closure Template)',
			tt2: 'Template Toolkit 2',
			typescript: 'TypeScript',
			vbnet: 'VB.Net',
			vhdl: 'VHDL',
			vim: 'vim',
			'visual-basic': 'Visual Basic',
			wasm: 'WebAssembly',
			wiki: 'Wiki markup',
			xojo: 'Xojo (REALbasic)',
			yaml: 'YAML'
		};
		Prism.plugins.toolbar.registerButton('show-language', function (t) {
			var a = t.element.parentNode;
			if (a && /pre/i.test(a.nodeName)) {
				var s =
					a.getAttribute('data-language') ||
					e[t.language] ||
					(t.language &&
						t.language.substring(0, 1).toUpperCase() +
							t.language.substring(1));
				if (s) {
					var i = document.createElement('span');
					return (i.textContent = s), i;
				}
			}
		});
	}
})();
!(function () {
	if ('undefined' !== typeof self && self.Prism && self.document) {
		if (!Prism.plugins.toolbar) {
			return (
				console.warn(
					'Copy to Clipboard plugin loaded before Toolbar plugin.'
				),
				void 0
			);
		}
		var o = window.ClipboardJS || void 0;
		o || 'function' !== typeof require || (o = require('clipboard'));
		var e = [];
		if (!o) {
			var t = document.createElement('script'),
				n = document.querySelector('head');
			(t.onload = function () {
				if ((o = window.ClipboardJS)) {
					for (; e.length; ) {
						e.pop()();
					}
				}
			}),
				(t.src =
					'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js'),
				n.appendChild(t);
		}
		Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (t) {
			function n() {
				var e = new o(i, {
					text: function () {
						return t.code;
					}
				});
				e.on('success', function () {
					(i.textContent = 'Copied!'), r();
				}),
					e.on('error', function () {
						(i.textContent = 'Press Ctrl+C to copy'), r();
					});
			}
			function r() {
				setTimeout(function () {
					i.textContent = 'Copy';
				}, 5e3);
			}
			var i = document.createElement('a');
			return (i.textContent = 'Copy'), o ? n() : e.push(n), i;
		});
	}
})();
