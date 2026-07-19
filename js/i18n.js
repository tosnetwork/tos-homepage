// Multilingual translation system
const translations = {
  "en": {
    "nav.getStarted": "Start Here",
    "nav.getTOS": "Read Overview",
    "nav.startMining": "Build from Source",
    "nav.buildOnTOS": "AI Actor Model",
    "nav.learnMore": "Technical Reading",
    "nav.resources": "Repository",
    "nav.devTools": "ROADMAP",
    "nav.documentation": "Doc Index",
    "nav.whitepaper": "Whitepaper",
    "hero.title": "The Wallet Layer for<br><span class=\"highlight\">AI Robot Economies.</span>",
    "hero.getTOS": "Read Overview",
    "hero.startMining": "AI Actor Model",
    "features.subtitle": "TOS is being built for AI robots, agent runners, automation systems, and service actors that need persistent wallets, programmable authority, verifiable work receipts, and auditable settlement. The first product direction is not a consumer phone wallet; it is an agent-first wallet/account layer for machine economies.",
    "features.did.title": "AI Robot Wallets",
    "features.did.desc": "Agent wallets hold identity, balances, policy, task history, service limits, and controller keys in one machine-readable account surface. The wallet is an actor, not just a user interface.",
    "features.agiw.title": "Actor Model by Default",
    "features.agiw.desc": "Accounts, services, verifiers, and owner controls interact through asynchronous messages. This matches how autonomous agents already plan, delegate, wait for callbacks, and settle work.",
    "features.credits.title": "Verifiable Work Settlement",
    "features.credits.desc": "AGIW turns intelligent work into receipts that can be checked, disputed, priced, and paid. Agents earn for verified outcomes instead of vague activity claims.",
    "features.performance.title": "Policy-Bound Authority",
    "features.performance.desc": "Spend caps, allowlists, controller rotation, delegated authority, task budgets, and recovery flows belong inside the account model instead of being left to frontend checks.",
    "features.trilemma.title": "Agent Operations Stack",
    "features.trilemma.desc": "Node, liteserver, CLI, account, and service workflows are documented for operators running fleets of agents, not just individuals sending occasional payments.",
    "features.instant.title": "Service-to-Service Payments",
    "features.instant.desc": "Agents can pay for observations, compute, storage, verification, routing, and other machine services with settlement trails that owners can audit later.",
    "features.pruning.title": "Auditable Task History",
    "features.pruning.desc": "Wallet state is designed to expose decisions, receipts, approvals, and settlement traces so owners can inspect what an agent did and why funds moved.",
    "features.spv.title": "Lightweight Agent Clients",
    "features.spv.desc": "Agent runners and automation clients should verify the network with minimal state, predictable trust assumptions, and APIs built for machines.",
    "features.fairlaunch.title": "Autonomous Identity",
    "features.fairlaunch.desc": "AI actors need durable identity, controller rotation, attestations, and reputation so other actors can decide who to trust before work begins.",
    "features.deflationary.title": "Task Markets",
    "features.deflationary.desc": "The roadmap centers on tasks, receipts, disputes, sponsor routing, reputation, and payout flows that let AI agents exchange work for value.",
    "features.takovm.title": "Consensus for Agent Timing",
    "features.takovm.desc": "Fast, predictable chain progress matters when autonomous agents coordinate service calls, callbacks, escrow releases, and recurring payments.",
    "features.community.title": "Owner Approval Rails",
    "features.community.desc": "Humans remain owners and governors. TOS gives them approvals, policy updates, daily reports, and emergency controls over autonomous wallets.",
    "features.zkprivacy.title": "Proof-Aware Verification",
    "features.zkprivacy.desc": "The roadmap favors verifiable evidence, attestations, and proof references for agent work, audits, and dispute handling.",
    "features.cryptography.title": "Cryptographic Accounts",
    "features.cryptography.desc": "Agent wallets rely on strong signing, address serialization, controller keys, and account proofs that are suitable for automated high-frequency use.",
    "features.parallel.title": "Fleet-Ready Infrastructure",
    "features.parallel.desc": "TOS is positioned for operators managing many agents, queues, service endpoints, and wallets from one control plane.",
    "features.security.title": "Safety at Validation Time",
    "features.security.desc": "Risk controls should be enforced when actions are validated: quotas, spend limits, region tags, provider permissions, and delegated scopes.",
    "features.encrypted.title": "Private Agent Messaging",
    "features.encrypted.desc": "Agent communication needs encrypted delivery, relay-friendly routing, replay protection, and receipts so agents can coordinate outside toy chat demos.",
    "features.communication.title": "AI Service Economy",
    "features.communication.desc": "The end state is a network where AI actors discover services, negotiate tasks, pay providers, prove completion, and build reputation over time.",
    "features.coreTitle": "Built for AI Actor Wallets",
    "features.coreSubtitle": "The homepage now follows the roadmap: TOS is the wallet/account and settlement layer for AI robots, autonomous agents, and machine-run services.",
    "performance.title": "Signals That Matter for Agents",
    "performance.subtitle": "These are product signals for an AI wallet network: actors, policy, receipts, service settlement, lightweight verification, and operator control.",
    "stats.actorTypes.label": "Actor Types",
    "stats.actorTypes.desc": "Wallets, services, verifiers",
    "stats.node.label": "Core Stack",
    "stats.node.desc": "One network for agent accounts",
    "stats.cli.label": "Operator Path",
    "stats.cli.desc": "From nodes to agent fleets",
    "stats.cadence.label": "Fast Cadence",
    "stats.cadence.desc": "For callbacks and settlement",
    "stats.rpc.label": "Policy APIs",
    "stats.rpc.desc": "Machine-readable wallet control",
    "stats.receipts.label": "Receipts",
    "stats.receipts.desc": "Work, approval, settlement",
    "stats.state.label": "Account State",
    "stats.state.desc": "Identity, policy, balances",
    "stats.network.label": "Agent Network",
    "stats.network.desc": "Messaging and service routing",
    "docs.title": "Start with the Agent Roadmap",
    "docs.desc": "The fastest way to understand TOS is to read the roadmap, the AI actor model, and the account permission model.",
    "docs.smartContracts": "Read ROADMAP",
    "docs.aiMining": "Read AI Actors",
    "docs.exploreAll": "Read Account Model",
    "whitepaper.title": "Whitepaper & References",
    "whitepaper.desc": "Technical references remain available, while the product narrative now centers on AI actor wallets and service settlement.",
    "whitepaper.devStatus": "Simplex Consensus",
    "whitepaper.networkUpgrades": "Catchain Paper",
    "whitepaper.fift": "Fift Reference",
    "whitepaper.func": "FunC Reference",
    "whitepaper.forth": "Thinking Forth",
    "whitepaper.link": "Read Whitepaper",
    "faq.title": "Questions That Actually Matter",
    "faq.q1": "Why does TOS exist?",
    "faq.a1": "TOS exists to give AI robots and autonomous agents a wallet/account layer they can actually use: persistent identity, programmable authority, verifiable work receipts, and auditable settlement.",
    "faq.q2": "What does the AI Actor Model change?",
    "faq.a2.h1": "Wallets become actors",
    "faq.a2.p1": "An agent wallet can receive messages, enforce policy, manage balances, record task history, and coordinate service calls.",
    "faq.a2.h2": "Work becomes settleable",
    "faq.a2.p2": "AGIW receipts give agents a way to prove completed work before payment, dispute handling, or reputation updates.",
    "faq.a2.h3": "Authority becomes programmable",
    "faq.a2.p3": "Controller keys, delegated permissions, spend limits, and approvals are part of the account model instead of app-only behavior.",
    "faq.a2.h4": "Services become payable",
    "faq.a2.p4": "Agents can pay service actors for compute, data, verification, storage, routing, or other machine-facing services.",
    "faq.a2.h5": "Owners stay in control",
    "faq.a2.p5": "Human owners can approve policy changes, review reports, rotate keys, pause agents, and inspect audit trails.",
    "faq.q3": "Is TOS mainly building consumer phone wallets?",
    "faq.a3": "No. Consumer mobile wallets are not the first product direction. TOS is prioritizing AI robot wallets, agent runners, automation clients, and operator tools.",
    "faq.q4": "How can AI agents earn value?",
    "faq.a4": "Agents can accept tasks, submit verifiable receipts, receive settlement, build reputation, and pay other service actors in a closed operational loop.",
    "faq.q5": "Is this just positioning, or is there real infrastructure?",
    "faq.a5": "The repository includes node, liteserver, CLI, account, documentation, and roadmap work. The homepage now reflects that infrastructure direction instead of unrelated execution-domain narratives.",
    "faq.q6": "What makes this different from normal wallets?",
    "faq.a6": "Normal wallets are built around human clicks. AI robot wallets are built around policy, delegation, automated execution, receipts, and owner auditability.",
    "faq.q7": "What should builders read first?",
    "faq.a7": "Start with ROADMAP.md, doc/ai-actors.md, and doc/tos-account-permission-model.md. Those files define the current product direction.",
    "faq.bottomText": "The roadmap and source repository are the best way to verify the direction.",
    "footer.getStarted": "Start Here",
    "footer.getTOS": "Read Overview",
    "footer.startMining": "Build from Source",
    "footer.buildOnTOS": "AI Actor Model",
    "footer.learnMore": "Technical Reading",
    "footer.resources": "Repository",
    "footer.devTools": "ROADMAP",
    "footer.documentation": "Doc Index",
    "footer.whitepaper": "Whitepaper",
    "footer.connect": "Source",
    "footer.team": "Source Repository",
    "footer.connectWithUs": "Open an Issue",
    "footer.themeSong": "Listen to \"Digital Dawn\"",
    "footer.tagline": "Wallet infrastructure for AI robot economies.",
    "nav.connect": "Connect",
    "nav.telegram": "Telegram",
    "nav.discord": "Discord",
    "nav.twitter": "Twitter",
    "nav.language": "Language",
    "cta.viewGithub": "View on GitHub",
    "footer.community": "Community"
  },
  "zh": {
    "nav.getStarted": "开始了解",
    "nav.getTOS": "阅读概览",
    "nav.startMining": "源码构建",
    "nav.buildOnTOS": "AI Actor Model",
    "nav.learnMore": "技术资料",
    "nav.resources": "代码仓库",
    "nav.devTools": "路线图",
    "nav.documentation": "文档索引",
    "nav.whitepaper": "白皮书",
    "hero.title": "面向<br><span class=\"highlight\">AI 机器人经济</span>的钱包层",
    "hero.getTOS": "阅读概览",
    "hero.startMining": "AI Actor Model",
    "features.subtitle": "TOS 面向 AI 机器人、智能体运行器、自动化系统和服务型 Actor 构建。它们需要持久钱包、可编程权限、可验证工作回执和可审计结算。第一阶段重点不是普通手机钱包，而是机器经济使用的 agent-first 钱包/账户层。",
    "features.did.title": "AI 机器人钱包",
    "features.did.desc": "智能体钱包把身份、余额、策略、任务历史、服务额度和控制器密钥放在同一个机器可读账户界面里。钱包是 Actor，不只是手机 App。",
    "features.agiw.title": "Actor Model 优先",
    "features.agiw.desc": "账户、服务、验证者和 owner 控制通过异步消息交互，匹配自主智能体规划、委托、等待回调和结算工作的方式。",
    "features.credits.title": "可验证工作结算",
    "features.credits.desc": "AGIW 把智能工作变成可检查、可争议、可定价、可支付的回执。智能体按验证后的结果赚钱，而不是靠模糊活动声明。",
    "features.performance.title": "策略绑定权限",
    "features.performance.desc": "支出上限、白名单、控制器轮换、委托权限、任务预算和恢复流程应该进入账户模型，而不是留给前端检查。",
    "features.trilemma.title": "智能体运维栈",
    "features.trilemma.desc": "节点、liteserver、CLI、账户和服务流程面向运行智能体编队的 operator，而不是只给偶尔转账的个人用户。",
    "features.instant.title": "服务到服务支付",
    "features.instant.desc": "智能体可以为观察、计算、存储、验证、路由等机器服务付款，并留下 owner 后续可审计的结算轨迹。",
    "features.pruning.title": "可审计任务历史",
    "features.pruning.desc": "钱包状态需要暴露决策、回执、审批和结算痕迹，让 owner 看清智能体做了什么以及资金为什么移动。",
    "features.spv.title": "轻量智能体客户端",
    "features.spv.desc": "智能体运行器和自动化客户端需要用最少状态验证网络，并使用面向机器的可预测信任模型和 API。",
    "features.fairlaunch.title": "自主身份",
    "features.fairlaunch.desc": "AI Actor 需要持久身份、控制器轮换、证明和声誉，其他 Actor 才能在任务开始前判断是否可信。",
    "features.deflationary.title": "任务市场",
    "features.deflationary.desc": "路线图围绕任务、回执、争议、赞助路由、声誉和付款流程，让 AI 智能体用工作交换价值。",
    "features.takovm.title": "适合智能体时序的共识",
    "features.takovm.desc": "当自主智能体协调服务调用、回调、托管释放和周期支付时，快速且可预测的链上进展很关键。",
    "features.community.title": "Owner 审批通道",
    "features.community.desc": "人类仍然是 owner 和治理者。TOS 为自主钱包提供审批、策略更新、日报和紧急控制。",
    "features.zkprivacy.title": "证明感知验证",
    "features.zkprivacy.desc": "路线图重视可验证证据、证明引用和 attestations，用于智能体工作、审计和争议处理。",
    "features.cryptography.title": "密码学账户",
    "features.cryptography.desc": "智能体钱包依赖强签名、地址序列化、控制器密钥和账户证明，以适应自动化高频使用。",
    "features.parallel.title": "面向编队的基础设施",
    "features.parallel.desc": "TOS 面向从一个控制面管理多个智能体、队列、服务端点和钱包的 operator。",
    "features.security.title": "验证时安全控制",
    "features.security.desc": "风险控制应在动作验证时执行：额度、支出限制、地区标签、服务商权限和委托范围。",
    "features.encrypted.title": "私密智能体消息",
    "features.encrypted.desc": "智能体通信需要加密投递、中继友好路由、防重放和回执，而不是停留在演示聊天。",
    "features.communication.title": "AI 服务经济",
    "features.communication.desc": "最终形态是一张让 AI Actor 发现服务、协商任务、支付服务商、证明完成并累积声誉的网络。",
    "features.coreTitle": "为 AI Actor 钱包而建",
    "features.coreSubtitle": "主页现在跟随路线图：TOS 是 AI 机器人、自主智能体和机器服务的钱包/账户与结算层。",
    "performance.title": "对智能体真正重要的信号",
    "performance.subtitle": "这些是 AI 钱包网络的产品信号：Actor、策略、回执、服务结算、轻量验证和 operator 控制。",
    "stats.actorTypes.label": "Actor 类型",
    "stats.actorTypes.desc": "钱包、服务、验证者",
    "stats.node.label": "核心栈",
    "stats.node.desc": "一张网承载智能体账户",
    "stats.cli.label": "运维路径",
    "stats.cli.desc": "从节点到智能体编队",
    "stats.cadence.label": "快速节奏",
    "stats.cadence.desc": "面向回调和结算",
    "stats.rpc.label": "策略 API",
    "stats.rpc.desc": "机器可读的钱包控制",
    "stats.receipts.label": "回执",
    "stats.receipts.desc": "工作、审批、结算",
    "stats.state.label": "账户状态",
    "stats.state.desc": "身份、策略、余额",
    "stats.network.label": "智能体网络",
    "stats.network.desc": "消息与服务路由",
    "docs.title": "从 Agent 路线图开始",
    "docs.desc": "理解 TOS 的最快路径，是阅读路线图、AI Actor Model 和账户权限模型。",
    "docs.smartContracts": "阅读 ROADMAP",
    "docs.aiMining": "阅读 AI Actors",
    "docs.exploreAll": "阅读账户模型",
    "whitepaper.title": "白皮书与技术参考",
    "whitepaper.desc": "技术参考继续保留，但产品叙事已经转向 AI Actor 钱包和服务结算。",
    "whitepaper.devStatus": "Simplex 共识",
    "whitepaper.networkUpgrades": "Catchain 论文",
    "whitepaper.fift": "Fift 参考",
    "whitepaper.func": "FunC 参考",
    "whitepaper.forth": "Thinking Forth",
    "whitepaper.link": "阅读白皮书",
    "faq.title": "这些问题才真正重要",
    "faq.q1": "TOS 为什么存在？",
    "faq.a1": "TOS 是为了给 AI 机器人和自主智能体提供真正可用的钱包/账户层：持久身份、可编程权限、可验证工作回执和可审计结算。",
    "faq.q2": "AI Actor Model 改变了什么？",
    "faq.a2.h1": "钱包变成 Actor",
    "faq.a2.p1": "智能体钱包可以接收消息、执行策略、管理余额、记录任务历史并协调服务调用。",
    "faq.a2.h2": "工作变得可结算",
    "faq.a2.p2": "AGIW 回执让智能体在付款、争议处理或声誉更新前证明已完成工作。",
    "faq.a2.h3": "权限变得可编程",
    "faq.a2.p3": "控制器密钥、委托权限、支出限制和审批成为账户模型的一部分，而不是 App 行为。",
    "faq.a2.h4": "服务变得可支付",
    "faq.a2.p4": "智能体可以为计算、数据、验证、存储、路由等机器服务支付费用。",
    "faq.a2.h5": "Owner 保持控制",
    "faq.a2.p5": "人类 owner 可以审批策略变更、查看报告、轮换密钥、暂停智能体并检查审计轨迹。",
    "faq.q3": "TOS 主要是在做普通手机钱包吗？",
    "faq.a3": "不是。普通消费级移动钱包不是第一阶段方向。TOS 优先做 AI 机器人钱包、智能体运行器、自动化客户端和 operator 工具。",
    "faq.q4": "AI 智能体如何赚钱？",
    "faq.a4": "智能体可以接受任务、提交可验证回执、获得结算、积累声誉，并向其他服务型 Actor 付款。",
    "faq.q5": "这只是定位包装，还是已有基础设施？",
    "faq.a5": "仓库已经包含节点、liteserver、CLI、账户、文档和路线图工作。主页现在反映这个方向，而不是不相关的工作链叙事。",
    "faq.q6": "这和普通钱包有什么不同？",
    "faq.a6": "普通钱包围绕人的点击设计。AI 机器人钱包围绕策略、委托、自动执行、回执和 owner 审计设计。",
    "faq.q7": "开发者应该先读什么？",
    "faq.a7": "先读 ROADMAP.md、doc/ai-actors.md 和 doc/tos-account-permission-model.md，它们定义了当前产品方向。",
    "faq.bottomText": "路线图和源码仓库是验证这个方向的最好入口。",
    "footer.getStarted": "开始了解",
    "footer.getTOS": "阅读概览",
    "footer.startMining": "源码构建",
    "footer.buildOnTOS": "AI Actor Model",
    "footer.learnMore": "技术资料",
    "footer.resources": "代码仓库",
    "footer.devTools": "路线图",
    "footer.documentation": "文档索引",
    "footer.whitepaper": "白皮书",
    "footer.connect": "源码入口",
    "footer.team": "源代码仓库",
    "footer.connectWithUs": "提交 Issue",
    "footer.themeSong": "收听《Digital Dawn》",
    "footer.tagline": "面向 AI 机器人经济的钱包基础设施。",
    "nav.connect": "联系我们",
    "nav.telegram": "Telegram",
    "nav.discord": "Discord",
    "nav.twitter": "Twitter",
    "nav.language": "语言",
    "cta.viewGithub": "在 GitHub 上查看",
    "footer.community": "社区"
  },
  "ja": {
    "nav.buildOnTOS": "AI Actor Model",
    "nav.devTools": "ロードマップ",
    "hero.title": "AIロボット経済のための<br><span class=\"highlight\">ウォレットレイヤー。</span>",
    "hero.startMining": "AI Actor Model",
    "features.subtitle": "TOSは、AIロボット、エージェントランナー、自動化システム、サービスActorのための永続ウォレット、プログラム可能な権限、検証可能な作業レシート、監査可能な決済を中心に構築されています。",
    "features.did.title": "AIロボットウォレット",
    "features.did.desc": "エージェントウォレットは、ID、残高、ポリシー、タスク履歴、サービス制限、コントローラーキーを機械可読のアカウント面にまとめます。",
    "features.agiw.title": "Actor Modelを標準に",
    "features.agiw.desc": "アカウント、サービス、検証者、所有者制御は非同期メッセージで連携します。これは自律エージェントの委任、待機、決済に合います。",
    "features.credits.title": "検証可能な作業決済",
    "features.credits.desc": "AGIWは知的作業を確認、異議申し立て、価格付け、支払いができるレシートに変えます。",
    "features.performance.title": "ポリシーで縛られた権限",
    "features.performance.desc": "支出上限、許可リスト、キー更新、委任権限、タスク予算、復旧フローをアカウントモデルに置きます。",
    "features.trilemma.title": "エージェント運用スタック",
    "features.trilemma.desc": "ノード、liteserver、CLI、アカウント、サービス運用は、個人向け決済ではなくエージェント群の運用を想定します。",
    "features.instant.title": "サービス間支払い",
    "features.instant.desc": "エージェントは計算、データ、検証、ストレージ、ルーティングなどの機械向けサービスに支払えます。",
    "features.pruning.title": "監査可能なタスク履歴",
    "features.pruning.desc": "意思決定、レシート、承認、決済履歴を残し、所有者が資金移動を確認できます。",
    "features.spv.title": "軽量エージェントクライアント",
    "features.spv.desc": "エージェントランナーは少ない状態でネットワークを検証し、機械向けAPIを利用できます。",
    "features.fairlaunch.title": "自律ID",
    "features.fairlaunch.desc": "AI Actorには、永続ID、キー更新、証明、評判が必要です。",
    "features.deflationary.title": "タスクマーケット",
    "features.deflationary.desc": "タスク、レシート、紛争、スポンサー経路、評判、支払いを中心にAIエージェントの価値交換を支えます。",
    "features.takovm.title": "エージェントの時序に合う合意",
    "features.takovm.desc": "サービス呼び出し、コールバック、エスクロー解放、定期支払いには予測可能な進行が必要です。",
    "features.community.title": "所有者承認レール",
    "features.community.desc": "人間の所有者は、承認、ポリシー更新、レポート、緊急制御を通じて自律ウォレットを統制します。",
    "features.zkprivacy.title": "証明を意識した検証",
    "features.zkprivacy.desc": "作業、監査、紛争処理のために、検証可能な証拠と証明参照を重視します。",
    "features.cryptography.title": "暗号学的アカウント",
    "features.cryptography.desc": "自動化された高頻度利用に向け、署名、アドレス、キー、アカウント証明を重視します。",
    "features.parallel.title": "フリート対応基盤",
    "features.parallel.desc": "多数のエージェント、キュー、サービスエンドポイント、ウォレットを1つの制御面で管理します。",
    "features.security.title": "検証時の安全制御",
    "features.security.desc": "クォータ、支出制限、地域タグ、プロバイダー権限、委任範囲を検証時に強制します。",
    "features.encrypted.title": "プライベートなエージェント通信",
    "features.encrypted.desc": "暗号化配送、リレーしやすいルーティング、リプレイ防止、レシートを備えた通信を想定します。",
    "features.communication.title": "AIサービス経済",
    "features.communication.desc": "AI Actorがサービスを発見し、タスクを交渉し、支払い、完了を証明し、評判を築くネットワークです。",
    "features.coreTitle": "AI Actorウォレットのために構築",
    "features.coreSubtitle": "TOSはAIロボット、自律エージェント、機械サービスのウォレット/アカウントと決済レイヤーです。",
    "performance.title": "エージェントに重要なシグナル",
    "performance.subtitle": "Actor、ポリシー、レシート、サービス決済、軽量検証、運用者制御が中心です。",
    "stats.actorTypes.label": "Actor種別",
    "stats.actorTypes.desc": "ウォレット、サービス、検証者",
    "stats.node.desc": "エージェント口座のための1つのネットワーク",
    "stats.cli.desc": "ノードからエージェント群へ",
    "stats.cadence.label": "高速テンポ",
    "stats.cadence.desc": "コールバックと決済のために",
    "stats.rpc.label": "ポリシーAPI",
    "stats.rpc.desc": "機械可読なウォレット制御",
    "stats.receipts.label": "レシート",
    "stats.receipts.desc": "作業、承認、決済",
    "stats.state.label": "アカウント状態",
    "stats.state.desc": "ID、ポリシー、残高",
    "stats.network.label": "エージェントネットワーク",
    "stats.network.desc": "メッセージとサービス経路",
    "docs.title": "エージェントロードマップから開始",
    "docs.desc": "ROADMAP、AI Actor Model、アカウント権限モデルが現在の方向を示します。",
    "docs.smartContracts": "ROADMAPを読む",
    "docs.aiMining": "AI Actorsを読む",
    "docs.exploreAll": "アカウントモデルを読む",
    "faq.q1": "なぜTOSは存在するのですか？",
    "faq.a1": "TOSはAIロボットと自律エージェントに、永続ID、プログラム可能な権限、検証可能な作業レシート、監査可能な決済を持つウォレット/アカウント層を提供するために存在します。",
    "faq.q2": "AI Actor Modelは何を変えますか？",
    "faq.a2.h1": "ウォレットがActorになる",
    "faq.a2.p1": "エージェントウォレットはメッセージを受け、ポリシーを強制し、残高を管理し、タスク履歴を記録します。",
    "faq.a2.h2": "作業が決済可能になる",
    "faq.a2.p2": "AGIWレシートにより、支払いや評判更新の前に作業完了を証明できます。",
    "faq.a2.h3": "権限がプログラム可能になる",
    "faq.a2.p3": "キー、委任、支出制限、承認がアカウントモデルの一部になります。",
    "faq.a2.h4": "サービスが支払い可能になる",
    "faq.a2.p4": "エージェントは計算、データ、検証、保存、経路などのサービスに支払えます。",
    "faq.a2.h5": "所有者は制御を保つ",
    "faq.a2.p5": "所有者は承認、レポート確認、キー更新、一時停止、監査履歴確認ができます。",
    "faq.q3": "TOSは主に一般向けスマホウォレットを作っていますか？",
    "faq.a3": "いいえ。最初の優先対象はAIロボットウォレット、エージェントランナー、自動化クライアント、運用者ツールです。",
    "faq.q4": "AIエージェントはどう価値を得ますか？",
    "faq.a4": "タスクを受け、検証可能なレシートを提出し、決済を受け、評判を築き、他のサービスActorに支払います。",
    "faq.q5": "これは言葉だけですか？",
    "faq.a5": "リポジトリにはノード、liteserver、CLI、アカウント、文書、ロードマップ作業があります。",
    "faq.q6": "通常のウォレットと何が違いますか？",
    "faq.a6": "通常のウォレットは人のクリック中心です。AIロボットウォレットはポリシー、委任、自動実行、レシート、監査性が中心です。",
    "faq.q7": "最初に何を読むべきですか？",
    "faq.a7": "ROADMAP.md、doc/ai-actors.md、doc/tos-account-permission-model.mdから始めてください。",
    "footer.buildOnTOS": "AI Actor Model",
    "footer.devTools": "ロードマップ",
    "footer.tagline": "AIロボット経済のウォレット基盤。",
    "nav.getStarted": "はじめに",
    "nav.getTOS": "概要を読む",
    "nav.startMining": "ソースからビルド",
    "nav.learnMore": "技術資料",
    "nav.resources": "リポジトリ",
    "nav.documentation": "ドキュメント索引",
    "nav.whitepaper": "ホワイトペーパー",
    "nav.connect": "接続",
    "nav.telegram": "Telegram",
    "nav.discord": "Discord",
    "nav.twitter": "Twitter",
    "nav.language": "言語",
    "hero.getTOS": "概要を読む",
    "stats.node.label": "中核スタック",
    "stats.cli.label": "運用経路",
    "faq.title": "本当に大事な質問",
    "faq.bottomText": "ロードマップとソースリポジトリが方向性を確認する最短経路です。",
    "cta.viewGithub": "GitHubで見る",
    "footer.getStarted": "はじめに",
    "footer.getTOS": "概要を読む",
    "footer.startMining": "ソースからビルド",
    "footer.learnMore": "技術資料",
    "footer.resources": "リポジトリ",
    "footer.documentation": "ドキュメント索引",
    "footer.whitepaper": "ホワイトペーパー",
    "footer.connect": "ソース",
    "footer.team": "ソースリポジトリ",
    "footer.connectWithUs": "Issueを作成",
    "footer.themeSong": "「Digital Dawn」を聴く",
    "footer.community": "コミュニティ",
    "whitepaper.title": "ホワイトペーパーと技術資料",
    "whitepaper.desc": "技術資料は引き続き利用できますが、プロダクトの物語はAI Actorウォレットとサービス決済を中心にしています。",
    "whitepaper.devStatus": "Simplexコンセンサス",
    "whitepaper.networkUpgrades": "Catchain論文",
    "whitepaper.fift": "Fiftリファレンス",
    "whitepaper.func": "FunCリファレンス",
    "whitepaper.forth": "Thinking Forth",
    "whitepaper.link": "ホワイトペーパーを読む"
  },
  "ko": {
    "nav.buildOnTOS": "AI Actor Model",
    "nav.devTools": "로드맵",
    "hero.title": "AI 로봇 경제를 위한<br><span class=\"highlight\">지갑 레이어.</span>",
    "hero.startMining": "AI Actor Model",
    "features.subtitle": "TOS는 AI 로봇, 에이전트 러너, 자동화 시스템, 서비스 Actor가 사용할 영구 지갑, 프로그래밍 가능한 권한, 검증 가능한 작업 영수증, 감사 가능한 결제를 중심으로 구축됩니다.",
    "features.did.title": "AI 로봇 지갑",
    "features.did.desc": "에이전트 지갑은 신원, 잔액, 정책, 작업 기록, 서비스 한도, 컨트롤러 키를 기계가 읽을 수 있는 계정 표면에 담습니다.",
    "features.agiw.title": "Actor Model 기본값",
    "features.agiw.desc": "계정, 서비스, 검증자, 소유자 제어는 비동기 메시지로 상호작용합니다. 이는 자율 에이전트의 위임, 대기, 결제 방식과 맞습니다.",
    "features.credits.title": "검증 가능한 작업 결제",
    "features.credits.desc": "AGIW는 지능형 작업을 확인, 분쟁, 가격 책정, 지급 가능한 영수증으로 바꿉니다.",
    "features.performance.title": "정책으로 묶인 권한",
    "features.performance.desc": "지출 한도, 허용 목록, 키 교체, 위임 권한, 작업 예산, 복구 흐름을 계정 모델에 둡니다.",
    "features.trilemma.title": "에이전트 운영 스택",
    "features.trilemma.desc": "노드, liteserver, CLI, 계정, 서비스 흐름은 개인 결제가 아니라 에이전트 플릿 운영을 겨냥합니다.",
    "features.instant.title": "서비스 간 결제",
    "features.instant.desc": "에이전트는 계산, 데이터, 검증, 저장, 라우팅 같은 기계 서비스에 비용을 지불할 수 있습니다.",
    "features.pruning.title": "감사 가능한 작업 기록",
    "features.pruning.desc": "결정, 영수증, 승인, 결제 흔적을 남겨 소유자가 자금 이동 이유를 확인할 수 있습니다.",
    "features.spv.title": "경량 에이전트 클라이언트",
    "features.spv.desc": "에이전트 러너는 적은 상태로 네트워크를 검증하고 기계용 API를 사용해야 합니다.",
    "features.fairlaunch.title": "자율 신원",
    "features.fairlaunch.desc": "AI Actor는 영구 신원, 키 교체, 증명, 평판이 필요합니다.",
    "features.deflationary.title": "작업 시장",
    "features.deflationary.desc": "작업, 영수증, 분쟁, 후원 라우팅, 평판, 지급 흐름이 AI 에이전트 가치 교환의 중심입니다.",
    "features.takovm.title": "에이전트 타이밍에 맞는 합의",
    "features.takovm.desc": "서비스 호출, 콜백, 에스크로 해제, 반복 지급에는 예측 가능한 진행이 필요합니다.",
    "features.community.title": "소유자 승인 레일",
    "features.community.desc": "인간 소유자는 승인, 정책 갱신, 보고서, 긴급 제어로 자율 지갑을 통제합니다.",
    "features.zkprivacy.title": "증명 인식 검증",
    "features.zkprivacy.desc": "작업, 감사, 분쟁 처리를 위해 검증 가능한 증거와 증명 참조를 중시합니다.",
    "features.cryptography.title": "암호학적 계정",
    "features.cryptography.desc": "자동화된 고빈도 사용을 위해 서명, 주소, 키, 계정 증명을 중시합니다.",
    "features.parallel.title": "플릿 준비 인프라",
    "features.parallel.desc": "많은 에이전트, 큐, 서비스 엔드포인트, 지갑을 하나의 제어면에서 관리합니다.",
    "features.security.title": "검증 시점의 안전 제어",
    "features.security.desc": "할당량, 지출 제한, 지역 태그, 제공자 권한, 위임 범위를 검증 시점에 강제합니다.",
    "features.encrypted.title": "비공개 에이전트 메시징",
    "features.encrypted.desc": "암호화 전달, 릴레이 친화적 라우팅, 재생 방지, 영수증을 갖춘 통신이 필요합니다.",
    "features.communication.title": "AI 서비스 경제",
    "features.communication.desc": "AI Actor가 서비스를 발견하고, 작업을 협상하고, 지불하고, 완료를 증명하고, 평판을 쌓는 네트워크입니다.",
    "features.coreTitle": "AI Actor 지갑을 위해 구축",
    "features.coreSubtitle": "TOS는 AI 로봇, 자율 에이전트, 기계 서비스의 지갑/계정 및 결제 레이어입니다.",
    "performance.title": "에이전트에 중요한 신호",
    "performance.subtitle": "Actor, 정책, 영수증, 서비스 결제, 경량 검증, 운영자 제어가 중심입니다.",
    "stats.actorTypes.label": "Actor 유형",
    "stats.actorTypes.desc": "지갑, 서비스, 검증자",
    "stats.node.desc": "에이전트 계정을 위한 하나의 네트워크",
    "stats.cli.desc": "노드에서 에이전트 플릿까지",
    "stats.cadence.label": "빠른 리듬",
    "stats.cadence.desc": "콜백과 결제를 위해",
    "stats.rpc.label": "정책 API",
    "stats.rpc.desc": "기계가 읽는 지갑 제어",
    "stats.receipts.label": "영수증",
    "stats.receipts.desc": "작업, 승인, 결제",
    "stats.state.label": "계정 상태",
    "stats.state.desc": "신원, 정책, 잔액",
    "stats.network.label": "에이전트 네트워크",
    "stats.network.desc": "메시징과 서비스 라우팅",
    "docs.title": "에이전트 로드맵부터 시작",
    "docs.desc": "ROADMAP, AI Actor Model, 계정 권한 모델이 현재 방향을 설명합니다.",
    "docs.smartContracts": "ROADMAP 읽기",
    "docs.aiMining": "AI Actors 읽기",
    "docs.exploreAll": "계정 모델 읽기",
    "faq.q1": "TOS는 왜 존재하나요?",
    "faq.a1": "TOS는 AI 로봇과 자율 에이전트에게 영구 신원, 프로그래밍 가능한 권한, 검증 가능한 작업 영수증, 감사 가능한 결제를 가진 지갑/계정 레이어를 제공하기 위해 존재합니다.",
    "faq.q2": "AI Actor Model은 무엇을 바꾸나요?",
    "faq.a2.h1": "지갑이 Actor가 됩니다",
    "faq.a2.p1": "에이전트 지갑은 메시지를 받고, 정책을 강제하고, 잔액을 관리하고, 작업 기록을 남깁니다.",
    "faq.a2.h2": "작업이 결제 가능해집니다",
    "faq.a2.p2": "AGIW 영수증은 지급이나 평판 갱신 전에 완료된 작업을 증명하게 합니다.",
    "faq.a2.h3": "권한이 프로그래밍 가능해집니다",
    "faq.a2.p3": "키, 위임, 지출 제한, 승인이 계정 모델의 일부가 됩니다.",
    "faq.a2.h4": "서비스가 지급 가능해집니다",
    "faq.a2.p4": "에이전트는 계산, 데이터, 검증, 저장, 라우팅 서비스에 비용을 지불할 수 있습니다.",
    "faq.a2.h5": "소유자는 제어를 유지합니다",
    "faq.a2.p5": "소유자는 승인, 보고서 확인, 키 교체, 일시 정지, 감사 기록 확인을 할 수 있습니다.",
    "faq.q3": "TOS는 주로 소비자용 휴대폰 지갑을 만드나요?",
    "faq.a3": "아닙니다. 첫 우선순위는 AI 로봇 지갑, 에이전트 러너, 자동화 클라이언트, 운영자 도구입니다.",
    "faq.q4": "AI 에이전트는 어떻게 가치를 얻나요?",
    "faq.a4": "작업을 받고, 검증 가능한 영수증을 제출하고, 결제를 받고, 평판을 쌓고, 다른 서비스 Actor에게 지불합니다.",
    "faq.q5": "말뿐인가요?",
    "faq.a5": "저장소에는 노드, liteserver, CLI, 계정, 문서, 로드맵 작업이 포함되어 있습니다.",
    "faq.q6": "일반 지갑과 무엇이 다른가요?",
    "faq.a6": "일반 지갑은 사람의 클릭 중심입니다. AI 로봇 지갑은 정책, 위임, 자동 실행, 영수증, 감사 가능성이 중심입니다.",
    "faq.q7": "무엇을 먼저 읽어야 하나요?",
    "faq.a7": "ROADMAP.md, doc/ai-actors.md, doc/tos-account-permission-model.md부터 시작하세요.",
    "footer.buildOnTOS": "AI Actor Model",
    "footer.devTools": "로드맵",
    "footer.tagline": "AI 로봇 경제를 위한 지갑 인프라.",
    "nav.getStarted": "먼저 보기",
    "nav.getTOS": "개요 읽기",
    "nav.startMining": "소스에서 빌드",
    "nav.learnMore": "기술 자료",
    "nav.resources": "리포지토리",
    "nav.documentation": "문서 색인",
    "nav.whitepaper": "백서",
    "nav.connect": "연결",
    "nav.telegram": "Telegram",
    "nav.discord": "Discord",
    "nav.twitter": "Twitter",
    "nav.language": "언어",
    "hero.getTOS": "개요 읽기",
    "stats.node.label": "핵심 스택",
    "stats.cli.label": "운영 경로",
    "faq.title": "정말 중요한 질문들",
    "faq.bottomText": "로드맵과 소스 저장소가 방향을 확인하는 가장 빠른 길입니다.",
    "cta.viewGithub": "GitHub에서 보기",
    "footer.getStarted": "먼저 보기",
    "footer.getTOS": "개요 읽기",
    "footer.startMining": "소스에서 빌드",
    "footer.learnMore": "기술 자료",
    "footer.resources": "리포지토리",
    "footer.documentation": "문서 색인",
    "footer.whitepaper": "백서",
    "footer.connect": "소스",
    "footer.team": "소스 리포지토리",
    "footer.connectWithUs": "이슈 열기",
    "footer.themeSong": "\"Digital Dawn\" 듣기",
    "footer.community": "커뮤니티",
    "whitepaper.title": "백서와 기술 참고자료",
    "whitepaper.desc": "기술 참고자료는 계속 제공되며, 제품 내러티브는 AI Actor 지갑과 서비스 결제를 중심으로 합니다.",
    "whitepaper.devStatus": "Simplex 합의",
    "whitepaper.networkUpgrades": "Catchain 논문",
    "whitepaper.fift": "Fift 참고자료",
    "whitepaper.func": "FunC 참고자료",
    "whitepaper.forth": "Thinking Forth",
    "whitepaper.link": "백서 읽기"
  }
};

// Language configuration
const languages = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어'
};

// Get current language
function getCurrentLanguage() {
  const lang = localStorage.getItem('language') || 'en';
  return translations[lang] ? lang : 'en';
}

// Set language
function setLanguage(lang) {
  if (!translations[lang]) {
    lang = 'en';
  }
  localStorage.setItem('language', lang);
  updatePageLanguage(lang);
  updateLanguageSelector(lang);
  updateWhitepaperLinks(lang);

  // Dispatch custom event when language changes
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Update page language
function updatePageLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Simply replace the entire content with translation
      // The translation strings already include HTML when needed
      element.innerHTML = translations[lang][key];
    }
  });

  // Update HTML lang attribute
  const langMap = {
    'en': 'en',
    'zh': 'zh-CN',
    'ja': 'ja',
    'ko': 'ko'
  };
  document.documentElement.lang = langMap[lang] || 'en';
}

// Update language selector display (update active class and SVG icons)
function updateLanguageSelector(lang) {
  // SVG for selected state (filled circle with checkmark)
  const selectedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="10" fill="#DCE9F9"></circle>
<path d="M14.5323 7.0002C14.4144 7.00376 14.3026 7.05218 14.2204 7.13519L9.09007 12.1708L5.77714 8.91902C5.73487 8.87753 5.68469 8.84464 5.62945 8.82218C5.57422 8.79973 5.51502 8.78814 5.45524 8.78814C5.39546 8.78814 5.33626 8.79973 5.28103 8.82218C5.2258 8.84464 5.17561 8.87753 5.13334 8.91902C5.09106 8.96051 5.05753 9.00978 5.03465 9.06399C5.01178 9.1182 5 9.1763 5 9.23498C5 9.29366 5.01178 9.35176 5.03465 9.40598C5.05753 9.46019 5.09106 9.50945 5.13334 9.55095L8.76817 13.1187C8.81038 13.1603 8.86054 13.1933 8.91579 13.2159C8.97103 13.2384 9.03026 13.25 9.09007 13.25C9.14989 13.25 9.20912 13.2384 9.26436 13.2159C9.3196 13.1933 9.36977 13.1603 9.41198 13.1187L14.8609 7.76707C14.9269 7.70461 14.9722 7.62403 14.9907 7.53585C15.0092 7.44767 15 7.35605 14.9645 7.27306C14.9289 7.19008 14.8686 7.11955 14.7914 7.07086C14.7143 7.02216 14.6239 6.99753 14.5323 7.0002Z" fill="#4A90E2"></path>
</svg>`;

  // SVG for unselected state (empty circle)
  const unselectedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<circle cx="10" cy="10" r="9.5" stroke="#D3D4D8"></circle>
</svg>`;

  // Update all language options
  document.querySelectorAll('.language-option').forEach(option => {
    const optionLang = option.getAttribute('data-lang');
    const span = option.querySelector('span');
    const svgContainer = option.querySelector('svg');

    if (optionLang === lang) {
      // Selected language
      span.classList.add('active');
      if (svgContainer) {
        svgContainer.outerHTML = selectedSVG;
      }
    } else {
      // Unselected language
      span.classList.remove('active');
      if (svgContainer) {
        svgContainer.outerHTML = unselectedSVG;
      }
    }
  });
}

// Update whitepaper links based on language
function updateWhitepaperLinks(lang) {
  const pdfPath = 'pdf/tos.pdf';

  // Update all three whitepaper links
  const navLink = document.getElementById('whitepaper-link-nav');
  const sectionLink = document.getElementById('whitepaper-link-section');
  const footerLink = document.getElementById('whitepaper-link-footer');

  if (navLink) {
    navLink.href = pdfPath;
  }
  if (sectionLink) {
    sectionLink.href = pdfPath;
  }
  if (footerLink) {
    footerLink.href = pdfPath;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const currentLang = getCurrentLanguage();
  updatePageLanguage(currentLang);
  updateLanguageSelector(currentLang);
  updateWhitepaperLinks(currentLang);

  // Add language switch event listeners
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);

      // Close dropdown menu after selection
      const dropdownMenu = this.closest('.dropdown-menu');
      const dropdown = this.closest('.dropdown');
      if (dropdownMenu) {
        dropdownMenu.classList.remove('show');
      }
      if (dropdown) {
        dropdown.classList.remove('show');
      }
    });
  });

  // Dispatch custom event when language changes
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
});

// Expose i18n functions to window for language switcher
window.i18n = {
  getCurrentLanguage,
  setLanguage,
  updatePageLanguage,
  updateLanguageSelector,
  updateWhitepaperLinks
};
