# 动效方案

结果：PASS。场景数：4。桌面：PASS。390px：PASS。`prefers-reduced-motion`：PASS。

1. Banner：三张真实 Banner 低频淡入切换，保留前后按钮、分页与暂停；手机减少转场位移，静态 fallback 为首张。
2. 内容进入视口：主要区块使用 20–28px 渐显上移，卡片 70ms 错峰；只在真实进入视口后记录完成，基础 CSS 默认内容可见，不使用全局超时提前结算。
3. 合作客户：采用 React Bits LogoLoop 的连续左向循环，真实 Logo、悬停/显式控制暂停；减弱动画和小屏降级为静态可换行列表。
4. 证书：采用 Anli `original-certificate-motion` 的分段推进机制，证书保持竖版完整显示，支持手动切换、触摸和暂停；减弱动画为横向静态滚动。

外部候选：React Bits LogoLoop（采用）；Motion One scroll reveal pattern（仅借鉴逐区块触发，避免额外依赖）；GSAP horizontal loop（不采用，当前需求用原生/React 实现更轻）；React Bits ScrollExpand（不采用，普通新站视频关闭且会把关键证据藏到滚动之后）。

