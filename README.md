# 月亮棋 (Moon Chess)

## 项目简介 (Project Introduction)

一个源于原神伴月纪闻的类似于井字棋的网页游戏，规则只比井字棋多了一条：在双方落下第三个棋子之后，第一个棋子闪烁，落下第四个棋子后第一个棋子消失，也就是说在棋盘上两位棋手分别最多只有三个棋子在棋盘上面。

A web game inspired by Genshin Impact's "Moonlit Chronicles," similar to tic-tac-toe, with only one additional rule: after both players place their third piece, the first placed piece begins to blink; after placing the fourth piece, the first piece disappears. This means that at any time, each player can have at most three pieces on the board.

## 技术实现 (Technical Implementation)

- **前端技术**：HTML5, CSS3, JavaScript (ES6+)
- **响应式设计**：适配不同屏幕尺寸
- **视觉效果**：CSS动画、过渡效果、发光效果
- **双语支持**：中文和英文界面切换
- **AI逻辑**：智能落子策略，包括进攻和防守
- **用户体验**：流畅的落子动画、清晰的视觉反馈

- **Frontend Technologies**: HTML5, CSS3, JavaScript (ES6+)
- **Responsive Design**: Adaptation to different screen sizes
- **Visual Effects**: CSS animations, transitions, glow effects
- **Bilingual Support**: Switch between Chinese and English interfaces
- **AI Logic**: Intelligent move strategies, including offense and defense
- **User Experience**: Smooth placement animations, clear visual feedback

## 如何使用 (How to Use)

1. 克隆或下载本项目到本地
2. 在项目根目录运行本地服务器
   ```bash
   # 使用 Node.js
   npx http-server -p 8000
   ```
3. 在浏览器中访问 `http://localhost:8000`

1. Clone or download this project to your local machine
2. Run a local server in the project root directory
   ```bash
   # using Node.js
   npx http-server -p 8000
   ```
3. Visit `http://localhost:8000` in your browser

## 项目预览（Project Preview）

项目预览页面`https://moonchess.meorain.cn`
visit`https://moonchess.meorain.cn`

## 项目结构 (Project Structure)

```
├── index.html          # 游戏界面
├── style.css           # 样式文件
├── game.js             # 游戏核心逻辑
├── ai.js               # 电脑AI逻辑
├── app.js              # 网页交互逻辑
├── package.json        # 项目配置
└── README.md           # 项目说明
```

## 许可证 (License)

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.

## 贡献 (Contributing)

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

Welcome to submit Issues and Pull Requests to help improve this project!

---

**享受游戏乐趣！** 🌙✨

**Enjoy the game!** 