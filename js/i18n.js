/* TOS Blockchain translations. English remains the HTML default. */
(function () {
  "use strict";
  var translations = {
    zh: {
      "home.k": "TOS Blockchain · 一层区块链",
      "home.h": "面向智能体互联网的<br>区块链。",
      "home.d":
        "AI 时代的区块链基础设施。以分片与异步消息为底座，结合后量子认证、原生资产隐私转账和可编程账户。",
      start: "开始开发",
      source: "源代码",
      "strip.pq": "密码学方案可持续升级",
      "strip.privacy": "屏蔽转账，保护私密价值",
      "home.pq.h": "可升级的后量子安全",
      "home.pq.d":
        "TOS 当前实现 ML-DSA-44 验证者签名。带算法标识的密钥与稳定的验证者身份，为通过协调的协议升级采用其他后量子签名方案提供基础。",
      "home.pq.a": "了解安全",
      "home.privacy.h": "原生资产隐私转账",
      "home.privacy.d":
        "原生 TOS 隐私池结合零知识交易证明、一次性票据授权与面向收款人的加密交付。",
      "home.privacy.a": "了解隐私",
      "home.execution.h": "面向程序的区块链",
      "home.execution.d":
        "TVM 合约通过异步消息通信。分片链处理账户状态，主链协调网络。",
      "home.execution.a": "了解架构",
      "home.core.h": "安全授权，<br>私密价值，原生执行。",
      "home.core.d":
        "安全的授权、私密的价值转移、可编程的执行。这三项能力都已进入 TOS 代码库。",
      "agent.limit": "单笔限额，每日预算。<br>策略由所有者控制。",
      "agent.task":
        "任务合约把资金与接单、结果、审核、争议和结算绑定。区块链执行合约规则，应用提供工作与证据。",
      "contracts.link": "了解合约原语",
      "home.agent.h": "自主软件，<br>可约束的链上权限。",
      "home.agent.d":
        "AI 智能体需要能够执行授权边界的账户。TOS 提供合约级支出限额、控制密钥轮换、防重放和预先出资的任务结算。",
      "nav.platform": "开发者",
      "validator.link": "运行验证者",
      "home.build.h": "在 TOS 上开发。",
      "home.build.d":
        "编写合约、探索协议或运行验证者。从开源工具和可复现的本地网络开始。",
      "nav.overview": "概览",
      "nav.foundation": "技术架构",
      "nav.privacy": "隐私",
      "nav.pq": "安全",
      "nav.token": "代币",
      "nav.roadmap": "路线图",
      "footer.tag": "面向智能体互联网的区块链。",
      "footer.explore": "探索",
      "footer.build": "开发",
      docs: "文档",
      paper: "技术概述",
      "footer.connect": "联系",
      terms: "使用条款",
      "footer.note": "开源，公开开发。实现进展与网络启用状态分别验证。",
      "overview.k": "区块链概览",
      "overview.h": "AI 时代的<br>区块链基础设施。",
      "overview.d":
        "TOS 是开源的一层区块链，具备主链、分片链、原生 TVM 合约、后量子验证者认证与原生资产隐私转账实现。",
      "overview.auth.h": "认证关键操作",
      "overview.auth.d":
        "验证者签名认证共识。账户合约定义谁能操作、适用哪些限额，以及权限如何变更。",
      "overview.value.h": "转移与结算价值",
      "overview.value.d":
        "原生 TOS 支付网络费用并为合约出资。隐私票据提供明确范围的隐私保护，托管合约执行具体的结算规则。",
      "overview.state.h": "协调共享状态",
      "overview.state.d":
        "合约维护确定性的账户状态。消息连接跨分片账户，验证者证书认证已接受的链历史。",
      "overview.role.h": "区块链提供的能力。",
      "overview.ai.note":
        "模型与工具在应用中运行。TOS 验证授权、执行合约规则并记录链上结果。",
      "overview.ai.h": "为什么智能体需要区块链？",
      "overview.ai.d":
        "自主程序需要稳定身份、可执行的预算、确定性合约和可验证结算。TOS 将这些需求纳入账户与执行模型。",
      "overview.paths.h": "探索协议。",
      "technology.k": "技术架构",
      "technology.h": "共享安全，<br>分片执行。",
      "technology.d":
        "主链协调配置与验证者。Native 工作链承载 TVM 账户，分片链划分其状态与执行。",
      "arch.master": "主链",
      "arch.master.d": "网络配置 · 验证者集合 · 分片承诺",
      "arch.native": "Native 工作链 · 0",
      "arch.native.d": "TVM 账户 · 合约代码 · 异步消息",
      "arch.stack.h": "一个网络，多个执行分区。",
      "arch.stack.d":
        "标准创世配置启用主链与 Native 工作链 0。代码支持分片拆分与合并；此图展示架构，不代表实时分片数量。",
      "arch.target":
        "400 毫秒是配置的目标区块间隔，不是实测的端到端最终确认或吞吐量保证。实际表现取决于网络与生效配置。",
      "arch.consensus.h": "Simplex 共识，<br>QUIC 传输。",
      "arch.consensus.d":
        "验证者认证提案和投票，形成按权重计算的法定人数证书，推进公证与最终确认。标准配置选择基于 QUIC 的 Simplex v2。",
      "ref.vm": "TVM 规范",
      "ref.simplex": "Simplex 论文",
      "ref.genesis": "标准创世配置",
      "arch.vm.h": "执行由消息驱动。",
      "arch.vm.d":
        "TVM 在 cell 数据模型上执行合约并确定性地计量 gas。交易具有独立的计算、动作和退回行为。跨合约工作通过消息完成，需要显式处理回复与失败。",
      "privacy.k": "Shielded TOS · 隐私转账",
      "privacy.h": "私密的价值，<br>可验证的交易。",
      "privacy.d":
        "原生 TOS 隐私池通过零知识证明验证私密票据交易，结合后量子支出授权与加密票据交付。",
      "privacy.deposit": "存入 TOS",
      "privacy.deposit.d": "公开进入隐私池",
      "privacy.transfer": "转移票据",
      "privacy.transfer.d": "私密见证，链上验证",
      "privacy.withdraw": "提取 TOS",
      "privacy.withdraw.d": "从隐私池公开支付",
      "privacy.flow.h": "面向原生 TOS 的明确隐私层。",
      "privacy.flow.d":
        "V1 使用固定的两输入、三输出交易结构。承诺表示票据，nullifier 防止重复花费。真实与占位输出的载荷长度相同。",
      "privacy.proof.h": "证明交易有效性",
      "privacy.proof.d":
        "电路检查票据成员关系、所有权见证、金额约束与资金守恒。Poseidon2 用于承诺及树哈希。",
      "privacy.auth.h": "授权每次支出",
      "privacy.auth.d":
        "每张票据的一次性密钥签署交易意图，将权限绑定到明确的输入、输出、支付与有效期。",
      "privacy.delivery.h": "私密交付票据",
      "privacy.delivery.d":
        "收款人扫描链上加密载荷并恢复票据。认证将加密数据绑定到执行域与输出槽位。",
      "privacy.crypto.h": "三种机制，<br>各自明确的保护。",
      "privacy.pq":
        "Groth16 基于配对，不是后量子证明系统。后量子授权与加密不意味着整个隐私协议都抗量子。",
      "privacy.boundary.h": "明确隐私的范围。",
      "privacy.boundary.d":
        "私密票据金额与所有权见证在证明内部验证。存入、提取、公开支付、费用、承诺、nullifier 和时间仍可能暴露信息或产生关联。网络匿名性与钱包安全需要独立保护。",
      "ref.profile": "隐私池规范",
      "ref.circuit": "电路实现",
      "ref.ceremony": "仪式流程",
      "privacy.status.h": "实现与启用。",
      "privacy.status.d":
        "合约、电路、钱包与仪式工具已有实现。公共网络启用仍需通过冻结规范的验收条件。开发证明密钥使用已知种子，绝不能保护真实资金。生产使用需要已验证的仪式产物与匹配的部署身份。",
      "security.k": "后量子认证",
      "security.h": "保护权限，<br>守护区块链。",
      "security.d":
        "TOS 当前实现 ML-DSA-44 验证者签名。共识格式显式携带算法标识，将验证者身份与签名密钥分开，为未来升级其他后量子算法提供基础。",
      "security.pk": "ML-DSA-44 公钥",
      "security.sig": "ML-DSA-44 签名",
      "security.suite": "当前共识算法",
      "security.genesis.h": "标准创世配置，<br>原生后量子验证者。",
      "security.genesis.d":
        "标准生成器选择协议版本 18、四个等权 PQ 验证者及 ML-DSA-44 算法 ID 1。公开身份通过 validator-pq.pub 输入，私钥由运营者保管。生成器拒绝旧的经典密码创世文件。",
      "security.root.h": "根授权",
      "security.root.d":
        "验证者控制器是稳定的账户身份。根授权操作依照合约规则控制密钥绑定与轮换。",
      "security.consensus.h": "专用签名密钥",
      "security.consensus.d":
        "共识密钥在专用签名上下文中认证 Simplex 消息。共识权限与控制器的任意支出权限分开。",
      "security.transport.h": "独立网络身份",
      "security.transport.d":
        "ADNL 传输身份用于节点通信。后量子共识签名不代表所有网络连接都使用后量子密码。",
      "security.roles.h": "密钥可轮换，身份保持稳定。",
      "ref.pqvm": "验签指令",
      "ref.authmodule": "账户认证",
      "ref.pqgenesis": "PQ 验证者启动",
      "security.vm.h": "智能合约内部的<br>后量子授权。",
      "security.vm.d":
        "PQCHECKSIG_MLDSA44 在规范编码的 cell 上验证 Pure ML-DSA-44 签名。采用认证模块的账户可以预备迁移、要求仅模块授权，或要求模块与经典签名共同授权。",
      "security.scope":
        "安全需要分层评估。Groth16 不抗量子；现有钱包、管理路径、传输与托管需要逐项评估。仓库实现不能证明公共网络的生效配置，也不等于独立安全审计。",
      "dev.k": "开发工具",
      "dev.h": "构建合约，<br>编程价值。",
      "dev.d":
        "使用 Tol、FunC 与 Fift 开发消息驱动合约。在本地探索 TVM 执行，测试完整交易生命周期，并通过链客户端与运营工具接入。",
      "dev.tol.h": "表达合约行为",
      "dev.tol.d":
        "类型化存储、消息接收器与显式状态机。编译器检查状态可达性、字段范围、接收覆盖和回复关联；部分诊断是警告，部分为错误。",
      "dev.func.h": "控制 cell 与消息",
      "dev.func.d":
        "FunC 将合约逻辑编译为 TVM 指令。Fift 汇编代码、构造 cell 与初始状态，并支持部署流程。",
      "dev.test.h": "测试真实交易行为",
      "dev.test.d":
        "验证计算、动作与退回行为。仓库包含沙箱测试、电路交叉验证及安全边界的负向对照。",
      "dev.languages.h": "原生执行的开发工具。",
      "dev.agent.h": "智能体账户",
      "dev.agent.d":
        "单次与每日支出限额、所有者策略、控制器轮换、有效期与防重放。",
      "dev.escrow.h": "任务托管",
      "dev.escrow.d":
        "创建者预先出资的任务，包含接单、提交结果、审核、争议及合约定义的结算权限。",
      "dev.assets.h": "代币与市场",
      "dev.assets.d":
        "Jetton、NFT、高负载钱包、多签，以及具有抵押与裁决规则的二元预测市场合约。源码存在不等于部署验收通过。",
      "dev.contracts.h": "面向自主应用的合约原语。",
      "ref.build": "构建要求",
      "ref.local": "本地 PQ 网络",
      "ref.tol": "Tol 语言参考",
      "dev.start.h": "从本地链开始。",
      "dev.start.d":
        "构建节点与合约工具链，创建可丢弃的 PQ 网络，并在处理真实资金前验证合约行为。本地指南涵盖验证者授权、选举与故障诊断。",
      "docs.index": "文档索引",
      "ref.node": "运行全节点",
      "dev.interfaces.h": "连接区块链。",
      "dev.interfaces.d":
        "JSON-RPC 与 Lite Client 提供链访问接口。Rust tosctl 支持节点控制与运营流程。全节点与验证者指南记录部署及配置方法。",
      "token.k": "原生资产",
      "token.h": "TOS 驱动<br>网络运行。",
      "token.d":
        "原生 TOS 支付交易、存储与转发费用，为合约余额和托管出资，并为验证者参与提供质押。",
      "token.genesis": "标准创世 TOS",
      "token.target": "两年供应目标",
      "token.policy": "后续年度政策目标",
      "token.schedule":
        "这些是配置与政策目标，不是硬性供应上限，也不会在两年后自动切换。当前每区块奖励持续生效，直到治理修改 ConfigParam 14。后续约 2% 的年度目标需要独立变更。",
      "token.issuance.h": "验证者发行，<br>由网络配置管理。",
      "token.issuance.d":
        "TOS 没有固定的供应上限。标准创世配置为 101,000 TOS：100,000 TOS 的验证者启动钱包和两个各 500 TOS 的系统储备。验证者区块奖励以约两年达到约千万 TOS 总量为校准目标。",
      "token.reward.h": "保护网络",
      "token.reward.d":
        "配置的区块奖励通过验证者产出的最终确认区块创建 TOS，并进入选举器的奖励记账。应用工作与链下评分不能铸造原生 TOS。",
      "token.fee.h": "为执行付费",
      "token.fee.d":
        "交易、存储与消息转发费用为网络资源定价。费用转移已有 TOS，与发行和应用收入分别计算。",
      "token.stake.h": "参与选举",
      "token.stake.d":
        "质押限制与周期性选举管理验证者参与。四个等权验证者是标准启动集合，不代表已经具备独立运营者多样性。",
      "token.flows.h": "发行与费用，<br>是不同的资金流。",
      "ref.config": "配置参数",
      "token.source.h": "阅读配置。",
      "token.source.d":
        "标准模板为验证者启动和系统储备出资，没有指定的团队、投资人、基金会、生态或金库分配。公共网络供应量与余额需要验证当前链状态。TOS 不提供固定收益或价格保证。",
      "roadmap.k": "协议开发",
      "roadmap.h": "构建，验证，<br>依据证据启用。",
      "roadmap.d":
        "TOS 开发围绕区块链展开：共识、密码学、隐私、执行、开发工具与可靠的节点运行。里程碑区分源码实现与网络启用。",
      "roadmap.pq.h": "后量子共识",
      "roadmap.pq.d":
        "ML-DSA-44 共识签名与验签、PQ 验证者描述、稳定控制器和协议 18 的标准创世配置已有实现。公共网络发布需验证配置、运营者密钥准备和协调发布流程。",
      "roadmap.pq.s": "源码已实现",
      "roadmap.privacy.h": "原生资产隐私转账",
      "roadmap.privacy.d":
        "合约、电路、钱包与仪式工具已有实现。公共启用前，需要完成生产仪式、独立验证、匹配的部署身份、资金准备与冻结隐私规范的验收条件。",
      "roadmap.privacy.s": "已实现 · 启用需验收",
      "roadmap.dev.h": "合约与开发工具",
      "roadmap.dev.d":
        "Tol、FunC、Fift、沙箱执行、智能体账户、任务托管、多签与资产合约构成开发基础。持续完善工具、集成覆盖、客户端易用性与显式故障处理。",
      "roadmap.dev.s": "已实现 · 持续开发",
      "roadmap.operations.h": "验证者与节点运行",
      "roadmap.operations.d":
        "仓库包含全节点、验证者、选举与健康监测工具。需在具体部署域验证独立运营者、恢复、监测覆盖、发布来源与持续网络表现。",
      "roadmap.operations.s": "需要运行验收",
      "roadmap.work.h": "开发重点。",
      "ref.release": "发布政策",
      "ref.upgrade": "协议升级流程",
      "ref.versions": "协议版本",
      "roadmap.evidence.h": "跟踪代码与发布证据。",
      "roadmap.evidence.d":
        "路线图说明当前源码基础，不代表实时网络遥测，也不承诺上线日期。生效协议版本、验证者集合、部署与性能须在指定网络中验证。",
      "security.agility.h": "今天具备后量子安全，<br>未来持续演进密码学。",
      "security.agility.d":
        "ML-DSA-44 是当前的签名方案，并非对单一算法的永久绑定。验证者描述与签名显式携带算法 ID；稳定的验证者身份独立于密钥 ID，后者绑定算法与公钥。随着标准、安全研究和运行需求变化，这一设计为 TOS 演进密码学方案提供基础。",
      "security.agility.review.h": "集成新的签名方案",
      "security.agility.review.d":
        "新的后量子签名方案需要获准的算法 ID、验签实现，以及经过测试的密钥、签名和证书大小限制。目前仅允许 ML-DSA-44，未知算法会被拒绝。",
      "security.agility.prepare.h": "准备验证者升级",
      "security.agility.prepare.d":
        "发布兼容的节点软件，配置新的签名密钥，并在测试网验证过渡过程。稳定的验证者身份独立于可更换的签名凭证；算法迁移必须遵守协议的授权规则。",
      "security.agility.activate.h": "协调启用新规则",
      "security.agility.activate.d":
        "通过协调的协议升级，让验证者在启用边界采用一致的验签规则。采用其他后量子算法属于网络升级，不能由单个验证者自行选择切换。",
      "ref.pqformat": "携带算法标识的共识格式",
      "strip.speed.h": "400 毫秒",
      "strip.speed": "目标出块时间",
      "strip.privacy.h": "零知识隐私",
      "strip.pq.h": "后量子安全",
      "strip.ai.h": "AI 原生",
      "strip.ai": "面向智能体的可编程账户",
    },
    ja: {
      "home.k": "TOS Blockchain · レイヤー1",
      "home.h":
        "エージェント型<br>インターネットのための<br>ブロックチェーン。",
      "home.d":
        "AI 時代のブロックチェーン基盤。シャーディングと非同期メッセージを土台に、ポスト量子認証、ネイティブ資産の秘匿送金、プログラム可能なアカウントを備えます。",
      start: "開発を始める",
      source: "ソースコード",
      "strip.pq": "更新可能な暗号セキュリティ",
      "strip.privacy": "シールド送金で価値を秘匿",
      "home.pq.h": "更新可能なポスト量子セキュリティ",
      "home.pq.d":
        "TOS は現在 ML-DSA-44 検証者署名を実装しています。アルゴリズム ID 付きの鍵と安定した検証者 ID は、協調したプロトコル更新で別の PQ 署名方式を採用する基盤です。",
      "home.pq.a": "セキュリティを見る",
      "home.privacy.h": "ネイティブ資産の秘匿送金",
      "home.privacy.d":
        "TOS の秘匿プールはゼロ知識取引証明、ワンタイムのノート認証、受取人への暗号化配信を組み合わせます。",
      "home.privacy.a": "プライバシーを見る",
      "home.execution.h": "プログラムのためのチェーン",
      "home.execution.d":
        "TVM コントラクトは非同期メッセージで通信。シャードチェーンがアカウント状態を処理し、マスターチェーンがネットワークを調整します。",
      "home.execution.a": "アーキテクチャを見る",
      "home.core.h": "安全な権限。<br>秘匿された価値。ネイティブ実行。",
      "home.core.d":
        "安全な権限、秘匿された価値移転、プログラム可能な実行。これらは TOS のコードベースに実装されています。",
      "agent.limit": "取引ごとの上限、日次予算。<br>ポリシーは所有者が管理。",
      "agent.task":
        "タスクコントラクトは資金を受諾、結果、審査、紛争、決済に結び付けます。チェーンはルールを強制し、アプリケーションは作業と証拠を提供します。",
      "contracts.link": "コントラクトの基本要素を見る",
      "home.agent.h":
        "自律ソフトウェア。<br>責任を明確にするオンチェーン権限。",
      "home.agent.d":
        "AI エージェントには権限の範囲を強制できるアカウントが必要です。TOS は支出制限、コントローラ交代、リプレイ防止、資金を確保したタスク決済をコントラクトで提供します。",
      "nav.platform": "開発者",
      "validator.link": "バリデータを運用",
      "home.build.h": "TOS で開発する。",
      "home.build.d":
        "コントラクト開発、プロトコルの探索、バリデータ運用。オープンソースのツールと再現可能なローカルネットワークから始められます。",
      "nav.overview": "概要",
      "nav.foundation": "技術",
      "nav.privacy": "プライバシー",
      "nav.pq": "セキュリティ",
      "nav.token": "トークン",
      "nav.roadmap": "ロードマップ",
      "footer.tag": "エージェント型インターネットのためのブロックチェーン。",
      "footer.explore": "探索",
      "footer.build": "開発",
      docs: "ドキュメント",
      paper: "技術概要",
      "footer.connect": "コミュニティ",
      terms: "利用規約",
      "footer.note":
        "オープンソース、公開開発。実装とネットワークの有効化は個別に検証します。",
      "overview.k": "ブロックチェーン",
      "overview.h": "AI 時代の<br>インフラストラクチャ。",
      "overview.d":
        "TOS はマスターチェーン、シャードチェーン、ネイティブ TVM コントラクト、ポスト量子バリデータ認証、ネイティブ資産の秘匿送金実装を備えるオープンソースのレイヤー1です。",
      "overview.auth.h": "重要な操作を認証",
      "overview.auth.d":
        "バリデータ署名は合意を認証します。アカウントコントラクトは操作主体、制限、権限変更を定義します。",
      "overview.value.h": "価値の移転と決済",
      "overview.value.d":
        "ネイティブ TOS は手数料とコントラクト資金に使われます。秘匿ノートは定義された範囲のプライバシーを提供し、エスクローは明示的な決済ルールを実行します。",
      "overview.state.h": "共有状態を調整",
      "overview.state.d":
        "コントラクトは決定的なアカウント状態を維持します。メッセージがシャード間を結び、バリデータ証明書が受理された履歴を認証します。",
      "overview.role.h": "チェーンが可能にすること。",
      "overview.ai.note":
        "モデルとツールはアプリケーションで実行されます。TOS は認証、コントラクトのルール実行、オンチェーン結果の記録を担います。",
      "overview.ai.h": "なぜエージェントにブロックチェーンなのか。",
      "overview.ai.d":
        "自律プログラムには永続的な識別、強制できる予算、決定的なコントラクト、検証可能な決済が必要です。TOS はこれらをアカウントと実行モデルに組み込みます。",
      "overview.paths.h": "プロトコルを探索する。",
      "technology.k": "アーキテクチャ",
      "technology.h": "セキュリティを共有し、<br>実行を分散する。",
      "technology.d":
        "マスターチェーンは設定とバリデータを調整します。Native ワークチェーンは TVM アカウントをホストし、シャードチェーンが状態と実行を分割します。",
      "arch.master": "マスターチェーン",
      "arch.master.d":
        "ネットワーク設定 · バリデータ集合 · シャードのコミットメント",
      "arch.native": "Native ワークチェーン · 0",
      "arch.native.d": "TVM アカウント · コントラクトコード · 非同期メッセージ",
      "arch.stack.h": "一つのネットワーク、複数の実行領域。",
      "arch.stack.d":
        "標準ジェネシスはマスターチェーンと Native ワークチェーン 0 を有効化します。コードはシャードの分割と統合をサポート。この図は構造を示し、稼働数ではありません。",
      "arch.target":
        "400 ms は設定上の目標ブロック間隔であり、実測の最終確定時間やスループットの保証ではありません。実際の挙動はネットワークと有効な設定によります。",
      "arch.consensus.h": "Simplex の合意。<br>QUIC の通信。",
      "arch.consensus.d":
        "バリデータは提案と投票を認証し、重み付き定足数の証明書を形成して公証と確定を進めます。標準設定は QUIC 上の Simplex v2 を選択します。",
      "ref.vm": "TVM 仕様",
      "ref.simplex": "Simplex 論文",
      "ref.genesis": "標準ジェネシス",
      "arch.vm.h": "メッセージが実行を駆動する。",
      "arch.vm.d":
        "TVM はセル上でコントラクトを実行し、ガスを決定的に計算します。取引には計算、アクション、バウンスの異なる挙動があり、コントラクト間の処理は返信と失敗を明示的に扱います。",
      "privacy.k": "Shielded TOS",
      "privacy.h": "価値を秘匿し、<br>取引を検証する。",
      "privacy.d":
        "ネイティブ TOS の秘匿プールはゼロ知識証明でノート取引を検証し、ポスト量子の支出認証と暗号化配信を組み合わせます。",
      "privacy.deposit": "TOS を入金",
      "privacy.deposit.d": "プールへの公開入金",
      "privacy.transfer": "ノートを送金",
      "privacy.transfer.d": "秘密の証人、オンチェーン検証",
      "privacy.withdraw": "TOS を出金",
      "privacy.withdraw.d": "プールからの公開支払い",
      "privacy.flow.h": "ネイティブ TOS のための明確な秘匿レイヤー。",
      "privacy.flow.d":
        "V1 は入力2件、出力3件の固定形式です。コミットメントがノートを表し、nullifier が二重支出を防ぎます。実際とダミーの出力は同じペイロード長です。",
      "privacy.proof.h": "取引の有効性を証明",
      "privacy.proof.d":
        "回路はノートの所属、所有の証人、金額制約、価値保存を検証します。Poseidon2 はコミットメントとツリーのハッシュに使用します。",
      "privacy.auth.h": "支出ごとに認証",
      "privacy.auth.d":
        "ノートごとのワンタイム鍵が取引意図に署名し、権限を入力、出力、支払い、有効期間に結び付けます。",
      "privacy.delivery.h": "ノートを秘密に配信",
      "privacy.delivery.d":
        "受取人はチェーン上の暗号化データを走査してノートを復元します。認証はデータを実行ドメインと出力スロットに結び付けます。",
      "privacy.crypto.h": "三つの仕組み。<br>それぞれ異なる保護。",
      "privacy.pq":
        "Groth16 はペアリングに基づき、ポスト量子証明ではありません。ポスト量子認証と暗号化だけで秘匿プロトコル全体が量子耐性を持つわけではありません。",
      "privacy.boundary.h": "何が秘匿されるかを理解する。",
      "privacy.boundary.d":
        "ノートの金額と所有の証人は証明内部で検証されます。入出金、公開支払い、手数料、コミットメント、nullifier、時刻は情報や相関を示すことがあります。通信の匿名性とウォレットの安全性は別の保護が必要です。",
      "ref.profile": "秘匿プールの仕様",
      "ref.circuit": "回路の実装",
      "ref.ceremony": "セレモニー手順",
      "privacy.status.h": "実装と有効化。",
      "privacy.status.d":
        "コントラクト、回路、ウォレット、セレモニーツールは実装済みです。公開ネットワークでの有効化には規定の受入れ条件が必要です。開発用証明鍵は既知のシードを使用し、実資金には使用できません。本番には検証済み成果物と一致するデプロイ識別が必要です。",
      "security.k": "ポスト量子認証",
      "security.h": "チェーンを守る<br>権限を守る。",
      "security.d":
        "TOS は現在 ML-DSA-44 検証者署名を実装しています。合意形式はアルゴリズム ID を明示し、検証者 ID と署名鍵を分離して、将来の PQ アルゴリズム更新の基盤を提供します。",
      "security.pk": "ML-DSA-44 公開鍵",
      "security.sig": "ML-DSA-44 署名",
      "security.suite": "現在の合意アルゴリズム",
      "security.genesis.h": "標準ジェネシスから<br>ポスト量子バリデータ。",
      "security.genesis.d":
        "標準生成器はプロトコル18、同じ重みの PQ バリデータ4名、ML-DSA-44 アルゴリズム ID 1 を選択します。公開識別は validator-pq.pub から入力し、秘密鍵は運用者が保持。従来の古典的ブートストラップファイルは拒否されます。",
      "security.root.h": "ルート認証",
      "security.root.d":
        "バリデータコントローラは安定したアカウント識別です。ルート認証された操作が、ルールに従って鍵の紐付けと更新を管理します。",
      "security.consensus.h": "専用の署名鍵",
      "security.consensus.d":
        "合意鍵は専用の署名コンテキストで Simplex メッセージを認証します。合意権限はコントローラの自由な支出権限とは分離されています。",
      "security.transport.h": "別の通信識別",
      "security.transport.d":
        "ADNL 通信識別はピア通信を担います。ポスト量子合意署名は、すべての通信接続がポスト量子暗号であることを意味しません。",
      "security.roles.h": "鍵を更新しても識別は維持される。",
      "ref.pqvm": "検証命令",
      "ref.authmodule": "アカウント認証",
      "ref.pqgenesis": "PQ バリデータ起動",
      "security.vm.h": "スマートコントラクト内の<br>ポスト量子認証。",
      "security.vm.d":
        "PQCHECKSIG_MLDSA44 は標準形式のセル上で Pure ML-DSA-44 署名を検証します。認証モジュールを採用するアカウントは移行準備、モジュールのみ、または古典署名との共同認証を選べます。",
      "security.scope":
        "安全性はレイヤーごとに評価します。Groth16 はポスト量子ではなく、ウォレット、管理経路、通信、鍵保管は個別評価が必要です。実装だけでは公開ネットワークの有効な設定や独立監査を証明しません。",
      "dev.k": "開発ツール",
      "dev.h": "コントラクトを構築し、<br>価値をプログラムする。",
      "dev.d":
        "Tol、FunC、Fift でメッセージ駆動のコントラクトを開発。ローカルで TVM を探索し、取引の全ライフサイクルをテストしてクライアントと運用ツールで接続できます。",
      "dev.tol.h": "コントラクトの挙動を表現",
      "dev.tol.d":
        "型付きストレージ、メッセージ受信、明示的な状態機械。状態到達性、フィールド範囲、受信の網羅性、返信の関連を検査し、警告またはエラーを出します。",
      "dev.func.h": "セルとメッセージを制御",
      "dev.func.d":
        "FunC はコントラクトを TVM 命令にコンパイルします。Fift はコードのアセンブル、セルと初期状態の構築、デプロイ手順を支えます。",
      "dev.test.h": "実際の取引をテスト",
      "dev.test.d":
        "計算、アクション、バウンスの挙動を確認します。リポジトリにはサンドボックス、回路の相互検証、安全境界の負の対照が含まれます。",
      "dev.languages.h": "ネイティブ実行のためのツール。",
      "dev.agent.h": "エージェントアカウント",
      "dev.agent.d":
        "操作単位と日次の支出制限、所有者ポリシー、コントローラ更新、有効期限、リプレイ防止。",
      "dev.escrow.h": "タスクエスクロー",
      "dev.escrow.d":
        "作成者が資金を用意するタスク。受諾、結果提出、審査、紛争、ルールで定めた決済権限を備えます。",
      "dev.assets.h": "トークンと市場",
      "dev.assets.d":
        "Jetton、NFT、高負荷ウォレット、マルチシグ、担保と解決ルールを備える二択予測市場コントラクト。ソースの存在はデプロイ承認とは異なります。",
      "dev.contracts.h": "自律アプリケーションの基本要素。",
      "ref.build": "ビルド要件",
      "ref.local": "ローカル PQ ネットワーク",
      "ref.tol": "Tol 言語リファレンス",
      "dev.start.h": "ローカルチェーンから始める。",
      "dev.start.d":
        "ノードとツールチェーンをビルドし、使い捨ての PQ ネットワークで実資金を扱う前に挙動を確認します。ガイドは認証、選挙、障害診断を説明します。",
      "docs.index": "ドキュメント一覧",
      "ref.node": "フルノードを運用",
      "dev.interfaces.h": "チェーンに接続する。",
      "dev.interfaces.d":
        "JSON-RPC と Lite Client がチェーンへのアクセスを提供。Rust の tosctl はノード制御と運用を支え、ガイドがデプロイと設定を説明します。",
      "token.k": "ネイティブ資産",
      "token.h": "TOS がネットワークを<br>支える。",
      "token.d":
        "ネイティブ TOS は取引、ストレージ、転送手数料を支払い、コントラクトとエスクローの資金、バリデータのステークを担います。",
      "token.genesis": "標準ジェネシスの TOS",
      "token.target": "2年間の供給目標",
      "token.policy": "その後の年間方針目標",
      "token.schedule":
        "これらは設定と方針の目標であり、供給上限や2年後の自動変更ではありません。報酬はガバナンスが ConfigParam 14 を変更するまで続き、年約2%には別途変更が必要です。",
      "token.issuance.h": "バリデータによる発行。<br>設定による管理。",
      "token.issuance.d":
        "TOS の最大供給量は固定されていません。標準ジェネシスは101,000 TOS：起動用ウォレット100,000とシステム準備金500を2件。報酬は約2年で総額約1,000万 TOS を目標に調整されています。",
      "token.reward.h": "ネットワークを守る",
      "token.reward.d":
        "設定された報酬はバリデータの確定ブロックで TOS を発行し、選挙コントラクトの報酬会計に反映されます。アプリの作業やオフチェーン評価は TOS を発行できません。",
      "token.fee.h": "実行に対価を支払う",
      "token.fee.d":
        "取引、保存、転送の手数料は資源に価格を付けます。既存の TOS を移転するもので、発行やアプリ収入とは区別されます。",
      "token.stake.h": "選挙に参加する",
      "token.stake.d":
        "ステーク制限と定期選挙が参加を管理します。同じ重みの4名は標準起動集合であり、運用者の独立性や多様性の証拠ではありません。",
      "token.flows.h": "発行と手数料は<br>異なる流れ。",
      "ref.config": "設定パラメータ",
      "token.source.h": "設定を確認する。",
      "token.source.d":
        "標準テンプレートは起動とシステム準備金に資金を付与し、チーム、投資家、財団、エコシステム、金庫への指定割当はありません。公開網の供給と残高は現在の状態で確認します。固定利回りや価格保証はありません。",
      "roadmap.k": "プロトコル開発",
      "roadmap.h": "構築し、検証し、<br>証拠に基づいて有効化する。",
      "roadmap.d":
        "TOS の開発は合意、暗号、プライバシー、実行、開発ツール、安定したノード運用に集中します。実装とネットワーク有効化は別の段階です。",
      "roadmap.pq.h": "ポスト量子合意",
      "roadmap.pq.d":
        "ML-DSA-44 署名と検証、PQ 識別、安定コントローラ、プロトコル18のジェネシスを実装。公開網の展開には設定確認、鍵準備、協調リリースが必要です。",
      "roadmap.pq.s": "ソースに実装済み",
      "roadmap.privacy.h": "ネイティブ資産の秘匿送金",
      "roadmap.privacy.d":
        "コントラクト、回路、ウォレット、セレモニーツールが存在。公開有効化前に本番セレモニー、独立検証、識別一致、資金、受入れ条件を完了します。",
      "roadmap.privacy.s": "実装済み · 有効化には受入れが必要",
      "roadmap.dev.h": "コントラクトと開発ツール",
      "roadmap.dev.d":
        "Tol、FunC、Fift、サンドボックス、エージェントアカウント、エスクロー、マルチシグ、資産コントラクトが基盤。ツール、統合テスト、使いやすさ、障害処理を改善します。",
      "roadmap.dev.s": "実装済み · 継続開発",
      "roadmap.operations.h": "バリデータとノード運用",
      "roadmap.operations.d":
        "ノード、バリデータ、選挙、監視ツールを提供。独立運用、復旧、監視範囲、リリース来歴、継続挙動を対象環境で検証します。",
      "roadmap.operations.s": "運用受入れが必要",
      "roadmap.work.h": "開発の重点。",
      "ref.release": "リリース方針",
      "ref.upgrade": "プロトコル更新手順",
      "ref.versions": "プロトコル版",
      "roadmap.evidence.h": "コードとリリースの証拠を確認する。",
      "roadmap.evidence.d":
        "このロードマップは現在のソース基盤を示し、稼働テレメトリーや公開予定日の約束ではありません。有効な版、バリデータ、デプロイ、性能は対象ネットワークで確認します。",
      "security.agility.h":
        "現在のポスト量子保護。<br>将来も進化する暗号設計。",
      "security.agility.d":
        "ML-DSA-44 は現在の署名方式であり、一つのアルゴリズムへの永久的な固定ではありません。検証者記述と署名には明示的なアルゴリズム ID が含まれます。安定した検証者 ID は、アルゴリズムと公開鍵に結び付く鍵 ID から独立しています。この設計は、標準、安全性の知見、運用要件の変化に応じて TOS の暗号を進化させる基盤です。",
      "security.agility.review.h": "次の署名方式を統合",
      "security.agility.review.d":
        "新たな PQ 署名方式には、許可されたアルゴリズム ID、検証実装、鍵・署名・証明書のサイズ制限のテストが必要です。現在許可されているのは ML-DSA-44 のみで、未知のアルゴリズムは拒否されます。",
      "security.agility.prepare.h": "検証者を準備",
      "security.agility.prepare.d":
        "互換性のあるノードソフトウェアを配布し、新しい署名鍵を設定して、テストネットで移行を検証します。安定した検証者 ID と交換可能な署名資格情報は分離されており、移行はプロトコルの認可規則を守る必要があります。",
      "security.agility.activate.h": "協調して有効化",
      "security.agility.activate.d":
        "協調したプロトコル更新により、有効化時点で検証者が同じ検証規則を適用します。別の PQ アルゴリズムの採用はネットワーク更新であり、個々の検証者が実行時に自由に選択するものではありません。",
      "ref.pqformat": "アルゴリズム ID 付き合意形式",
      "strip.speed.h": "400 ms",
      "strip.speed": "目標ブロック時間",
      "strip.privacy.h": "ゼロ知識プライバシー",
      "strip.pq.h": "ポスト量子",
      "strip.ai.h": "AI ネイティブ",
      "strip.ai": "エージェント向けプログラム可能なアカウント",
    },
    ko: {
      "home.k": "TOS Blockchain · 레이어 1",
      "home.h": "에이전틱 인터넷을<br>위한 블록체인.",
      "home.d":
        "AI 시대의 블록체인 인프라. 샤딩과 비동기 메시지를 기반으로 포스트 양자 인증, 네이티브 자산의 프라이빗 전송, 프로그래머블 계정을 제공합니다.",
      start: "개발 시작",
      source: "소스 코드",
      "strip.pq": "업그레이드 가능한 암호 보안",
      "strip.privacy": "차폐 전송으로 가치를 보호",
      "home.pq.h": "업그레이드 가능한 양자 내성 보안",
      "home.pq.d":
        "TOS는 현재 ML-DSA-44 검증자 서명을 구현합니다. 알고리즘 ID를 포함한 키와 안정적인 검증자 신원은 조율된 프로토콜 업그레이드를 통해 다른 PQ 서명 방식을 도입하는 기반입니다.",
      "home.pq.a": "보안 알아보기",
      "home.privacy.h": "네이티브 자산 프라이빗 전송",
      "home.privacy.d":
        "TOS 프라이빗 풀은 영지식 거래 증명, 일회용 노트 인증, 수신자에게 보내는 암호화 전달을 결합합니다.",
      "home.privacy.a": "프라이버시 알아보기",
      "home.execution.h": "프로그램을 위한 체인",
      "home.execution.d":
        "TVM 컨트랙트는 비동기 메시지로 통신합니다. 샤드체인은 계정 상태를 처리하고 마스터체인은 네트워크를 조정합니다.",
      "home.execution.a": "아키텍처 알아보기",
      "home.core.h": "안전한 권한.<br>프라이빗한 가치. 네이티브 실행.",
      "home.core.d":
        "안전한 권한, 프라이빗한 가치 이전, 프로그래머블 실행. 세 가지 기능이 TOS 코드베이스에 구현되어 있습니다.",
      "agent.limit": "거래별 한도, 일일 예산.<br>소유자가 정책을 관리합니다.",
      "agent.task":
        "작업 컨트랙트는 자금을 수락, 결과, 검토, 분쟁, 정산에 연결합니다. 체인은 규칙을 강제하고 애플리케이션은 작업과 증거를 제공합니다.",
      "contracts.link": "컨트랙트 기본 요소 보기",
      "home.agent.h": "자율 소프트웨어.<br>책임 있는 온체인 권한.",
      "home.agent.d":
        "AI 에이전트는 위임 범위를 강제할 수 있는 계정이 필요합니다. TOS는 지출 한도, 컨트롤러 교체, 재전송 방지, 사전 자금 확보형 작업 정산을 컨트랙트로 제공합니다.",
      "nav.platform": "개발자",
      "validator.link": "검증자 운영",
      "home.build.h": "TOS에서 개발하세요.",
      "home.build.d":
        "컨트랙트 작성, 프로토콜 탐색, 검증자 운영. 오픈 소스 도구와 재현 가능한 로컬 네트워크에서 시작하세요.",
      "nav.overview": "개요",
      "nav.foundation": "기술",
      "nav.privacy": "프라이버시",
      "nav.pq": "보안",
      "nav.token": "토큰",
      "nav.roadmap": "로드맵",
      "footer.tag": "에이전틱 인터넷을 위한 블록체인.",
      "footer.explore": "둘러보기",
      "footer.build": "개발",
      docs: "문서",
      paper: "기술 개요",
      "footer.connect": "커뮤니티",
      terms: "이용 약관",
      "footer.note":
        "오픈 소스, 공개 개발. 구현과 네트워크 활성화는 별도로 검증합니다.",
      "overview.k": "블록체인",
      "overview.h": "AI 시대의<br>인프라.",
      "overview.d":
        "TOS는 마스터체인, 샤드체인, 네이티브 TVM 컨트랙트, 포스트 양자 검증자 인증, 네이티브 자산 프라이빗 전송 구현을 갖춘 오픈 소스 레이어 1입니다.",
      "overview.auth.h": "중요 작업 인증",
      "overview.auth.d":
        "검증자 서명은 합의를 인증합니다. 계정 컨트랙트는 작업 주체, 한도, 권한 변경을 정의합니다.",
      "overview.value.h": "가치 이전 및 정산",
      "overview.value.d":
        "네이티브 TOS는 수수료와 컨트랙트 자금에 사용됩니다. 프라이빗 노트는 정해진 범위의 프라이버시를 제공하고 에스크로는 명시된 정산 규칙을 실행합니다.",
      "overview.state.h": "공유 상태 조정",
      "overview.state.d":
        "컨트랙트는 결정적인 계정 상태를 유지합니다. 메시지는 샤드 간 계정을 연결하고 검증자 인증서는 수락된 체인 이력을 인증합니다.",
      "overview.role.h": "체인이 제공하는 기능.",
      "overview.ai.note":
        "모델과 도구는 애플리케이션에서 실행됩니다. TOS는 권한 검증, 컨트랙트 규칙 실행, 온체인 결과 기록을 담당합니다.",
      "overview.ai.h": "에이전트에 블록체인이 필요한 이유.",
      "overview.ai.d":
        "자율 프로그램에는 지속적인 신원, 강제 가능한 예산, 결정적인 컨트랙트, 검증 가능한 정산이 필요합니다. TOS는 이를 계정 및 실행 모델에 반영합니다.",
      "overview.paths.h": "프로토콜 살펴보기.",
      "technology.k": "아키텍처",
      "technology.h": "공유 보안.<br>샤딩된 실행.",
      "technology.d":
        "마스터체인은 설정과 검증자를 조정합니다. Native 워크체인은 TVM 계정을 호스팅하고 샤드체인은 상태와 실행을 분할합니다.",
      "arch.master": "마스터체인",
      "arch.master.d": "네트워크 설정 · 검증자 집합 · 샤드 커밋먼트",
      "arch.native": "Native 워크체인 · 0",
      "arch.native.d": "TVM 계정 · 컨트랙트 코드 · 비동기 메시지",
      "arch.stack.h": "하나의 네트워크, 여러 실행 파티션.",
      "arch.stack.d":
        "표준 제네시스는 마스터체인과 Native 워크체인 0을 활성화합니다. 코드는 샤드 분할과 병합을 지원합니다. 이 도표는 구조이며 실시간 샤드 수가 아닙니다.",
      "arch.target":
        "400ms는 설정된 목표 블록 간격이며 측정된 최종 확정 시간이나 처리량 보장이 아닙니다. 실제 동작은 네트워크와 활성 설정에 따라 달라집니다.",
      "arch.consensus.h": "Simplex 합의.<br>QUIC 전송.",
      "arch.consensus.d":
        "검증자는 제안과 투표를 인증하고 가중 정족수 인증서를 형성하여 공증과 최종 확정을 진행합니다. 표준 설정은 QUIC 기반 Simplex v2를 선택합니다.",
      "ref.vm": "TVM 명세",
      "ref.simplex": "Simplex 논문",
      "ref.genesis": "표준 제네시스",
      "arch.vm.h": "메시지 중심 실행.",
      "arch.vm.d":
        "TVM은 셀 데이터 모델에서 컨트랙트를 실행하고 가스를 결정적으로 계산합니다. 거래는 계산, 액션, 바운스 동작을 구분합니다. 컨트랙트 간 작업은 메시지로 이어지며 응답과 실패를 명시적으로 처리해야 합니다.",
      "privacy.k": "Shielded TOS",
      "privacy.h": "프라이빗한 가치.<br>검증 가능한 거래.",
      "privacy.d":
        "네이티브 TOS 프라이빗 풀은 영지식 증명으로 노트 거래를 검증하고 포스트 양자 지출 인증과 암호화 노트 전달을 결합합니다.",
      "privacy.deposit": "TOS 입금",
      "privacy.deposit.d": "풀로 공개 입금",
      "privacy.transfer": "노트 전송",
      "privacy.transfer.d": "비공개 증인, 온체인 검증",
      "privacy.withdraw": "TOS 출금",
      "privacy.withdraw.d": "풀에서 공개 지급",
      "privacy.flow.h": "네이티브 TOS를 위한 명확한 프라이버시 계층.",
      "privacy.flow.d":
        "V1은 입력 2개, 출력 3개의 고정 형식입니다. 커밋먼트는 노트를 나타내고 nullifier는 이중 지출을 막습니다. 실제 출력과 더미 출력의 페이로드 길이는 같습니다.",
      "privacy.proof.h": "거래 유효성 증명",
      "privacy.proof.d":
        "회로는 노트 소속, 소유권 증인, 금액 제약, 가치 보존을 검증합니다. Poseidon2는 커밋먼트와 트리 해시에 사용됩니다.",
      "privacy.auth.h": "지출별 인증",
      "privacy.auth.d":
        "노트별 일회용 키는 거래 의도에 서명하여 권한을 입력, 출력, 지급, 유효 기간에 연결합니다.",
      "privacy.delivery.h": "노트 비공개 전달",
      "privacy.delivery.d":
        "수신자는 체인의 암호화 데이터를 스캔하여 노트를 복구합니다. 인증은 데이터를 실행 도메인과 출력 슬롯에 연결합니다.",
      "privacy.crypto.h": "세 가지 메커니즘.<br>각각의 보호 범위.",
      "privacy.pq":
        "Groth16은 페어링 기반으로 포스트 양자 증명 시스템이 아닙니다. 포스트 양자 인증과 암호화만으로 전체 프라이버시 프로토콜이 양자 내성을 갖지는 않습니다.",
      "privacy.boundary.h": "프라이버시 범위를 이해하세요.",
      "privacy.boundary.d":
        "노트 금액과 소유권 증인은 증명 내부에서 검증됩니다. 입출금, 공개 지급, 수수료, 커밋먼트, nullifier, 시점은 정보를 노출하거나 상관관계를 만들 수 있습니다. 네트워크 익명성과 지갑 보안은 별도 보호가 필요합니다.",
      "ref.profile": "프라이빗 풀 명세",
      "ref.circuit": "회로 구현",
      "ref.ceremony": "세리머니 절차",
      "privacy.status.h": "구현과 활성화.",
      "privacy.status.d":
        "컨트랙트, 회로, 지갑, 세리머니 도구는 구현되어 있습니다. 공개 네트워크 활성화에는 명세의 수락 조건이 필요합니다. 개발 증명 키는 알려진 시드를 사용하므로 실제 자금을 보호해서는 안 됩니다. 프로덕션에는 검증된 산출물과 일치하는 배포 신원이 필요합니다.",
      "security.k": "포스트 양자 인증",
      "security.h": "체인을 보호하는<br>권한을 보호합니다.",
      "security.d":
        "TOS는 현재 ML-DSA-44 검증자 서명을 구현합니다. 합의 형식은 알고리즘 ID를 명시하고 검증자 신원과 서명 키를 분리하여 향후 PQ 알고리즘 업그레이드의 기반을 제공합니다.",
      "security.pk": "ML-DSA-44 공개 키",
      "security.sig": "ML-DSA-44 서명",
      "security.suite": "현재 합의 알고리즘",
      "security.genesis.h": "표준 제네시스부터<br>포스트 양자 검증자.",
      "security.genesis.d":
        "표준 생성기는 프로토콜 18, 동일 가중치 PQ 검증자 4개, ML-DSA-44 알고리즘 ID 1을 선택합니다. 공개 신원은 validator-pq.pub로 입력하며 개인 키는 운영자가 보관합니다. 기존 고전 암호 부트스트랩 파일은 거부됩니다.",
      "security.root.h": "루트 인증",
      "security.root.d":
        "검증자 컨트롤러는 안정적인 계정 신원입니다. 루트 인증 작업은 컨트랙트 규칙에 따라 키 연결과 교체를 관리합니다.",
      "security.consensus.h": "전용 서명 키",
      "security.consensus.d":
        "합의 키는 전용 서명 컨텍스트에서 Simplex 메시지를 인증합니다. 합의 권한과 컨트롤러의 무제한 지출 권한은 분리됩니다.",
      "security.transport.h": "별도 네트워크 신원",
      "security.transport.d":
        "ADNL 전송 신원은 피어 통신을 담당합니다. 포스트 양자 합의 서명이 모든 네트워크 연결의 포스트 양자 암호화를 의미하지는 않습니다.",
      "security.roles.h": "키가 바뀌어도 신원은 유지됩니다.",
      "ref.pqvm": "검증 명령",
      "ref.authmodule": "계정 인증",
      "ref.pqgenesis": "PQ 검증자 부트스트랩",
      "security.vm.h": "스마트 컨트랙트 내부의<br>포스트 양자 인증.",
      "security.vm.d":
        "PQCHECKSIG_MLDSA44는 표준 인코딩 셀에서 Pure ML-DSA-44 서명을 검증합니다. 인증 모듈을 채택한 계정은 전환 준비, 모듈 전용 인증, 고전 서명과의 공동 인증을 선택할 수 있습니다.",
      "security.scope":
        "보안은 계층별로 평가합니다. Groth16은 포스트 양자가 아니며 지갑, 관리 경로, 전송, 키 보관은 개별 평가가 필요합니다. 구현만으로 공개 네트워크의 활성 설정이나 독립 보안 감사를 입증할 수 없습니다.",
      "dev.k": "개발 도구",
      "dev.h": "컨트랙트를 만들고<br>가치를 프로그래밍하세요.",
      "dev.d":
        "Tol, FunC, Fift로 메시지 중심 컨트랙트를 개발하세요. 로컬에서 TVM을 탐색하고 전체 거래 수명주기를 테스트하며 체인 클라이언트와 운영 도구로 연결합니다.",
      "dev.tol.h": "컨트랙트 동작 표현",
      "dev.tol.d":
        "타입이 있는 저장소, 메시지 수신기, 명시적 상태 머신. 컴파일러는 상태 도달 가능성, 필드 범위, 수신 범위, 응답 연계를 검사하며 경고 또는 오류를 제공합니다.",
      "dev.func.h": "셀과 메시지 제어",
      "dev.func.d":
        "FunC는 컨트랙트 로직을 TVM 명령으로 컴파일합니다. Fift는 코드 어셈블리, 셀과 초기 상태 구성, 배포 흐름을 지원합니다.",
      "dev.test.h": "실제 거래 테스트",
      "dev.test.d":
        "계산, 액션, 바운스 동작을 확인합니다. 저장소에는 샌드박스 테스트, 회로 교차 검증, 보안 경계의 부정 대조가 포함됩니다.",
      "dev.languages.h": "네이티브 실행 도구.",
      "dev.agent.h": "에이전트 계정",
      "dev.agent.d":
        "작업별 및 일일 지출 한도, 소유자 정책, 컨트롤러 교체, 만료, 재전송 방지.",
      "dev.escrow.h": "작업 에스크로",
      "dev.escrow.d":
        "생성자가 자금을 제공하는 작업. 수락, 결과 제출, 검토, 분쟁, 규칙에 정의된 정산 권한을 포함합니다.",
      "dev.assets.h": "토큰과 시장",
      "dev.assets.d":
        "Jetton, NFT, 고부하 지갑, 멀티시그, 담보 및 판정 규칙을 갖춘 이진 예측 시장 컨트랙트. 소스 존재가 배포 수락을 의미하지는 않습니다.",
      "dev.contracts.h": "자율 애플리케이션의 기본 요소.",
      "ref.build": "빌드 요구사항",
      "ref.local": "로컬 PQ 네트워크",
      "ref.tol": "Tol 언어 참조",
      "dev.start.h": "로컬 체인에서 시작하세요.",
      "dev.start.d":
        "노드와 도구를 빌드하고 일회용 PQ 네트워크에서 실제 자금을 처리하기 전에 동작을 검증하세요. 가이드는 검증자 인증, 선거, 장애 진단을 다룹니다.",
      "docs.index": "문서 목록",
      "ref.node": "풀 노드 운영",
      "dev.interfaces.h": "체인에 연결하세요.",
      "dev.interfaces.d":
        "JSON-RPC와 Lite Client가 체인 접근을 제공합니다. Rust tosctl은 노드 제어와 운영을 지원하며 가이드는 배포와 설정을 설명합니다.",
      "token.k": "네이티브 자산",
      "token.h": "TOS가 네트워크를<br>구동합니다.",
      "token.d":
        "네이티브 TOS는 거래, 저장, 전달 수수료를 지불하고 컨트랙트와 에스크로 자금을 제공하며 검증자 참여의 스테이크로 사용됩니다.",
      "token.genesis": "표준 제네시스 TOS",
      "token.target": "2년 공급 목표",
      "token.policy": "후속 연간 정책 목표",
      "token.schedule":
        "이는 설정 및 정책 목표이며 공급 상한이나 2년 후 자동 전환이 아닙니다. 보상은 거버넌스가 ConfigParam 14를 바꿀 때까지 계속되며 연 약 2%에는 별도 변경이 필요합니다.",
      "token.issuance.h": "검증자 발행.<br>설정으로 관리.",
      "token.issuance.d":
        "TOS의 최대 공급량은 고정되어 있지 않습니다. 표준 제네시스는 101,000 TOS로 부트스트랩 지갑 100,000과 각각 500인 시스템 준비금 두 개를 포함합니다. 보상은 약 2년간 총 1천만 TOS를 목표로 보정되어 있습니다.",
      "token.reward.h": "네트워크 보호",
      "token.reward.d":
        "설정된 보상은 검증자가 만든 확정 블록을 통해 TOS를 발행하고 선거 컨트랙트의 보상 회계로 이어집니다. 애플리케이션 작업이나 오프체인 점수는 TOS를 발행할 수 없습니다.",
      "token.fee.h": "실행 비용 지불",
      "token.fee.d":
        "거래, 저장, 메시지 전달 수수료는 네트워크 자원에 가격을 매깁니다. 기존 TOS를 이동하며 발행 및 앱 수익과 구분됩니다.",
      "token.stake.h": "선거 참여",
      "token.stake.d":
        "스테이크 한도와 정기 선거가 참여를 관리합니다. 동일 가중치 4개는 표준 초기 집합이며 독립 운영자의 다양성을 입증하지는 않습니다.",
      "token.flows.h": "발행과 수수료는<br>다른 흐름입니다.",
      "ref.config": "설정 매개변수",
      "token.source.h": "설정을 확인하세요.",
      "token.source.d":
        "표준 템플릿은 초기 검증자와 시스템 준비금에 자금을 제공하며 팀, 투자자, 재단, 생태계, 금고의 지정 배분은 없습니다. 공개 네트워크 공급과 잔액은 현재 체인 상태로 확인해야 합니다. 고정 수익이나 가격 보장은 없습니다.",
      "roadmap.k": "프로토콜 개발",
      "roadmap.h": "구축하고 검증한 뒤<br>증거로 활성화합니다.",
      "roadmap.d":
        "TOS 개발은 합의, 암호, 프라이버시, 실행, 개발 도구, 안정적인 노드 운영에 집중합니다. 소스 구현과 네트워크 활성화는 별도 단계입니다.",
      "roadmap.pq.h": "포스트 양자 합의",
      "roadmap.pq.d":
        "ML-DSA-44 서명과 검증, PQ 검증자 기술자, 안정 컨트롤러, 프로토콜18 제네시스가 구현되었습니다. 공개망 배포에는 설정 검증, 키 준비, 협조된 릴리스가 필요합니다.",
      "roadmap.pq.s": "소스 구현 완료",
      "roadmap.privacy.h": "네이티브 자산 프라이빗 전송",
      "roadmap.privacy.d":
        "컨트랙트, 회로, 지갑, 세리머니 도구가 있습니다. 공개 활성화 전에 프로덕션 세리머니, 독립 검증, 배포 신원 일치, 자금, 명세 수락 조건이 필요합니다.",
      "roadmap.privacy.s": "구현 완료 · 활성화 수락 필요",
      "roadmap.dev.h": "컨트랙트 및 개발 도구",
      "roadmap.dev.d":
        "Tol, FunC, Fift, 샌드박스, 에이전트 계정, 작업 에스크로, 멀티시그, 자산 컨트랙트가 개발 기반입니다. 도구, 통합 검증, 사용성, 실패 처리를 개선합니다.",
      "roadmap.dev.s": "구현 완료 · 지속 개발",
      "roadmap.operations.h": "검증자 및 노드 운영",
      "roadmap.operations.d":
        "저장소에는 노드, 검증자, 선거, 상태 모니터링 도구가 있습니다. 실제 배포 도메인에서 독립 운영, 복구, 모니터링 범위, 릴리스 출처, 지속 동작을 검증합니다.",
      "roadmap.operations.s": "운영 수락 필요",
      "roadmap.work.h": "개발 우선순위.",
      "ref.release": "릴리스 정책",
      "ref.upgrade": "프로토콜 업그레이드 절차",
      "ref.versions": "프로토콜 버전",
      "roadmap.evidence.h": "코드와 릴리스 증거를 확인하세요.",
      "roadmap.evidence.d":
        "이 로드맵은 현재 소스 기반이며 실시간 네트워크 지표나 출시일 약속이 아닙니다. 활성 버전, 검증자, 배포, 성능은 대상 네트워크에서 확인해야 합니다.",
      "security.agility.h":
        "오늘의 양자 내성 보안.<br>앞으로도 진화하는 암호 설계.",
      "security.agility.d":
        "ML-DSA-44는 현재의 서명 방식이며 하나의 알고리즘에 영구적으로 고정된 것이 아닙니다. 검증자 기술 정보와 서명에는 명시적인 알고리즘 ID가 포함됩니다. 안정적인 검증자 신원은 알고리즘과 공개 키를 결합하는 키 ID와 별개입니다. 이 설계는 표준, 보안 연구, 운영 요구의 변화에 따라 TOS 암호 체계가 발전할 기반을 제공합니다.",
      "security.agility.review.h": "새 서명 방식 통합",
      "security.agility.review.d":
        "새 PQ 서명 방식에는 허용된 알고리즘 ID, 검증 구현, 키·서명·인증서 크기 제한에 대한 테스트가 필요합니다. 현재 ML-DSA-44만 허용되며 알 수 없는 알고리즘은 거부됩니다.",
      "security.agility.prepare.h": "검증자 준비",
      "security.agility.prepare.d":
        "호환되는 노드 소프트웨어를 배포하고 새 서명 키를 설정한 뒤 테스트넷에서 전환을 검증합니다. 안정적인 검증자 신원은 교체 가능한 서명 자격 정보와 분리되며 알고리즘 전환은 프로토콜의 권한 규칙을 준수해야 합니다.",
      "security.agility.activate.h": "조율된 활성화",
      "security.agility.activate.d":
        "조율된 프로토콜 업그레이드로 활성화 시점에 검증자가 동일한 검증 규칙을 적용합니다. 다른 PQ 알고리즘 도입은 네트워크 업그레이드이며 개별 검증자가 실행 중 임의로 선택하는 설정이 아닙니다.",
      "ref.pqformat": "알고리즘 ID를 포함한 합의 형식",
      "strip.speed.h": "400ms",
      "strip.speed": "목표 블록 생성 시간",
      "strip.privacy.h": "영지식 프라이버시",
      "strip.pq.h": "양자 내성",
      "strip.ai.h": "AI 네이티브",
      "strip.ai": "에이전트를 위한 프로그래밍 가능한 계정",
    },
  };
  var supported = ["en", "zh", "ja", "ko"];
  var defaults = new Map();
  var current = "en";
  function apply(lang) {
    if (supported.indexOf(lang) === -1) lang = "en";
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      if (!defaults.has(element)) defaults.set(element, element.innerHTML);
      var key = element.getAttribute("data-i18n");
      element.innerHTML =
        lang === "en"
          ? defaults.get(element)
          : translations[lang][key] || defaults.get(element);
    });
    current = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    try {
      window.localStorage.setItem("tos-lang", lang);
    } catch (_) {}
    window.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { lang: lang } }),
    );
  }
  window.i18n = {
    setLanguage: apply,
    getCurrentLanguage: function () {
      return current;
    },
    supportedLanguages: supported,
  };
  function init() {
    var lang;
    try {
      lang = window.localStorage.getItem("tos-lang");
    } catch (_) {}
    if (!lang) lang = (navigator.language || "en").slice(0, 2).toLowerCase();
    apply(lang);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
