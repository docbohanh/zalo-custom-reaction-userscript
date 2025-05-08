// ==UserScript==
// @name         Zalo Custom Reactions
// @version      1.8
// @description  Zalo web custom reaction
// @author       Anhwaivo
// @maintainer   Kennex666 (UI/UX), Meohunter (TextBox), dacsang97 (Emoji Picker)
// @match        https://*.zalo.me/*
// @match        https://chat.zalo.me/*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://github.com/docbohanh/zalo-custom-reaction-userscript/raw/refs/heads/main/zalorcustomemoji.user.js
// ==/UserScript==

(function() {
	"use strict";

		const settings = {
			isRecently: false
		}

		const reactions = [
			{
				type: 100,
				icon: "👏",
				name: "clap",
				class: "emoji-sizer emoji-outer",
				bgPos: "80% 12.5%",
			},
			{
				type: 101,
				icon: "🎉",
				name: "huh",
				class: "emoji-sizer emoji-outer",
				bgPos: "74% 62.5%",
			},
			{
				type: 103,
				icon: "🎨",
				name: "send_custom",
				class: "emoji-sizer emoji-outer",
				bgPos: "84% 82.5%",
			},
			// Thêm emoji: Copy dòng dưới, sửa icon để thêm reaction tuỳ ý (gồm text hoặc emoji),
			// {type: "<thay icon vào>", icon: "<thay icon vào>", name: "<tên tuỳ ý>", class: "emoji-sizer emoji-outer", bgPos: "74% 62.5%"},
		];

		const RecentlyReaction = {
			add: function (reaction) {
				const emojiCustom = {
					type: simpleHash(reaction),
					icon: reaction,
					name: reaction,
					class: "emoji-sizer emoji-outer",
					bgPos: "0% 0%",
				};
				if (settings.isRecently){
					reactions[reactions.length - 1] = emojiCustom;
				}
				else {
					reactions.push(emojiCustom);
				}
				settings.isRecently = true;
				localStorage.setItem("recentlyCustomReaction", JSON.stringify(emojiCustom));
			},

			get: function () {
				const reaction = localStorage.getItem("recentlyCustomReaction");
				if (reaction) {
					return JSON.parse(reaction);
				}
				return null;
			},

			load: function () {
				const reaction = this.get();
				if (reaction) {
					settings.isRecently = true;
					reactions.push(reaction);
				}
			}

		}

		// Đồng bộ id cho người dùng script (Emoji sẽ hiện được khi người dùng xài cùng emoji)
		function simpleHash(str) {
			let hash = 0;
			for (let i = 0; i < str.length; i++) {
				hash = (hash << 5) - hash + str.charCodeAt(i);
				hash |= 0; // convert to 32-bit int
			}
			return Math.abs(hash); // chỉ là số, không có chữ
		}

		// Common emojis for the emoji picker
		const emojiCategories = {
			"Smileys": ["😀", "👻", "😵‍💫", "😵", "🤢", "🤮", "😈", "💩", "🎃", "🤑", "🤖", "🥳", "😆", "🤧", "😂", "🤣", "🥱", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😮‍💨", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥"],
			"Gestures": ["👋", "👏", "🙌", "🙏", "🤚", "✋", "🖖", "👐", "🤲", "🤝", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "👍", "👎", "✊", "👊", "🤛", "🤜"],
			"Flower": ["💐", "🌷", "🌹", "☘️", "🍀", "🌸", "🌻", "🌼", "🌺", "🪷", "🌱"],
            "People": ["👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👩‍🦱", "🧑‍🦱", "👨‍🦱", "👩‍🦰", "🧑‍🦰", "👨‍🦰", "👱‍♀️", "👱", "👱‍♂️", "👩‍🦳", "🧑‍🦳", "👨‍🦳", "👩‍🦲", "🧑‍🦲", "👨‍🦲", "🧔‍♀️", "🧔", "🧔‍♂️"],
			"Animals": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞"],
			"Food": ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🫑", "🌽", "🥕", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙"],
			"Activities": ["⚽️", "🏀", "🏈", "⚾️", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳️", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸", "🥌", "🎿"],
			"Objects": ["⌚️", "📱", "💻", "⌨️", "🖥", "🖱", "🖨", "🕹", "🗜", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽", "🎞", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛", "🧭", "⏱", "⏲", "⏰", "🕰"]

		};

		const createEmojiPicker = () => {
			const picker = document.createElement("div");
			picker.id = "emoji-picker";
			picker.style.cssText = `
				position: absolute;
				bottom: calc(100% + 10px);
				right: 0;
				background: white;
				border-radius: 12px;
				box-shadow: 0 4px 16px rgba(0,0,0,0.2);
				padding: 8px;
				z-index: 10000;
				animation: fadeIn 0.2s ease-out;
				width: 280px;
				max-height: 350px;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			`;

			// Create tabs for categories
			const tabsContainer = document.createElement("div");
			tabsContainer.style.cssText = `
				display: flex;
				overflow-x: auto;
				padding-bottom: 5px;
				margin-bottom: 5px;
				border-bottom: 1px solid #eee;
				gap: 4px;
				scrollbar-width: none;
				-ms-overflow-style: none;
				height: 36px;
				min-height: 36px;
				align-items: center;
			`;

			// Hide scrollbar
			tabsContainer.addEventListener('mousewheel', function(e) {
				this.scrollLeft += e.deltaY;
				e.preventDefault();
			});

			// Add CSS to hide scrollbar
			const style = document.createElement('style');
			style.textContent = `
				#emoji-picker div::-webkit-scrollbar {
					display: none;
				}
				.emoji-category-tab {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 28px;
					width: 28px;
				}
			`;
			document.head.appendChild(style);

			// Create emoji content container
			const emojiContent = document.createElement("div");
			emojiContent.style.cssText = `
				overflow-y: auto;
				display: grid;
				grid-template-columns: repeat(8, 1fr);
				gap: 4px;
				padding-right: 4px;
				max-height: 240px;
			`;

			// Create tabs for each category
			Object.keys(emojiCategories).forEach((category, idx) => {
				const tab = document.createElement("button");
				tab.className = "emoji-category-tab";
				tab.dataset.category = category;

				// Use an icon or first emoji to represent each category
				const categoryIcons = {
					"Smileys": "😀",
					"Gestures": "👍",
                    "Flower": "💐",
					"People": "👨",
					"Animals": "🐱",
					"Food": "🍔",
					"Activities": "⚽️",
					"Objects": "📱"
				};

				tab.textContent = categoryIcons[category] || category.slice(0, 1);
				tab.title = category;

				tab.style.cssText = `
					background: ${idx === 0 ? '#e3f2fd' : 'transparent'};
					border: none;
					border-radius: 6px;
					padding: 0;
					cursor: pointer;
					font-size: 16px;
					min-width: 28px;
					min-height: 28px;
					text-align: center;
					transition: background-color 0.2s;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				`;

				tab.addEventListener("click", () => {
					// Deselect all tabs
					document.querySelectorAll(".emoji-category-tab").forEach(t => {
						t.style.background = "transparent";
					});

					// Select this tab
					tab.style.background = "#e3f2fd";

					// Clear and populate emoji content
					emojiContent.innerHTML = "";

					// Add emojis for this category
					emojiCategories[category].forEach(emoji => {
						const emojiButton = document.createElement("button");
						emojiButton.className = "emoji-button";
						emojiButton.textContent = emoji;
						emojiButton.style.cssText = `
							background: none;
							border: none;
							cursor: pointer;
							font-size: 18px;
							padding: 4px;
							border-radius: 4px;
							transition: background-color 0.2s, transform 0.2s;
						`;
						emojiButton.onmouseover = () => {
							emojiButton.style.backgroundColor = "#f0f0f0";
							emojiButton.style.transform = "scale(1.1)";
						};
						emojiButton.onmouseout = () => {
							emojiButton.style.backgroundColor = "transparent";
							emojiButton.style.transform = "scale(1)";
						};

						emojiContent.appendChild(emojiButton);
					});
				});

				tabsContainer.appendChild(tab);
			});

			// Add tabs and content to picker
			picker.appendChild(tabsContainer);
			picker.appendChild(emojiContent);

			// Initialize with the first category
			setTimeout(() => {
				const firstTab = picker.querySelector(".emoji-category-tab");
				if (firstTab) firstTab.click();
			}, 0);

			document.addEventListener("click", (e) => {
				if (picker.style.display === "flex" && !picker.contains(e.target) && e.target.id !== "emoji-button") {
					picker.style.display = "none";
				}
			});

			picker.style.display = "none";
			return picker;
		};

		const createTextInputPopup = () => {
			const popup = document.createElement("div");
			popup.id = "custom-text-reaction-popup";
			popup.style.cssText = `
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: white;
				border-radius: 12px;
				box-shadow: 0 4px 20px rgba(0,0,0,0.25);
				padding: 20px;
				z-index: 9999;
				display: none;
				flex-direction: column;
				gap: 15px;
				min-width: 300px;
				font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
				animation: fadeIn 0.2s ease-out;
			`;

			const title = document.createElement("div");
			title.textContent = "Tùy chỉnh reaction";
			title.style.cssText = "font-weight: bold; font-size: 16px; color: #333; margin-bottom: 5px;";

			const inputContainer = document.createElement("div");
			inputContainer.style.cssText = "position: relative;";

			const input = document.createElement("input");
			input.type = "text";
			input.id = "custom-text-reaction-input";
			input.placeholder = "Nhập nội dung reaction...";
			input.maxLength = 15;
			input.style.cssText = `
				padding: 10px 12px;
				padding-right: 40px;
				border: 2px solid #e0e0e0;
				border-radius: 8px;
				width: 100%;
				box-sizing: border-box;
				font-size: 14px;
				transition: border-color 0.2s;
				outline: none;
			`;
			input.addEventListener("focus", () => {
				input.style.borderColor = "#2196F3";
			});
			input.addEventListener("blur", () => {
				input.style.borderColor = "#e0e0e0";
			});

			// Emoji button
			const emojiButton = document.createElement("button");
			emojiButton.id = "emoji-button";
			emojiButton.textContent = "😊";
			emojiButton.style.cssText = `
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
				background: none;
				border: none;
				font-size: 18px;
				cursor: pointer;
				padding: 0;
				opacity: 0.7;
				transition: opacity 0.2s, transform 0.2s;
			`;
			emojiButton.onmouseover = () => {
				emojiButton.style.opacity = "1";
				emojiButton.style.transform = "translateY(-50%) scale(1.1)";
			};
			emojiButton.onmouseout = () => {
				emojiButton.style.opacity = "0.7";
				emojiButton.style.transform = "translateY(-50%) scale(1)";
			};

			// Create emoji picker
			const emojiPicker = createEmojiPicker();

			// Toggle emoji picker
			emojiButton.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				if (emojiPicker.style.display === "none" || emojiPicker.style.display === "") {
					emojiPicker.style.display = "flex";
				} else {
					emojiPicker.style.display = "none";
				}
			});

			// Add emoji to input when clicked
			emojiPicker.addEventListener("click", (e) => {
				if (e.target.classList.contains("emoji-button")) {
					input.value += e.target.textContent;
					charCounter.textContent = `${input.value.length}/15`;
					emojiPicker.style.display = "none";
					input.focus();
				}
			});

			const charCounter = document.createElement("div");
			charCounter.style.cssText = "position: absolute; right: 10px; bottom: -18px; font-size: 11px; color: #999;";
			charCounter.textContent = "0/15";

			input.addEventListener("input", () => {
				charCounter.textContent = `${input.value.length}/15`;
			});

			inputContainer.appendChild(input);
			inputContainer.appendChild(emojiButton);
			inputContainer.appendChild(charCounter);
			inputContainer.appendChild(emojiPicker);

			const buttonContainer = document.createElement("div");
			buttonContainer.style.cssText = "display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;";

			const cancelButton = document.createElement("button");
			cancelButton.textContent = "Hủy";
			cancelButton.style.cssText = `
				padding: 8px 16px;
				border: none;
				border-radius: 6px;
				background-color: #f5f5f5;
				color: #333;
				font-weight: 500;
				cursor: pointer;
				transition: background-color 0.2s;
			`;
			cancelButton.onmouseover = () => {
				cancelButton.style.backgroundColor = "#e0e0e0";
			};
			cancelButton.onmouseout = () => {
				cancelButton.style.backgroundColor = "#f5f5f5";
			};
			cancelButton.onclick = () => {
				hidePopup();
			};

			const confirmButton = document.createElement("button");
			confirmButton.textContent = "Gửi";
			confirmButton.style.cssText = `
				padding: 8px 16px;
				border: none;
				border-radius: 6px;
				background-color: #2196F3;
				color: white;
				font-weight: 500;
				cursor: pointer;
				transition: background-color 0.2s;
			`;
			confirmButton.onmouseover = () => {
				confirmButton.style.backgroundColor = "#1976D2";
			};
			confirmButton.onmouseout = () => {
				confirmButton.style.backgroundColor = "#2196F3";
			};

			buttonContainer.appendChild(cancelButton);
			buttonContainer.appendChild(confirmButton);


			// key down event enter for input
			input.addEventListener("keydown", (e) => {
				if (e.key === "Enter") {
					confirmButton.click()
				}
			});

			popup.appendChild(title);
			popup.appendChild(inputContainer);
			popup.appendChild(buttonContainer);

			// Add overlay
			const overlay = document.createElement("div");
			overlay.id = "custom-reaction-overlay";
			overlay.style.cssText = `
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0,0,0,0.4);
				z-index: 9998;
				display: none;
				animation: fadeIn 0.2s ease-out;
			`;
			overlay.addEventListener("click", (e) => {
				if (e.target === overlay) {
					hidePopup();
				}
			});

			const hidePopup = () => {
				popup.style.display = "none";
				overlay.style.display = "none";
				emojiPicker.style.display = "none";
			};

			document.body.appendChild(popup);
			document.body.appendChild(overlay);

			return {
				popup,
				input,
				confirmButton,
				show: () => {
					popup.style.display = "flex";
					overlay.style.display = "block";
					input.value = "";
					charCounter.textContent = "0/15";
					input.focus();
				},
				hide: hidePopup,
				overlay
			};
		};

		const enhanceReactionPanel = () => {
			const style = document.createElement("style");
			style.textContent = `
				.reaction-emoji-list {
					display: flex !important;
					width: fit-content !important; /* Wider emoji list */
					gap: 2px !important;
					border-radius: 28px !important;
					background-color: white !important;
					box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important;
				}

				.reaction-emoji-icon {
					display: flex !important;
					align-items: center !important;
					justify-content: center !important;
					font-size: 20px !important;
					border-radius: 50% !important;
					cursor: pointer !important;
					background-color: rgba(240, 240, 240, 0.5) !important;
					transition: transform 0.2s, background-color 0.2s !important;
				}

				.reaction-emoji-text {
					white-space: nowrap !important;
					overflow: hidden !important;
					text-overflow: ellipsis !important;
					max-width: 3ch !important;
				}

				.reaction-emoji-icon:hover {
					transform: scale(1.1) !important;
					background-color: #e3f2fd !important;
				}

				.emoji-list-wrapper {
					padding: 0.07rem !important;
				}

				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}

				@keyframes popIn {
					0% { transform: scale(0.8); opacity: 0; }
					70% { transform: scale(1.05); opacity: 1; }
					100% { transform: scale(1); opacity: 1; }
				}
			`;
			document.head.appendChild(style);
		};

		const observer = new MutationObserver(mutations => mutations.forEach(m => {
			if (m.type === "childList" && m.addedNodes.length > 0 && Array.from(m.addedNodes).some(n => n.querySelector?.(".reaction-emoji-list"))) {
				setTimeout(() => {
					document.querySelectorAll(".reaction-emoji-list").forEach(list => {
						if (list.getAttribute("data-extended") !== "true") {
							list.setAttribute("data-extended", "true");
							const wrapper = list.closest(".emoji-list-wrapper");
							if (wrapper) {
								const btn = wrapper.querySelector('[id^="reaction-btn-"]');
								const id = btn?.id.replace("reaction-btn-", "");

								list.style.animation = "popIn 0.3s ease-out forwards";

								reactions.forEach((react, idx) => {
									const div = document.createElement("div");
									const divEmoji = document.createElement("span");
									div.className = "reaction-emoji-icon";
									if (react.icon.length > 2) {
										div.className += " reaction-emoji-text";
									}

									div.setAttribute("data-custom", "true");
									div.style.animationDelay = `${50 * (idx + 7)}ms`;

									if (react.name === "send_custom") {
										divEmoji.innerText = react.icon;
										div.title = "Gửi reaction tùy chỉnh";
									} else {
										if (react.icon.length > 2) {
											div.title = react.icon;
										}
										divEmoji.innerText = react.icon;
									}

									div.appendChild(divEmoji);
									list.appendChild(div);
									div.addEventListener("click", e => {
										e.preventDefault();
										e.stopPropagation();

										if (react.name === "send_custom") {
											if (!window.textInputPopup) {
												window.textInputPopup = createTextInputPopup();
											}

											window.textInputPopup.show();

											window.currentReactionContext = { wrapper, id };

											window.textInputPopup.confirmButton.onclick = () => {
												const customText = window.textInputPopup.input.value.trim();
												if (customText) {
													const customReaction = {
														...react,
														icon: customText,
														type: simpleHash(customText)
													};
													RecentlyReaction.add(customText);
													sendReaction(wrapper, id, customReaction);
													window.textInputPopup.hide();
												}
											};

											return;
										}

										sendReaction(wrapper, id, react);
									});
								});
							}
						}
					});
				}, 50);
			}
		}));

		function sendReaction(wrapper, id, react) {
			const getReactFiber = el => {
				for (const k in el) if (k.startsWith("__react")) return el[k];
				return null
			};

			let fiber = getReactFiber(wrapper);
			if (fiber) {
				while (fiber) {
					if (fiber.memoizedProps?.sendReaction) {
						fiber.memoizedProps.sendReaction({rType: react.type, rIcon: react.icon});
						id && updateBtn(id, react);
						break;
					}
					fiber = fiber.return;
				}
			}

			if (window.S?.default?.reactionMsgInfo) {
				const msg = wrapper.closest(".msg-item");
				const msgFiber = msg && getReactFiber(msg);
				msgFiber?.memoizedProps?.sendReaction({rType: react.type, rIcon: react.icon});
				id && updateBtn(id, react);
				wrapper.classList.add("hide-elist");
				wrapper.classList.remove("show-elist");
			}
		}

		function updateBtn(id, react) {
			const span = document.querySelector(`#reaction-btn-${id} span`);
			if (span) {
				span.innerHTML = "";

				if (react.name === "text" || typeof react.icon === "string" && react.icon.length > 2) {
					const textContainer = document.createElement("div");
					textContainer.className = "text-reaction";
					textContainer.textContent = react.icon;
					span.appendChild(textContainer);
				} else {
					const emoji = document.createElement("span");
					if (react.class) {
						emoji.className = react.class;
						emoji.style.cssText = `background: url("assets/emoji.1e7786c93c8a0c1773f165e2de2fd129.png?v=20180604") ${react.bgPos} / 5100% no-repeat; margin: -1px; position: relative; top: 2px`;
					} else {
						emoji.textContent = react.icon;
						emoji.style.fontSize = "20px";
					}
					span.appendChild(emoji);
				}
			}
		}

		function initReactions() {
			if (window.S?.default) {
				if (!window.S.default.reactionMsgInfo.some(r => r.rType >= 100)) {
					window.S.default.reactionMsgInfo = [...window.S.default.reactionMsgInfo, ...reactions.map(r => ({rType: r.type, rIcon: r.icon, name: r.name}))];
				}
			} else setTimeout(initReactions, 1000);
		}

		const style = document.createElement("style");
		style.textContent = `
			[data-custom="true"] { position: relative; }
			[data-custom="true"]::after {
				content: '';
				position: absolute;
				bottom: -2px;
				right: -2px;
				width: 6px;
				height: 6px;
				background: #2196F3;
				border-radius: 50%;
			}
			.msg-reaction-icon span {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			/* Text reaction styles */
			.text-reaction {
				background-color: #e3f2fd;
				border-radius: 12px;
				padding: 3px 10px;
				font-size: 12px;
				font-weight: 600;
				color: #1976d2;
				max-width: 120px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				box-shadow: 0 1px 3px rgba(0,0,0,0.1);
			}

			/* Hover tooltips */
			[data-custom="true"] {
				position: relative;
			}

			[data-custom="true"]:hover::before {
				content: attr(title);
				position: absolute;
				top: -30px;
				left: 50%;
				transform: translateX(-50%);
				background-color: rgba(0,0,0,0.7);
				color: white;
				padding: 4px 8px;
				border-radius: 4px;
				font-size: 12px;
				white-space: nowrap;
				pointer-events: none;
				opacity: 0;
				animation: fadeIn 0.2s forwards;
				z-index: 9999;
			}
		`;
		document.head.appendChild(style);

		const init = () => {
			observer.observe(document.body, {childList: true, subtree: true});
			initReactions();
			enhanceReactionPanel();
			RecentlyReaction.load();
		};
		"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", init) : init();
	})();

