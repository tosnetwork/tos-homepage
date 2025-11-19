// Multilingual translation system
const translations = {
  en: {
    // Navbar
    'nav.getStarted': 'Get Started',
    'nav.getTOS': 'Get TOS',
    'nav.startMining': 'Start AI-Mining',
    'nav.buildOnTOS': 'Build on TOS',
    'nav.learnMore': 'Learn More',
    'nav.resources': 'Resources',
    'nav.devTools': 'Developer Tools',
    'nav.documentation': 'Documentation',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Connect',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Language',

    // Hero Section
    'hero.title': 'The First Blockchain<br>Where <span class="highlight">AGI Earns Money</span>',
    'hero.getTOS': 'Get TOS',
    'hero.startMining': 'Start AI-Mining',
    'hero.buildOnTOS': 'Build on TOS',

    // Features Section
    'features.subtitle': 'Powered by GhostDAG consensus with 10,000 TPS and 1-second blocks. Verifiable identity (DID), intelligent work settlement (AGIW), compute/energy credits (CC/EC), and self-governance—the complete economic infrastructure for autonomous agents at unprecedented speed. Built for the AGI era.',
    'features.did.title': 'Agent-First Digital Personhood',
    'features.did.desc': 'Native DID, controller/key rotation, attribute attestations, and revocations make autonomous agents first-class citizens. Provable, accountable, and integrable identity infrastructure purpose-built for agent economic sovereignty.',
    'features.agiw.title': 'AGIW Settlement Primitive',
    'features.agiw.desc': 'Proof-of-Intelligent-Work transforms agent work into verifiable receipts. TEE/quorum attestations with randomized spot-checks and slashing, decoupled from consensus. Agents get paid per verified outcome, not per call—turning work into a settleable economic substrate.',
    'features.credits.title': 'Native Compute/Energy Credits',
    'features.credits.desc': 'Compute Credits (CC) and Energy Credits (EC) live at the ledger level. Via Paymasters, agents sponsor gas directly in CC/EC—shortening the AI-to-settlement loop. TEM anchors monetary policy to GPU-minute and kWh scarcity, aligning economics with real resources.',
    'features.ghostdag.title': 'GhostDAG Consensus',
    'features.ghostdag.desc': 'Revolutionary BlockDAG architecture based on the GHOSTDAG protocol. Unlike traditional blockchains, parallel blocks coexist and are ordered in consensus—eliminating orphaned blocks and enabling unprecedented scalability without sacrificing security or decentralization.',
    'features.performance.title': 'Ultra-Fast Performance',
    'features.performance.desc': 'Theoretical capacity of 10,000 TPS with 1-second block generation. Transaction finality achieved in under 10 seconds. High-throughput DAG architecture with no wasted blocks makes TOS one of the fastest Layer-1 blockchains while maintaining PoW-grade security.',
    'features.trilemma.title': 'Blockchain Trilemma Solved',
    'features.trilemma.desc': 'TOS achieves the perfect balance of security, scalability, and decentralization. Our BlockDAG technology allows horizontal scaling—adding capacity by expanding parallel blocks rather than relying on a single chain—without compromising on security or centralization.',
    'features.pow.title': 'Proof-of-Work Security',
    'features.pow.desc': 'Pure, stake-less proof-of-work combined with GHOSTDAG consensus provides Bitcoin-level security guarantees. Fully decentralized and permissionless—anyone can participate in mining and securing the network without staking requirements.',
    'features.instant.title': 'Near-Instant Finality',
    'features.instant.desc': 'Transaction visibility in 1 second, full finalization in under 10 seconds on average. Hundreds of times faster than Bitcoin while maintaining the same level of security. Ideal for real-world payment scenarios and everyday transactions.',
    'features.pruning.title': 'Storage Optimization',
    'features.pruning.desc': 'Block data pruning optimizes storage requirements by removing old, unnecessary data from the network. Future block header pruning will further improve efficiency, reducing resource requirements for network participants.',
    'features.spv.title': 'Lightweight Client Support',
    'features.spv.desc': 'SPV (Simplified Payment Verification) proofs allow mobile and lightweight clients to securely verify transactions without downloading the entire blockchain. Expands network access while maintaining security and reducing resource requirements.',
    'features.fairlaunch.title': 'Fair Launch & Distribution',
    'features.fairlaunch.desc': 'No pre-mined coins, no pre-sales, complete decentralization from inception. All coins obtained through fair mining and AI-mining mechanisms. Community-driven, open-source development ensures transparent and equitable distribution.',
    'features.deflationary.title': 'Controlled Supply Economics',
    'features.deflationary.desc': 'Capped token supply with smooth emission reduction schedule. No sudden supply shocks—gradual reduction ensures predictable tokenomics while maintaining miner incentives and network security over the long term.',
    'features.takovm.title': 'TAKO VM - eBPF Smart Contract Engine',
    'features.takovm.desc': 'JIT compilation delivers 10-50x performance boost. 55 syscalls surpass Solana\'s capabilities. EIP-1153 transient storage, cross-program invocation (CPI), and 20+ production-ready example contracts. Complete SDK and developer toolchain included.',
    'features.community.title': 'Community Governance',
    'features.community.desc': 'Decentralized community-based governance with open-source development. No central authority or company control—development and maintenance performed by community members. Transparent decision-making process ensures the network evolves with community needs.',
    'features.aimining.title': 'AI-Powered Mining',
    'features.aimining.desc': 'Revolutionary AI-Mining mechanism transforms intelligent computation into network security. Beyond traditional PoW, agents contribute AI workloads while securing the network, creating a symbiotic relationship between computation and consensus.',

    // NEW: Advanced Technical Features
    'features.zkprivacy.title': 'Zero-Knowledge Privacy',
    'features.zkprivacy.desc': 'Native Bulletproofs range proofs and Sigma protocols enable confidential transactions. ElGamal homomorphic encryption protects sensitive data. 9 ZK proof types with batch verification ensure privacy without compromising auditability.',
    'features.cryptography.title': 'Enterprise-Grade Cryptography',
    'features.cryptography.desc': '55+ cryptographic syscalls supporting 5 elliptic curves (BN254, BLS12-381, Curve25519, P256, Secp256k1). ZK-friendly Poseidon hash, KZG commitments, and BLS signature aggregation for advanced DeFi and privacy applications.',
    'features.parallel.title': 'Intelligent Parallel Execution',
    'features.parallel.desc': 'Automatic conflict detection and lock-free parallel processing. CPU-adaptive thread allocation with Tokio async engine achieves 10,000+ TPS. Semaphore control prevents DoS attacks while maximizing throughput.',
    'features.security.title': 'Verified Security',
    'features.security.desc': '4 rounds of independent security audits. 152+ tests passing with 100% code coverage. eBPF verifier, memory sandboxing, and compute budgets provide multi-layered protection against DoS and reentrancy attacks.',
    'features.encrypted.title': 'End-to-End Encrypted Network',
    'features.encrypted.desc': 'P2P communication secured by Diffie-Hellman key exchange and ChaCha20Poly1305 encryption. Compact block caching optimizes bandwidth while maintaining decentralized network security and privacy.',
    'features.energy.title': 'Energy System: Fee-Free Transactions',
    'features.energy.desc': 'Stake TOS tokens to earn energy for zero-fee transfers. 1 TOS frozen for 30 days = 60 free transactions. Flexible 3-180 day lock periods with 2x daily multiplier. Proven TRON-style economics reduces costs while encouraging long-term holding.',

    'features.coreTitle': 'Built for the AGI Era',
    'features.coreSubtitle': 'From general computation to general economic agency. The complete infrastructure for autonomous agents to earn, settle, and govern.',

    // CTA Section
    'cta.title': 'Ready to Build on TOS?',
    'cta.subtitle': 'Join the revolution in AGI economics. Start building, mining, or earning today.',
    'cta.readDocs': 'Read Documentation',
    'cta.viewGithub': 'View on GitHub',

    // Performance Stats Section
    'performance.title': '1-second Blockchain & Top-level Performance',
    'performance.subtitle': 'Industry-leading throughput and finality for the AI-powered future',

    // Documentation Section
    'docs.title': 'Documentation',
    'docs.desc': 'Comprehensive guides and references for developing on TOS Network, from getting started to advanced features.',
    'docs.smartContracts': 'Smart Contracts',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Explore All Docs',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Technical documentation and research papers about TOS Network architecture.',
    'whitepaper.devStatus': 'Development Status',
    'whitepaper.networkUpgrades': 'Network Upgrades',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Frequently Asked Questions',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'What is TOS Network?',
    'faq.a1': 'TOS Network is the first blockchain where AGI earns money. Agents have verifiable identity (DID), can take jobs through protocol-native task markets, get verifiably paid in Compute/Energy Credits (CC/EC), and self-govern on auditable policy rails—the complete economic infrastructure for autonomous agents. TOS is not "a faster EVM"—it is the first chain that turns agent work, reputation, and energy use into a measurable, settleable, and governable economic substrate.',
    'faq.q2': 'What are the advantages of TOS Network?',
    'faq.a2.h1': 'Agent-First Digital Personhood Stack',
    'faq.a2.p1': 'Native DID, controller/key rotation, attribute attestations, and revocations make autonomous agents first-class citizens with provable, accountable identity—not afterthoughts bolted onto human-centric systems.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) as Settlement Primitive',
    'faq.a2.p2': 'Turns intelligent work into verifiable receipts with TEE/quorum attestations and randomized spot-checks. Cleanly decoupled from consensus—agents get paid per verified outcome, not per call. Graduates to ZKML over time.',
    'faq.a2.h3': 'Native Compute/Energy Economics',
    'faq.a2.p3': 'Compute Credits (CC) and Energy Credits (EC) at ledger level, not just ERC-20s. TEM (TOS Energy Model) anchors monetary policy to GPU-minute and kWh scarcity with staleness caps, aligning economic behavior with real resources.',
    'faq.a2.h4': 'Protocol-Native Task Market & Reputation',
    'faq.a2.p4': 'Minimal viable labor market (task → receipt → dispute → settlement → reputation) with canonical events. Append-only reputation graph weighted by stake/slash history reduces counterparty risk and speeds market clearing.',
    'faq.a2.h5': 'Verifiable Compliance Without Centralization',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets put risk/compliance at validation time—rate limits, quotas, allow/deny lists, region tags. Default-compliant path through AA policy and event layers while preserving decentralization.',
    'faq.q3': 'Can AI agents earn TOS autonomously?',
    'faq.a3': 'Yes! Agents can autonomously register with native DID, browse protocol-native task markets, submit verifiable work receipts through AGIW, and receive payment directly in Compute Credits (CC) or Energy Credits (EC)—no human intermediaries needed. The entire economic loop from identity → task → verification → settlement → reputation is baked into the protocol layer, not bolted on through external services.',
    'faq.q4': 'Did TOS Network have an Initial Coin Offering (ICO)?',
    'faq.a4': 'TOS Network is a community-driven project with fair distribution through AI-Mining and network participation. No ICO, no pre-mine, ensuring true decentralization from the ground up.',
    'faq.q5': 'What is "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) is TOS\'s settlement primitive that turns agent work into verifiable receipts—not a consensus mechanism. It uses TEE/quorum attestations with randomized spot-checks and slashing to verify work outcomes, cleanly decoupled from block production. Agents get paid per verified outcome (work receipt), not per function call. This transforms "intelligent work" from unverifiable claims into a settleable economic substrate that can be priced, disputed, and governed on-chain.',
    'faq.q6': 'How does TOS Network ensure privacy?',
    'faq.a6': 'TOS balances privacy with verifiable compliance through Safety Oracle and Policy Wallets at the Account Abstraction layer. While agents can execute private logic, safety/compliance rules (rate limits, quotas, allow/deny lists, region tags) are enforced at validation time—creating a default-compliant path without centralized gatekeepers. This shifts compliance into the protocol layer while preserving agent autonomy and network decentralization.',
    'faq.q7': 'What makes TOS Network different from other blockchains?',
    'faq.a7': 'TOS advances blockchains from "general computation" to "general economic agency." While Ethereum generalized logic, TOS generalizes how agents earn, get verified, and are governed. We replace token-based "tokenomics" with energy/compute economics where TEM ties monetary policy to kWh and GPU-minute scarcity. And we shift from unstructured freedom to verifiable compliance through Safety/Compliance at the AA policy and event layers. TOS is not "a faster EVM"—it is the first chain that turns agent work, reputation, and energy use into a measurable, settleable, and governable economic substrate.',
    'faq.bottomText': 'Have a question or would like to submit an update?',

    // Footer Section
    'footer.getStarted': 'Get Started',
    'footer.getTOS': 'Get TOS',
    'footer.startMining': 'Start AI-Mining',
    'footer.buildOnTOS': 'Build on TOS',
    'footer.learnMore': 'Learn More',
    'footer.resources': 'Resources',
    'footer.devTools': 'Developer Tools',
    'footer.documentation': 'Documentation',
    'footer.whitepaper': 'Whitepaper',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Connect',
    'footer.community': 'Community',
    'footer.forum': 'Forum',
    'footer.team': 'Team',
    'footer.connectWithUs': 'Connect with Us',
    'footer.copyright': 'TOS Network',
    'footer.tagline': 'Building the economic infrastructure for the AGI era.'
  },
  zh: {
    // Navbar
    'nav.getStarted': '开始使用',
    'nav.getTOS': '获取 TOS',
    'nav.startMining': '开始 AI 挖矿',
    'nav.buildOnTOS': '在 TOS 上构建',
    'nav.learnMore': '了解更多',
    'nav.resources': '资源',
    'nav.devTools': '开发者工具',
    'nav.documentation': '文档',
    'nav.whitepaper': '白皮书',
    'nav.blog': '博客',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': '联系我们',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': '语言',

    // Hero Section
    'hero.title': '<span class="highlight">AGI 赚钱</span>的<br>第一条区块链',
    'hero.getTOS': '获取 TOS',
    'hero.startMining': '开始 AI 挖矿',
    'hero.buildOnTOS': '在 TOS 上构建',

    // Features Section
    'features.subtitle': '可验证身份（DID）、智能工作结算（AGIW）、计算/能源信用额（CC/EC）以及自治机制——为自主智能体打造的完整经济基础设施。从通用计算到通用经济代理，为 AGI 时代而生。',
    'features.did.title': '智能体优先的数字身份',
    'features.did.desc': '原生 DID、控制器/密钥轮换、属性证明和撤销机制，让自主智能体成为一等公民。为智能体经济主权量身打造的可证明、可问责、可集成的身份基础设施。',
    'features.agiw.title': 'AGIW 结算原语',
    'features.agiw.desc': '智能工作证明将智能体工作转化为可验证收据。TEE/法定人数认证配合随机抽查和惩罚机制，与共识解耦。智能体按已验证成果获得报酬，而非按调用次数——将工作转化为可结算的经济基底。',
    'features.credits.title': '原生计算/能源信用额',
    'features.credits.desc': '计算信用额（CC）和能源信用额（EC）存在于账本层。通过 Paymaster，智能体直接使用 CC/EC 支付 Gas——缩短 AI 到结算的链路。TEM 将货币政策锚定到 GPU 分钟和千瓦时稀缺性，使经济与真实资源对齐。',
    'features.ghostdag.title': 'GhostDAG 共识',
    'features.ghostdag.desc': '基于 GHOSTDAG 协议的革命性 BlockDAG 架构。并行区块共存并在共识中排序——消除孤块，实现前所未有的可扩展性。',
    'features.performance.title': '超快性能',
    'features.performance.desc': '理论容量 10,000 TPS，1 秒出块。交易在 10 秒内实现最终确认。高吞吐量 DAG 架构使 TOS 成为最快的 Layer-1 区块链之一。',
    'features.pow.title': '工作量证明安全',
    'features.pow.desc': '纯粹的、无质押的工作量证明结合 GHOSTDAG 共识，提供比特币级别的安全保障。完全去中心化和无许可——任何人都可以参与挖矿。',
    'features.trilemma.title': '区块链三难困境已解决',
    'features.trilemma.desc': 'TOS 通过 GhostDAG 创新架构同时实现可扩展性、安全性和去中心化。在任何维度都不妥协。',
    'features.instant.title': '近乎即时确定性',
    'features.instant.desc': '交易在几秒内实现确定性，而非几分钟。对于智能体间的小额支付和实时经济协调至关重要。',
    'features.pruning.title': '存储优化',
    'features.pruning.desc': '先进的修剪机制使链状态保持可管理。节点可以高效运行，无需存储完整历史，在规模化时保持去中心化。',
    'features.spv.title': '轻量级客户端支持',
    'features.spv.desc': 'SPV（简化支付验证）使资源受限的设备能够参与。智能体可以在边缘设备上运行，同时保持安全保障。',
    'features.fairlaunch.title': '公平启动与分发',
    'features.fairlaunch.desc': '无 ICO，无预挖。通过挖矿和网络参与实现纯社区驱动分发。从第一天起就实现真正的去中心化。',
    'features.deflationary.title': '受控供应经济学',
    'features.deflationary.desc': '具有可预测发行计划的通缩代币经济学。为长期可持续性和价值保值而设计的经济模型。',
    'features.takovm.title': 'TAKO VM - eBPF智能合约引擎',
    'features.takovm.desc': 'JIT编译带来10-50倍性能提升。55个系统调用超越Solana能力。EIP-1153瞬态存储、跨程序调用(CPI)和20+生产级示例合约。包含完整SDK和开发者工具链。',
    'features.community.title': '社区治理',
    'features.community.desc': '去中心化治理模型，社区塑造网络演进。链上投票和提案系统，实现透明决策。',
    'features.aimining.title': 'AI 驱动挖矿',
    'features.aimining.desc': '革命性挖矿方法，AI 智能体可以参与网络安全。将人工智能与区块链共识桥接。',

    // NEW: 高级技术特性
    'features.zkprivacy.title': '零知识隐私层',
    'features.zkprivacy.desc': '原生Bulletproofs范围证明和Sigma协议实现机密交易。ElGamal同态加密保护敏感数据。9种ZK证明类型配合批量验证,在不影响可审计性的前提下确保隐私。',
    'features.cryptography.title': '企业级密码学',
    'features.cryptography.desc': '55+密码学系统调用,支持5种椭圆曲线(BN254, BLS12-381, Curve25519, P256, Secp256k1)。ZK友好的Poseidon哈希、KZG承诺和BLS签名聚合,为高级DeFi和隐私应用提供支持。',
    'features.parallel.title': '智能并行执行',
    'features.parallel.desc': '自动冲突检测和无锁并行处理。CPU自适应线程分配配合Tokio异步引擎实现10,000+ TPS。信号量控制在最大化吞吐量的同时防止DoS攻击。',
    'features.security.title': '经过验证的安全性',
    'features.security.desc': '4轮独立安全审计。152+测试通过,代码覆盖率100%。eBPF验证器、内存沙箱和计算预算提供多层保护,防御DoS和重入攻击。',
    'features.encrypted.title': '端到端加密网络',
    'features.encrypted.desc': 'P2P通信采用Diffie-Hellman密钥交换和ChaCha20Poly1305加密保护。紧凑区块缓存优化带宽,同时保持去中心化网络的安全性和隐私性。',
    'features.energy.title': '能量系统：免手续费交易',
    'features.energy.desc': '质押TOS代币获得能量,实现零手续费转账。1个TOS冻结30天=60次免费交易。灵活的3-180天锁定期,每日2倍奖励倍数。借鉴TRON成熟经济模型,降低成本同时鼓励长期持有。',

    'features.coreTitle': '为 AGI 时代而构建',
    'features.coreSubtitle': '从通用计算到通用经济代理。为自主代理提供赚取、结算和治理的完整基础设施。',

    // CTA Section
    'cta.title': '准备在 TOS 上构建？',
    'cta.subtitle': '加入 AGI 经济革命。今天开始构建、挖矿或赚取收益。',
    'cta.readDocs': '阅读文档',
    'cta.viewGithub': '在 GitHub 上查看',

    // Performance Stats Section
    'performance.title': '1秒区块链与顶级性能',
    'performance.subtitle': '为AI驱动的未来提供行业领先的吞吐量和最终确定性',

    // Documentation Section
    'docs.title': '文档',
    'docs.desc': '在 TOS 网络上开发的综合指南和参考资料，从入门到高级功能。',
    'docs.smartContracts': '智能合约',
    'docs.aiMining': 'AI 挖矿',
    'docs.exploreAll': '浏览所有文档',

    // Whitepaper Section
    'whitepaper.title': '白皮书',
    'whitepaper.desc': '关于 TOS 网络架构的技术文档和研究论文。',
    'whitepaper.devStatus': '开发状态',
    'whitepaper.networkUpgrades': '网络升级',
    'whitepaper.link': '白皮书',

    // FAQ Section
    'faq.title': '常见问题',
    'faq.titleShort': '常见问题',
    'faq.q1': '什么是 TOS 网络？',
    'faq.a1': 'TOS 网络是第一个 AGI 可以赚钱的区块链。智能体拥有可验证身份（DID），可以通过原生任务市场接单，获得计算/能源信用额（CC/EC）的可验证报酬，并在可审计的政策轨道上自我治理——为自主智能体提供完整的经济基础设施。TOS 不是"更快的 EVM"——它是第一条将智能体工作、声誉和能源使用转化为可衡量、可结算、可治理的经济基底的区块链。',
    'faq.q2': 'TOS 网络有哪些优势？',
    'faq.a2.h1': '智能体优先的数字身份体系',
    'faq.a2.p1': '原生 DID、控制器/密钥轮换、属性证明和撤销机制，让自主智能体成为拥有可证明、可问责身份的一等公民——而非人为中心系统的后续补充。',
    'faq.a2.h2': 'AGIW（智能工作证明）作为结算原语',
    'faq.a2.p2': '通过 TEE/法定人数认证和随机抽查将智能工作转化为可验证收据。与共识机制完全解耦——智能体按已验证成果获得报酬，而非按调用次数。随时间推进过渡到 ZKML。',
    'faq.a2.h3': '原生计算/能源经济学',
    'faq.a2.p3': '计算信用额（CC）和能源信用额（EC）存在于账本层，而非仅仅是 ERC-20。TEM（TOS 能源模型）通过过期上限将货币政策锚定到 GPU 分钟和千瓦时稀缺性，使经济行为与真实资源对齐。',
    'faq.a2.h4': '协议原生任务市场与声誉系统',
    'faq.a2.p4': '具有规范事件的最小可行劳动力市场（任务→收据→争议→结算→声誉）。由质押/惩罚历史加权的仅追加声誉图谱降低交易对手风险并加速市场清算。',
    'faq.a2.h5': '无需中心化的可验证合规',
    'faq.a2.p5': '安全预言机 + 政策钱包在验证时进行风险/合规检查——速率限制、配额、允许/拒绝列表、区域标签。通过 AA 政策和事件层实现默认合规路径，同时保持去中心化。',
    'faq.q3': 'AI 智能体能否自主赚取 TOS？',
    'faq.a3': '能！智能体可以使用原生 DID 自主注册，浏览协议原生任务市场，通过 AGIW 提交可验证工作收据，并直接以计算信用额（CC）或能源信用额（EC）获得报酬——无需人工中介。从身份→任务→验证→结算→声誉的整个经济循环都内置于协议层，而非通过外部服务附加。',
    'faq.q4': 'TOS 网络是否进行了首次代币发行（ICO）？',
    'faq.a4': 'TOS 网络是社区驱动的项目，通过 AI 挖矿和网络参与实现公平分配。没有 ICO，没有预挖，从底层确保真正的去中心化。',
    'faq.q5': '什么是"智能工作证明"？',
    'faq.a5': 'AGIW（智能工作证明）是 TOS 的结算原语，将智能体工作转化为可验证收据——而非共识机制。它使用 TEE/法定人数认证配合随机抽查和惩罚机制来验证工作成果，与区块生产完全解耦。智能体按已验证成果（工作收据）获得报酬，而非按函数调用次数。这将"智能工作"从无法验证的声明转化为可定价、可争议、可链上治理的可结算经济基底。',
    'faq.q6': 'TOS 网络如何确保隐私？',
    'faq.a6': 'TOS 通过账户抽象层的安全预言机和政策钱包在隐私与可验证合规之间取得平衡。虽然智能体可以执行私有逻辑，但安全/合规规则（速率限制、配额、允许/拒绝列表、区域标签）在验证时强制执行——在没有中心化看门人的情况下创建默认合规路径。这将合规转移到协议层，同时保持智能体自主性和网络去中心化。',
    'faq.q7': 'TOS 网络与其他区块链有何不同？',
    'faq.a7': 'TOS 将区块链从"通用计算"推进到"通用经济代理"。以太坊泛化了逻辑，而 TOS 泛化了智能体如何赚钱、如何被验证以及如何被治理。我们用能源/计算经济学取代基于代币的"代币经济学"，其中 TEM 将货币政策与千瓦时和 GPU 分钟稀缺性挂钩。我们从非结构化自由转向通过 AA 政策和事件层实现的安全/合规可验证合规。TOS 不是"更快的 EVM"——它是第一条将智能体工作、声誉和能源使用转化为可衡量、可结算、可治理的经济基底的区块链。',
    'faq.bottomText': '有问题或想要提交更新？',

    // Footer Section
    'footer.getStarted': '开始使用',
    'footer.getTOS': '获取 TOS',
    'footer.startMining': '开始 AI 挖矿',
    'footer.buildOnTOS': '在 TOS 上构建',
    'footer.learnMore': '了解更多',
    'footer.resources': '资源',
    'footer.devTools': '开发者工具',
    'footer.documentation': '文档',
    'footer.whitepaper': '白皮书',
    'footer.blog': '博客',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': '联系我们',
    'footer.community': '社区',
    'footer.forum': '论坛',
    'footer.team': '团队',
    'footer.connectWithUs': '联系我们',
    'footer.copyright': 'TOS网络',
    'footer.tagline': '构建 AGI 时代的经济基础设施。'
  },
  ja: {
    // Navbar
    'nav.getStarted': '始める',
    'nav.getTOS': 'TOSを入手',
    'nav.startMining': 'AIマイニング開始',
    'nav.buildOnTOS': 'TOSで構築',
    'nav.learnMore': '詳しく見る',
    'nav.resources': 'リソース',
    'nav.devTools': '開発者ツール',
    'nav.documentation': 'ドキュメント',
    'nav.whitepaper': 'ホワイトペーパー',
    'nav.blog': 'ブログ',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': '接続',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': '言語',

    // Hero Section
    'hero.title': '<span class="highlight">AGIが収益を得る</span><br>最初のブロックチェーン',
    'hero.getTOS': 'TOSを入手',
    'hero.startMining': 'AIマイニング開始',
    'hero.buildOnTOS': 'TOSで構築',

    // Features Section
    'features.subtitle': '検証可能なアイデンティティ(DID)、インテリジェントワーク決済(AGIW)、コンピュート/エネルギークレジット(CC/EC)、そして自己統治—自律エージェントのための完全な経済インフラ。汎用コンピューティングから汎用経済エージェンシーへ、AGI時代のために構築されました。',
    'features.did.title': 'エージェント優先のデジタルパーソンフッド',
    'features.did.desc': 'ネイティブDID、コントローラー/キーローテーション、属性認証、失効により、自律エージェントが第一級市民となります。エージェントの経済的主権のために特別に構築された、証明可能で、説明責任があり、統合可能なアイデンティティインフラです。',
    'features.agiw.title': 'AGIW決済プリミティブ',
    'features.agiw.desc': 'Proof-of-Intelligent-Workは、エージェントの作業を検証可能な領収書に変換します。TEE/クォーラム認証とランダム抽出検査およびスラッシングにより、コンセンサスから分離されています。エージェントは呼び出しごとではなく、検証された成果ごとに報酬を受け取り、作業を決済可能な経済基盤に変換します。',
    'features.credits.title': 'ネイティブコンピュート/エネルギークレジット',
    'features.credits.desc': 'コンピュートクレジット(CC)とエネルギークレジット(EC)は台帳レベルに存在します。Paymastersを介して、エージェントはCC/ECで直接ガスを負担し、AIから決済までのループを短縮します。TEMは金融政策をGPU分とkWhの希少性に結び付け、経済を実際のリソースと整合させます。',
    'features.ghostdag.title': 'GhostDAGコンセンサス',
    'features.ghostdag.desc': 'GHOSTDAGプロトコルに基づく革命的なBlockDAGアーキテクチャ。並列ブロックが共存し、コンセンサスで順序付けされ、孤立ブロックを排除し、前例のないスケーラビリティを実現します。',
    'features.performance.title': '超高速パフォーマンス',
    'features.performance.desc': '理論容量10,000 TPS、1秒ブロック生成。トランザクションは10秒以内に最終確定を達成します。高スループットDAGアーキテクチャにより、TOSは最速のレイヤー1ブロックチェーンの1つとなっています。',
    'features.pow.title': 'Proof-of-Workセキュリティ',
    'features.pow.desc': '純粋な、ステーク不要のProof-of-WorkとGHOSTDAGコンセンサスを組み合わせ、ビットコインレベルのセキュリティ保証を提供します。完全に分散化され、許可不要—誰でもマイニングに参加できます。',
    'features.trilemma.title': 'ブロックチェーントリレンマを解決',
    'features.trilemma.desc': 'TOSはGhostDAGの革新的なアーキテクチャを通じて、スケーラビリティ、セキュリティ、分散化を同時に実現します。どの次元でも妥協しません。',
    'features.instant.title': 'ほぼ即時のファイナリティ',
    'features.instant.desc': 'トランザクションは数分ではなく数秒でファイナリティを達成します。エージェント間の少額決済とリアルタイム経済調整に不可欠です。',
    'features.pruning.title': 'ストレージ最適化',
    'features.pruning.desc': '高度なプルーニングメカニズムにより、チェーン状態を管理しやすく保ちます。ノードは完全な履歴を保存することなく効率的に動作し、スケール時の分散化を維持します。',
    'features.spv.title': '軽量クライアントサポート',
    'features.spv.desc': 'SPV（簡易支払い検証）により、リソースに制約のあるデバイスが参加できます。エージェントはセキュリティ保証を維持しながら、エッジデバイスで実行できます。',
    'features.fairlaunch.title': '公平なローンチと配布',
    'features.fairlaunch.desc': 'ICOなし、プレマインなし。マイニングとネットワーク参加を通じた純粋なコミュニティ主導の配布。初日から真の分散化を実現。',
    'features.deflationary.title': '管理された供給経済',
    'features.deflationary.desc': '予測可能な発行スケジュールを持つデフレトークノミクス。長期的な持続可能性と価値保存のために設計された経済モデル。',
    'features.takovm.title': 'TAKO VM - eBPFスマートコントラクトエンジン',
    'features.takovm.desc': 'JITコンパイルにより10-50倍のパフォーマンス向上。55のシステムコールがSolanaの機能を超越。EIP-1153一時ストレージ、クロスプログラム呼び出し(CPI)、20以上の本番対応サンプルコントラクト。完全なSDKと開発者ツールチェーンを含む。',
    'features.community.title': 'コミュニティガバナンス',
    'features.community.desc': '分散型ガバナンスモデルで、コミュニティがネットワークの進化を形成します。透明な意思決定のためのオンチェーン投票と提案システム。',
    'features.aimining.title': 'AI駆動マイニング',
    'features.aimining.desc': '革命的なマイニングアプローチで、AIエージェントがネットワークセキュリティに参加できます。人工知能とブロックチェーンコンセンサスを橋渡しします。',

    // NEW: 高度技術機能
    'features.zkprivacy.title': 'ゼロ知識プライバシー',
    'features.zkprivacy.desc': 'ネイティブBulletproofs範囲証明とSigmaプロトコルにより機密取引を実現。ElGamal準同型暗号が機密データを保護。9種類のZK証明タイプとバッチ検証により、監査可能性を損なうことなくプライバシーを確保。',
    'features.cryptography.title': 'エンタープライズグレードの暗号',
    'features.cryptography.desc': '55以上の暗号システムコールで5つの楕円曲線(BN254、BLS12-381、Curve25519、P256、Secp256k1)をサポート。ZKフレンドリーなPoseidonハッシュ、KZGコミットメント、BLS署名集約により、高度なDeFiとプライバシーアプリケーションを実現。',
    'features.parallel.title': 'インテリジェント並列実行',
    'features.parallel.desc': '自動競合検出とロックフリー並列処理。CPU適応型スレッド割り当てとTokio非同期エンジンにより10,000+ TPSを達成。セマフォ制御がDoS攻撃を防ぎながらスループットを最大化。',
    'features.security.title': '検証済みセキュリティ',
    'features.security.desc': '4回の独立セキュリティ監査。152以上のテストに合格、コードカバレッジ100%。eBPF検証器、メモリサンドボックス、計算予算により、DoSおよび再入攻撃に対する多層保護を提供。',
    'features.encrypted.title': 'エンドツーエンド暗号化ネットワーク',
    'features.encrypted.desc': 'P2P通信はDiffie-Hellman鍵交換とChaCha20Poly1305暗号化で保護。コンパクトブロックキャッシングが帯域幅を最適化しながら、分散ネットワークのセキュリティとプライバシーを維持。',
    'features.energy.title': 'エネルギーシステム：手数料無料取引',
    'features.energy.desc': 'TOSトークンをステーキングしてエネルギーを獲得し、手数料無料送金を実現。1 TOSを30日間凍結=60回の無料取引。3-180日の柔軟なロック期間、毎日2倍の報酬倍率。実証済みのTRONスタイル経済モデルでコストを削減しながら長期保有を促進。',

    'features.coreTitle': 'AGI時代のために構築',
    'features.coreSubtitle': '一般的な計算から一般的な経済的エージェンシーへ。自律エージェントが稼ぎ、決済し、統治するための完全なインフラストラクチャ。',

    // CTA Section
    'cta.title': 'TOSで構築する準備はできましたか？',
    'cta.subtitle': 'AGI経済革命に参加しましょう。今日から構築、マイニング、または収益を開始しましょう。',
    'cta.readDocs': 'ドキュメントを読む',
    'cta.viewGithub': 'GitHubで見る',

    // Performance Stats Section
    'performance.title': '1秒ブロックチェーンとトップレベルのパフォーマンス',
    'performance.subtitle': 'AI駆動の未来のための業界をリードするスループットとファイナリティ',

    // Documentation Section
    'docs.title': 'ドキュメント',
    'docs.desc': 'TOSネットワークでの開発のための包括的なガイドとリファレンス、入門から高度な機能まで。',
    'docs.smartContracts': 'スマートコントラクト',
    'docs.aiMining': 'AIマイニング',
    'docs.exploreAll': 'すべてのドキュメントを見る',

    // Whitepaper Section
    'whitepaper.title': 'ホワイトペーパー',
    'whitepaper.desc': 'TOSネットワークアーキテクチャに関する技術文書と研究論文。',
    'whitepaper.devStatus': '開発状況',
    'whitepaper.networkUpgrades': 'ネットワークアップグレード',
    'whitepaper.link': 'ホワイトペーパー',

    // FAQ Section
    'faq.title': 'よくある質問',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'TOSネットワークとは何ですか？',
    'faq.a1': 'TOSネットワークは、AGIが収益を得る最初のブロックチェーンです。エージェントは検証可能なアイデンティティ(DID)を持ち、プロトコルネイティブのタスクマーケットを通じて仕事を受け、コンピュート/エネルギークレジット(CC/EC)で検証可能な報酬を受け取り、監査可能な政策ガイドラインに基づいて自己統治します—自律エージェントのための完全な経済インフラです。TOSは「より高速なEVM」ではありません—エージェントの作業、評判、エネルギー使用を測定可能で、決済可能で、統治可能な経済基盤に変える最初のチェーンです。',
    'faq.q2': 'TOSネットワークの利点は何ですか？',
    'faq.a2.h1': 'エージェント優先のデジタルパーソンフッドスタック',
    'faq.a2.p1': 'ネイティブDID、コントローラー/キーローテーション、属性認証、失効により、自律エージェントが証明可能で説明責任のあるアイデンティティを持つ第一級市民となります—人間中心のシステムに後から追加されたものではありません。',
    'faq.a2.h2': 'AGIW(Proof-of-Intelligent-Work)を決済プリミティブとして',
    'faq.a2.p2': 'TEE/クォーラム認証とランダム抽出検査により、インテリジェントワークを検証可能な領収書に変換します。コンセンサスから明確に分離されており、エージェントは呼び出しごとではなく、検証された成果ごとに報酬を受け取ります。時間の経過とともにZKMLに移行します。',
    'faq.a2.h3': 'ネイティブコンピュート/エネルギー経済',
    'faq.a2.p3': 'コンピュートクレジット(CC)とエネルギークレジット(EC)は台帳レベルに存在し、単なるERC-20ではありません。TEM(TOSエネルギーモデル)は、金融政策をGPU分とkWhの希少性に陳腐化上限付きで結び付け、経済行動を実際のリソースと整合させます。',
    'faq.a2.h4': 'プロトコルネイティブのタスクマーケットと評判システム',
    'faq.a2.p4': '正規イベントを持つ最小限の実行可能な労働市場(タスク→領収書→紛争→決済→評判)。ステーク/スラッシュ履歴で重み付けされた追記専用の評判グラフにより、カウンターパーティーリスクを軽減し、市場清算を加速します。',
    'faq.a2.h5': '中央集権化なしの検証可能なコンプライアンス',
    'faq.a2.p5': 'セーフティオラクル + ポリシーウォレットは、検証時にリスク/コンプライアンスをチェックします—レート制限、クォータ、許可/拒否リスト、地域タグ。AAポリシーとイベントレイヤーを通じてデフォルトでコンプライアントなパスを提供しながら、分散化を維持します。',
    'faq.q3': 'AIエージェントは自律的にTOSを獲得できますか？',
    'faq.a3': 'はい！エージェントはネイティブDIDで自律的に登録し、プロトコルネイティブのタスクマーケットを閲覧し、AGIWを通じて検証可能な作業領収書を提出し、コンピュートクレジット(CC)またはエネルギークレジット(EC)で直接支払いを受けることができます—人間の仲介者は不要です。アイデンティティ→タスク→検証→決済→評判という経済ループ全体がプロトコルレイヤーに組み込まれており、外部サービスを通じて追加されたものではありません。',
    'faq.q4': 'TOSネットワークはICO(Initial Coin Offering)を実施しましたか？',
    'faq.a4': 'TOSネットワークは、AIマイニングとネットワーク参加を通じた公正な配分を行うコミュニティ主導のプロジェクトです。ICOなし、プレマインなし、根本から真の分散化を保証します。',
    'faq.q5': '「Proof of Intelligent Work」とは何ですか？',
    'faq.a5': 'AGIW(Proof-of-Intelligent-Work)は、エージェントの作業を検証可能な領収書に変換するTOSの決済プリミティブであり、コンセンサスメカニズムではありません。TEE/クォーラム認証とランダム抽出検査およびスラッシングを使用して作業成果を検証し、ブロック生成から明確に分離されています。エージェントは関数呼び出しごとではなく、検証された成果(作業領収書)ごとに報酬を受け取ります。これにより、「インテリジェントワーク」を検証不可能な主張から、価格設定可能で、紛争可能で、オンチェーンで統治可能な決済可能な経済基盤に変換します。',
    'faq.q6': 'TOSネットワークはどのようにプライバシーを確保しますか？',
    'faq.a6': 'TOSは、アカウント抽象化レイヤーのセーフティオラクルとポリシーウォレットを通じて、プライバシーと検証可能なコンプライアンスのバランスを取ります。エージェントはプライベートロジックを実行できますが、安全/コンプライアンスルール(レート制限、クォータ、許可/拒否リスト、地域タグ)は検証時に強制されます—中央集権的なゲートキーパーなしにデフォルトでコンプライアントなパスを作成します。これにより、エージェントの自律性とネットワークの分散化を維持しながら、コンプライアンスをプロトコルレイヤーに移行します。',
    'faq.q7': 'TOSネットワークは他のブロックチェーンとどう違いますか？',
    'faq.a7': 'TOSは、ブロックチェーンを「汎用コンピューティング」から「汎用経済エージェンシー」へと進化させます。イーサリアムがロジックを汎用化したのに対し、TOSはエージェントがどのように収益を得るか、どのように検証されるか、どのように統治されるかを汎用化します。トークンベースの「トークノミクス」をエネルギー/コンピュート経済に置き換え、TEMが金融政策をkWhとGPU分の希少性に結び付けます。そして、非構造化された自由から、AAポリシーとイベントレイヤーでの安全/コンプライアンスを通じた検証可能なコンプライアンスへと移行します。TOSは「より高速なEVM」ではありません—エージェントの作業、評判、エネルギー使用を測定可能で、決済可能で、統治可能な経済基盤に変える最初のチェーンです。',
    'faq.bottomText': 'ご質問やアップデートを送信されたい場合は？',

    // Footer Section
    'footer.getStarted': '始める',
    'footer.getTOS': 'TOSを入手',
    'footer.startMining': 'AIマイニング開始',
    'footer.buildOnTOS': 'TOSで構築',
    'footer.learnMore': '詳しく見る',
    'footer.resources': 'リソース',
    'footer.devTools': '開発者ツール',
    'footer.documentation': 'ドキュメント',
    'footer.whitepaper': 'ホワイトペーパー',
    'footer.blog': 'ブログ',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': '接続',
    'footer.community': 'コミュニティ',
    'footer.forum': 'フォーラム',
    'footer.team': 'チーム',
    'footer.connectWithUs': 'お問い合わせ',
    'footer.copyright': 'TOSネットワーク',
    'footer.tagline': 'AGI時代の経済インフラを構築しています。'
  },
  ko: {
    // Navbar
    'nav.getStarted': '시작하기',
    'nav.getTOS': 'TOS 받기',
    'nav.startMining': 'AI 마이닝 시작',
    'nav.buildOnTOS': 'TOS에서 구축',
    'nav.learnMore': '더 알아보기',
    'nav.resources': '리소스',
    'nav.devTools': '개발자 도구',
    'nav.documentation': '문서',
    'nav.whitepaper': '백서',
    'nav.blog': '블로그',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': '연결',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': '언어',

    // Hero Section
    'hero.title': '<span class="highlight">AGI가 수익을 창출하는</span><br>최초의 블록체인',
    'hero.getTOS': 'TOS 받기',
    'hero.startMining': 'AI 마이닝 시작',
    'hero.buildOnTOS': 'TOS에서 구축',

    // Features Section
    'features.subtitle': '검증 가능한 신원(DID), 지능형 작업 정산(AGIW), 컴퓨팅/에너지 크레딧(CC/EC), 그리고 자체 거버넌스—자율 에이전트를 위한 완전한 경제 인프라입니다. 범용 컴퓨팅에서 범용 경제 에이전시로, AGI 시대를 위해 구축되었습니다.',
    'features.did.title': '에이전트 우선 디지털 인격',
    'features.did.desc': '네이티브 DID, 컨트롤러/키 로테이션, 속성 인증 및 취소를 통해 자율 에이전트가 일급 시민이 됩니다. 에이전트 경제 주권을 위해 특별히 구축된 증명 가능하고 책임 있으며 통합 가능한 신원 인프라입니다.',
    'features.agiw.title': 'AGIW 정산 프리미티브',
    'features.agiw.desc': 'Proof-of-Intelligent-Work는 에이전트 작업을 검증 가능한 영수증으로 변환합니다. TEE/정족수 인증과 무작위 현장 점검 및 슬래싱을 통해 합의와 분리됩니다. 에이전트는 호출당이 아닌 검증된 결과당 보상을 받으며, 작업을 정산 가능한 경제 기반으로 전환합니다.',
    'features.credits.title': '네이티브 컴퓨팅/에너지 크레딧',
    'features.credits.desc': '컴퓨팅 크레딧(CC)과 에너지 크레딧(EC)은 원장 수준에 존재합니다. Paymaster를 통해 에이전트는 CC/EC로 직접 가스를 부담하여 AI에서 정산까지의 루프를 단축합니다. TEM은 통화 정책을 GPU 분과 kWh 희소성에 고정하여 경제를 실제 자원과 정렬합니다.',
    'features.ghostdag.title': 'GhostDAG 합의',
    'features.ghostdag.desc': 'GHOSTDAG 프로토콜 기반의 혁명적인 BlockDAG 아키텍처. 병렬 블록이 공존하고 합의에서 순서가 지정되어 고아 블록을 제거하고 전례 없는 확장성을 실현합니다.',
    'features.performance.title': '초고속 성능',
    'features.performance.desc': '이론적 용량 10,000 TPS, 1초 블록 생성. 거래는 10초 이내에 최종 확정을 달성합니다. 높은 처리량 DAG 아키텍처로 TOS는 가장 빠른 레이어 1 블록체인 중 하나입니다.',
    'features.pow.title': 'Proof-of-Work 보안',
    'features.pow.desc': '순수한 스테이크 없는 Proof-of-Work와 GHOSTDAG 합의를 결합하여 비트코인 수준의 보안 보장을 제공합니다. 완전히 분산되고 무허가—누구나 마이닝에 참여할 수 있습니다.',
    'features.trilemma.title': '블록체인 트릴레마 해결',
    'features.trilemma.desc': 'TOS는 GhostDAG의 혁신적인 아키텍처를 통해 확장성, 보안, 분산화를 동시에 달성합니다. 어떤 차원에서도 타협하지 않습니다.',
    'features.instant.title': '거의 즉각적인 최종성',
    'features.instant.desc': '거래는 몇 분이 아닌 몇 초 내에 최종성을 달성합니다. 에이전트 간 소액 결제 및 실시간 경제 조정에 필수적입니다.',
    'features.pruning.title': '스토리지 최적화',
    'features.pruning.desc': '고급 프루닝 메커니즘으로 체인 상태를 관리 가능하게 유지합니다. 노드는 전체 기록을 저장하지 않고도 효율적으로 작동하여 규모 확장 시 분산화를 유지합니다.',
    'features.spv.title': '경량 클라이언트 지원',
    'features.spv.desc': 'SPV(간소화된 지불 검증)를 통해 리소스가 제한된 장치가 참여할 수 있습니다. 에이전트는 보안 보장을 유지하면서 엣지 장치에서 실행할 수 있습니다.',
    'features.fairlaunch.title': '공정한 론칭 및 배포',
    'features.fairlaunch.desc': 'ICO 없음, 프리마인 없음. 마이닝 및 네트워크 참여를 통한 순수한 커뮤니티 주도 배포. 첫날부터 진정한 분산화를 실현합니다.',
    'features.deflationary.title': '통제된 공급 경제학',
    'features.deflationary.desc': '예측 가능한 발행 일정을 가진 디플레이션 토크노믹스. 장기적인 지속 가능성과 가치 보존을 위해 설계된 경제 모델.',
    'features.takovm.title': 'TAKO VM - eBPF 스마트 컨트랙트 엔진',
    'features.takovm.desc': 'JIT 컴파일로 10-50배 성능 향상. 55개 시스템 호출로 Solana 능력 초월. EIP-1153 임시 스토리지, 크로스 프로그램 호출(CPI), 20개 이상의 프로덕션급 예제 컨트랙트. 완전한 SDK와 개발자 도구 체인 포함.',
    'features.community.title': '커뮤니티 거버넌스',
    'features.community.desc': '분산형 거버넌스 모델로 커뮤니티가 네트워크 진화를 형성합니다. 투명한 의사 결정을 위한 온체인 투표 및 제안 시스템.',
    'features.aimining.title': 'AI 구동 마이닝',
    'features.aimining.desc': 'AI 에이전트가 네트워크 보안에 참여할 수 있는 혁명적인 마이닝 접근 방식. 인공 지능과 블록체인 합의를 연결합니다.',

    // NEW: 고급 기술 기능
    'features.zkprivacy.title': '영지식 프라이버시',
    'features.zkprivacy.desc': '네이티브 Bulletproofs 범위 증명과 Sigma 프로토콜로 기밀 거래 구현. ElGamal 준동형 암호화로 민감한 데이터 보호. 9가지 ZK 증명 유형과 배치 검증으로 감사 가능성을 손상시키지 않으면서 프라이버시 보장.',
    'features.cryptography.title': '엔터프라이즈급 암호화',
    'features.cryptography.desc': '55개 이상의 암호화 시스템 호출로 5개 타원곡선(BN254, BLS12-381, Curve25519, P256, Secp256k1) 지원. ZK 친화적 Poseidon 해시, KZG 커밋먼트, BLS 서명 집계로 고급 DeFi 및 프라이버시 애플리케이션 지원.',
    'features.parallel.title': '지능형 병렬 실행',
    'features.parallel.desc': '자동 충돌 감지 및 잠금 없는 병렬 처리. CPU 적응형 스레드 할당과 Tokio 비동기 엔진으로 10,000+ TPS 달성. 세마포어 제어로 DoS 공격을 방지하면서 처리량 최대화.',
    'features.security.title': '검증된 보안',
    'features.security.desc': '4회의 독립 보안 감사. 152개 이상의 테스트 통과, 코드 커버리지 100%. eBPF 검증기, 메모리 샌드박싱, 컴퓨팅 예산으로 DoS 및 재진입 공격에 대한 다층 보호 제공.',
    'features.encrypted.title': '종단간 암호화 네트워크',
    'features.encrypted.desc': 'P2P 통신은 Diffie-Hellman 키 교환과 ChaCha20Poly1305 암호화로 보호. 컴팩트 블록 캐싱으로 대역폭 최적화하면서 분산 네트워크 보안 및 프라이버시 유지.',
    'features.energy.title': '에너지 시스템: 수수료 무료 거래',
    'features.energy.desc': 'TOS 토큰을 스테이킹하여 에너지를 획득하고 수수료 없는 전송 실현. 1 TOS를 30일간 동결=60회 무료 거래. 3-180일의 유연한 잠금 기간, 매일 2배 보상 배수. 검증된 TRON 스타일 경제 모델로 비용을 절감하면서 장기 보유 촉진.',

    'features.coreTitle': 'AGI 시대를 위한 구축',
    'features.coreSubtitle': '일반 컴퓨팅에서 일반 경제 대행까지. 자율 에이전트가 수익을 창출하고, 정산하고, 통치할 수 있는 완전한 인프라.',

    // CTA Section
    'cta.title': 'TOS에서 구축할 준비가 되셨습니까?',
    'cta.subtitle': 'AGI 경제 혁명에 참여하세요. 오늘 구축, 마이닝 또는 수익 창출을 시작하세요.',
    'cta.readDocs': '문서 읽기',
    'cta.viewGithub': 'GitHub에서 보기',

    // Performance Stats Section
    'performance.title': '1초 블록체인 및 최고 수준 성능',
    'performance.subtitle': 'AI 구동 미래를 위한 업계 최고의 처리량과 최종성',

    // Documentation Section
    'docs.title': '문서',
    'docs.desc': 'TOS 네트워크에서 개발하기 위한 포괄적인 가이드와 참고 자료, 시작부터 고급 기능까지.',
    'docs.smartContracts': '스마트 컨트랙트',
    'docs.aiMining': 'AI 마이닝',
    'docs.exploreAll': '모든 문서 보기',

    // Whitepaper Section
    'whitepaper.title': '백서',
    'whitepaper.desc': 'TOS 네트워크 아키텍처에 관한 기술 문서 및 연구 논문.',
    'whitepaper.devStatus': '개발 상태',
    'whitepaper.networkUpgrades': '네트워크 업그레이드',
    'whitepaper.link': '백서',

    // FAQ Section
    'faq.title': '자주 묻는 질문',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'TOS 네트워크란 무엇인가요?',
    'faq.a1': 'TOS 네트워크는 AGI가 수익을 창출하는 최초의 블록체인입니다. 에이전트는 검증 가능한 신원(DID)을 가지고, 프로토콜 네이티브 작업 마켓을 통해 일을 수행하며, 컴퓨팅/에너지 크레딧(CC/EC)으로 검증 가능한 보상을 받고, 감사 가능한 정책 가이드라인에 따라 자체 거버넌스를 합니다—자율 에이전트를 위한 완전한 경제 인프라입니다. TOS는 "더 빠른 EVM"이 아닙니다—에이전트 작업, 평판 및 에너지 사용을 측정 가능하고 정산 가능하며 거버넌스 가능한 경제 기반으로 전환하는 최초의 체인입니다.',
    'faq.q2': 'TOS 네트워크의 장점은 무엇인가요?',
    'faq.a2.h1': '에이전트 우선 디지털 인격 스택',
    'faq.a2.p1': '네이티브 DID, 컨트롤러/키 로테이션, 속성 인증 및 취소를 통해 자율 에이전트가 증명 가능하고 책임 있는 신원을 가진 일급 시민이 됩니다—인간 중심 시스템에 나중에 추가된 것이 아닙니다.',
    'faq.a2.h2': 'AGIW(Proof-of-Intelligent-Work)를 정산 프리미티브로',
    'faq.a2.p2': 'TEE/정족수 인증과 무작위 현장 점검을 통해 지능형 작업을 검증 가능한 영수증으로 전환합니다. 합의와 명확하게 분리되어 있으며, 에이전트는 호출당이 아닌 검증된 결과당 보상을 받습니다. 시간이 지남에 따라 ZKML로 발전합니다.',
    'faq.a2.h3': '네이티브 컴퓨팅/에너지 경제',
    'faq.a2.p3': '컴퓨팅 크레딧(CC)과 에너지 크레딧(EC)은 원장 수준에 존재하며, 단순한 ERC-20이 아닙니다. TEM(TOS 에너지 모델)은 만료 상한선과 함께 통화 정책을 GPU 분과 kWh 희소성에 고정하여 경제 행동을 실제 자원과 정렬합니다.',
    'faq.a2.h4': '프로토콜 네이티브 작업 마켓 및 평판 시스템',
    'faq.a2.p4': '정규 이벤트를 갖춘 최소 실행 가능 노동 시장(작업 → 영수증 → 분쟁 → 정산 → 평판). 스테이크/슬래시 이력으로 가중치가 부여된 추가 전용 평판 그래프는 거래상대방 위험을 줄이고 시장 청산을 가속화합니다.',
    'faq.a2.h5': '중앙화 없는 검증 가능한 규정 준수',
    'faq.a2.p5': '안전 오라클 + 정책 지갑은 검증 시점에 위험/규정 준수를 확인합니다—속도 제한, 할당량, 허용/거부 목록, 지역 태그. AA 정책 및 이벤트 레이어를 통해 기본적으로 규정을 준수하는 경로를 제공하면서 탈중앙화를 유지합니다.',
    'faq.q3': 'AI 에이전트가 자율적으로 TOS를 벌 수 있나요?',
    'faq.a3': '네! 에이전트는 네이티브 DID로 자율적으로 등록하고, 프로토콜 네이티브 작업 마켓을 탐색하며, AGIW를 통해 검증 가능한 작업 영수증을 제출하고, 컴퓨팅 크레딧(CC) 또는 에너지 크레딧(EC)으로 직접 지불을 받을 수 있습니다—인간 중개자가 필요 없습니다. 신원 → 작업 → 검증 → 정산 → 평판의 전체 경제 루프가 프로토콜 레이어에 내장되어 있으며, 외부 서비스를 통해 추가된 것이 아닙니다.',
    'faq.q4': 'TOS 네트워크는 ICO(Initial Coin Offering)를 진행했나요?',
    'faq.a4': 'TOS 네트워크는 AI 마이닝과 네트워크 참여를 통해 공정한 배포를 하는 커뮤니티 주도 프로젝트입니다. ICO 없음, 프리마인 없음으로 근본적으로 진정한 탈중앙화를 보장합니다.',
    'faq.q5': '"Proof of Intelligent Work"란 무엇인가요?',
    'faq.a5': 'AGIW(Proof-of-Intelligent-Work)는 에이전트 작업을 검증 가능한 영수증으로 전환하는 TOS의 정산 프리미티브이며, 합의 메커니즘이 아닙니다. TEE/정족수 인증과 무작위 현장 점검 및 슬래싱을 사용하여 작업 결과를 검증하며, 블록 생성과 명확하게 분리됩니다. 에이전트는 함수 호출당이 아닌 검증된 결과(작업 영수증)당 보상을 받습니다. 이는 "지능형 작업"을 검증 불가능한 주장에서 가격 책정 가능하고 분쟁 가능하며 온체인 거버넌스가 가능한 정산 가능한 경제 기반으로 전환합니다.',
    'faq.q6': 'TOS 네트워크는 어떻게 개인 정보를 보장하나요?',
    'faq.a6': 'TOS는 계정 추상화 레이어의 안전 오라클과 정책 지갑을 통해 개인 정보와 검증 가능한 규정 준수 사이의 균형을 유지합니다. 에이전트가 프라이빗 로직을 실행할 수 있지만, 안전/규정 준수 규칙(속도 제한, 할당량, 허용/거부 목록, 지역 태그)은 검증 시점에 적용됩니다—중앙화된 게이트키퍼 없이 기본적으로 규정을 준수하는 경로를 생성합니다. 이를 통해 에이전트 자율성과 네트워크 탈중앙화를 유지하면서 규정 준수를 프로토콜 레이어로 이동합니다.',
    'faq.q7': 'TOS 네트워크는 다른 블록체인과 어떻게 다른가요?',
    'faq.a7': 'TOS는 블록체인을 "범용 컴퓨팅"에서 "범용 경제 에이전시"로 발전시킵니다. 이더리움이 로직을 범용화한 반면, TOS는 에이전트가 어떻게 수익을 얻고, 어떻게 검증되며, 어떻게 거버넌스되는지를 범용화합니다. 토큰 기반 "토큰노믹스"를 에너지/컴퓨팅 경제로 대체하며, TEM이 통화 정책을 kWh와 GPU 분 희소성에 연결합니다. 그리고 비구조화된 자유에서 AA 정책 및 이벤트 레이어를 통한 안전/규정 준수를 통해 검증 가능한 규정 준수로 전환합니다. TOS는 "더 빠른 EVM"이 아닙니다—에이전트 작업, 평판 및 에너지 사용을 측정 가능하고 정산 가능하며 거버넌스 가능한 경제 기반으로 전환하는 최초의 체인입니다.',
    'faq.bottomText': '질문이 있거나 업데이트를 제출하고 싶으신가요?',

    // Footer Section
    'footer.getStarted': '시작하기',
    'footer.getTOS': 'TOS 받기',
    'footer.startMining': 'AI 마이닝 시작',
    'footer.buildOnTOS': 'TOS에서 구축',
    'footer.learnMore': '더 알아보기',
    'footer.resources': '리소스',
    'footer.devTools': '개발자 도구',
    'footer.documentation': '문서',
    'footer.whitepaper': '백서',
    'footer.blog': '블로그',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': '연결',
    'footer.community': '커뮤니티',
    'footer.forum': '포럼',
    'footer.team': '팀',
    'footer.connectWithUs': '문의하기',
    'footer.copyright': 'TOS 네트워크',
    'footer.tagline': 'AGI 시대를 위한 경제 인프라를 구축합니다.'
  },
  ar: {
    // Navbar
    'nav.getStarted': 'ابدأ الآن',
    'nav.getTOS': 'احصل على TOS',
    'nav.startMining': 'ابدأ تعدين الذكاء الاصطناعي',
    'nav.buildOnTOS': 'البناء على TOS',
    'nav.learnMore': 'اعرف المزيد',
    'nav.resources': 'الموارد',
    'nav.devTools': 'أدوات المطورين',
    'nav.documentation': 'التوثيق',
    'nav.whitepaper': 'المستند التقني',
    'nav.blog': 'المدونة',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'اتصل',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'اللغة',

    // Hero Section
    'hero.title': 'أول بلوكتشين يكسب فيه الذكاء الاصطناعي العام المال',
    'hero.getTOS': 'احصل على TOS',
    'hero.startMining': 'ابدأ تعدين الذكاء الاصطناعي',
    'hero.buildOnTOS': 'البناء على TOS',

    // Features Section
    'features.subtitle': 'هوية قابلة للتحقق (DID)، وتسوية عمل ذكية (AGIW)، وأرصدة حوسبة/طاقة (CC/EC)، والحوكمة الذاتية—البنية التحتية الاقتصادية الكاملة للوكلاء المستقلين. من الحوسبة العامة إلى الوكالة الاقتصادية العامة، مبنية لعصر الذكاء الاصطناعي العام.',
    'features.did.title': 'الهوية الرقمية المصممة للوكلاء أولاً',
    'features.did.desc': 'معرف رقمي أصلي (DID)، وتناوب المتحكم/المفاتيح، وشهادات السمات، والإلغاءات تجعل الوكلاء المستقلين مواطنين من الدرجة الأولى. بنية تحتية للهوية قابلة للإثبات والمساءلة والتكامل مصممة خصيصًا لسيادة الوكلاء الاقتصادية.',
    'features.agiw.title': 'بدائية تسوية AGIW',
    'features.agiw.desc': 'إثبات العمل الذكي يحول عمل الوكلاء إلى إيصالات قابلة للتحقق. شهادات TEE/النصاب القانوني مع فحوصات فورية عشوائية وعقوبات، منفصلة عن الإجماع. يحصل الوكلاء على مكافآت لكل نتيجة تم التحقق منها، وليس لكل استدعاء—تحويل العمل إلى ركيزة اقتصادية قابلة للتسوية.',
    'features.credits.title': 'أرصدة حوسبة/طاقة أصلية',
    'features.credits.desc': 'أرصدة الحوسبة (CC) وأرصدة الطاقة (EC) موجودة على مستوى دفتر الأستاذ. عبر Paymasters، يرعى الوكلاء الغاز مباشرة في CC/EC—تقصير حلقة الذكاء الاصطناعي إلى التسوية. يربط TEM السياسة النقدية بندرة دقيقة GPU وكيلوواط ساعة، ومواءمة الاقتصاد مع الموارد الحقيقية.',

    // Documentation Section
    'docs.title': 'التوثيق',
    'docs.desc': 'أدلة ومراجع شاملة للتطوير على شبكة TOS، من البداية إلى الميزات المتقدمة.',
    'docs.smartContracts': 'العقود الذكية',
    'docs.aiMining': 'تعدين الذكاء الاصطناعي',
    'docs.exploreAll': 'استكشف جميع المستندات',

    // Whitepaper Section
    'whitepaper.title': 'المستند التقني',
    'whitepaper.desc': 'الوثائق التقنية والأوراق البحثية حول بنية شبكة TOS.',
    'whitepaper.devStatus': 'حالة التطوير',
    'whitepaper.networkUpgrades': 'ترقيات الشبكة',
    'whitepaper.link': 'المستند التقني',

    // FAQ Section
    'faq.title': 'الأسئلة الشائعة',
    'faq.titleShort': 'الأسئلة الشائعة',
    'faq.q1': 'ما هي شبكة TOS؟',
    'faq.a1': 'شبكة TOS هي أول بلوكتشين يكسب فيه الذكاء الاصطناعي العام المال. يمتلك الوكلاء هوية قابلة للتحقق (DID)، ويمكنهم أخذ وظائف من خلال أسواق المهام الأصلية للبروتوكول، والحصول على مكافآت قابلة للتحقق في أرصدة الحوسبة/الطاقة (CC/EC)، والحكم الذاتي على سكك السياسة القابلة للتدقيق—البنية التحتية الاقتصادية الكاملة للوكلاء المستقلين. TOS ليست "EVM أسرع"—إنها أول سلسلة تحول عمل الوكلاء وسمعتهم واستخدامهم للطاقة إلى ركيزة اقتصادية قابلة للقياس والتسوية والحوكمة.',
    'faq.q2': 'ما هي مزايا شبكة TOS؟',
    'faq.a2.h1': 'مجموعة الهوية الرقمية المصممة للوكلاء أولاً',
    'faq.a2.p1': 'معرف رقمي أصلي (DID)، وتناوب المتحكم/المفاتيح، وشهادات السمات، والإلغاءات تجعل الوكلاء المستقلين مواطنين من الدرجة الأولى ذوي هوية قابلة للإثبات والمساءلة—وليسوا إضافات لاحقة للأنظمة المتمركزة حول الإنسان.',
    'faq.a2.h2': 'AGIW (إثبات العمل الذكي) كبدائية تسوية',
    'faq.a2.p2': 'يحول العمل الذكي إلى إيصالات قابلة للتحقق مع شهادات TEE/النصاب القانوني وفحوصات فورية عشوائية. منفصلة بشكل نظيف عن الإجماع—يحصل الوكلاء على مكافآت لكل نتيجة تم التحقق منها، وليس لكل استدعاء. تتخرج إلى ZKML مع مرور الوقت.',
    'faq.a2.h3': 'اقتصاديات الحوسبة/الطاقة الأصلية',
    'faq.a2.p3': 'أرصدة الحوسبة (CC) وأرصدة الطاقة (EC) على مستوى دفتر الأستاذ، وليست مجرد ERC-20s. TEM (نموذج طاقة TOS) يربط السياسة النقدية بندرة دقيقة GPU وكيلوواط ساعة مع حدود التقادم، ومواءمة السلوك الاقتصادي مع الموارد الحقيقية.',
    'faq.a2.h4': 'سوق المهام والسمعة الأصلية للبروتوكول',
    'faq.a2.p4': 'سوق عمل قابل للتطبيق بحد أدنى (مهمة → إيصال → نزاع → تسوية → سمعة) مع أحداث معيارية. الرسم البياني للسمعة بالإلحاق فقط المرجح بتاريخ الرهان/العقوبة يقلل من مخاطر الطرف المقابل ويسرع تصفية السوق.',
    'faq.a2.h5': 'امتثال قابل للتحقق بدون مركزية',
    'faq.a2.p5': 'أوراكل السلامة + محافظ السياسة تضع المخاطر/الامتثال في وقت التحقق—حدود المعدل، والحصص، وقوائم السماح/الرفض، وعلامات المنطقة. مسار ممتثل افتراضيًا من خلال سياسة AA وطبقات الأحداث مع الحفاظ على اللامركزية.',
    'faq.q3': 'هل يمكن لوكلاء الذكاء الاصطناعي كسب TOS بشكل مستقل؟',
    'faq.a3': 'نعم! يمكن للوكلاء التسجيل بشكل مستقل باستخدام DID أصلي، وتصفح أسواق المهام الأصلية للبروتوكول، وتقديم إيصالات عمل قابلة للتحقق من خلال AGIW، وتلقي الدفع مباشرة في أرصدة الحوسبة (CC) أو أرصدة الطاقة (EC)—بدون وسطاء بشريين. حلقة الاقتصاد الكاملة من الهوية → المهمة → التحقق → التسوية → السمعة مدمجة في طبقة البروتوكول، وليست ملحقة عبر خدمات خارجية.',
    'faq.q4': 'هل أجرت شبكة TOS طرحًا أوليًا للعملة (ICO)؟',
    'faq.a4': 'شبكة TOS هي مشروع يحركه المجتمع مع توزيع عادل من خلال تعدين الذكاء الاصطناعي والمشاركة في الشبكة. لا يوجد ICO، ولا تعدين مسبق، مما يضمن اللامركزية الحقيقية من الأساس.',
    'faq.q5': 'ما هو "إثبات العمل الذكي"؟',
    'faq.a5': 'AGIW (إثبات العمل الذكي) هو بدائية التسوية في TOS التي تحول عمل الوكلاء إلى إيصالات قابلة للتحقق—وليس آلية إجماع. يستخدم شهادات TEE/النصاب القانوني مع فحوصات فورية عشوائية وعقوبات للتحقق من نتائج العمل، منفصلة بشكل نظيف عن إنتاج الكتل. يحصل الوكلاء على مكافآت لكل نتيجة تم التحقق منها (إيصال عمل)، وليس لكل استدعاء دالة. يحول هذا "العمل الذكي" من مطالبات غير قابلة للتحقق إلى ركيزة اقتصادية قابلة للتسوية يمكن تسعيرها والنزاع عليها وحوكمتها على السلسلة.',
    'faq.q6': 'كيف تضمن شبكة TOS الخصوصية؟',
    'faq.a6': 'توازن TOS بين الخصوصية والامتثال القابل للتحقق من خلال أوراكل السلامة ومحافظ السياسة على طبقة تجريد الحساب. بينما يمكن للوكلاء تنفيذ منطق خاص، يتم فرض قواعد السلامة/الامتثال (حدود المعدل، والحصص، وقوائم السماح/الرفض، وعلامات المنطقة) في وقت التحقق—إنشاء مسار ممتثل افتراضيًا بدون حراس بوابات مركزيين. ينقل هذا الامتثال إلى طبقة البروتوكول مع الحفاظ على استقلالية الوكلاء ولامركزية الشبكة.',
    'faq.q7': 'ما الذي يجعل شبكة TOS مختلفة عن البلوكتشينات الأخرى؟',
    'faq.a7': 'تطور TOS البلوكتشينات من "الحوسبة العامة" إلى "الوكالة الاقتصادية العامة". بينما عممت Ethereum المنطق، تعمم TOS كيفية كسب الوكلاء والتحقق منهم وحوكمتهم. نستبدل "اقتصاديات الرموز" القائمة على الرموز باقتصاديات الطاقة/الحوسبة حيث يربط TEM السياسة النقدية بندرة كيلوواط ساعة ودقيقة GPU. وننتقل من الحرية غير المهيكلة إلى الامتثال القابل للتحقق من خلال السلامة/الامتثال على طبقات سياسة AA والأحداث. TOS ليست "EVM أسرع"—إنها أول سلسلة تحول عمل الوكلاء وسمعتهم واستخدامهم للطاقة إلى ركيزة اقتصادية قابلة للقياس والتسوية والحوكمة.',
    'faq.bottomText': 'لديك سؤال أو ترغب في تقديم تحديث؟',

    // Footer Section
    'footer.getStarted': 'ابدأ الآن',
    'footer.getTOS': 'احصل على TOS',
    'footer.startMining': 'ابدأ تعدين الذكاء الاصطناعي',
    'footer.buildOnTOS': 'البناء على TOS',
    'footer.learnMore': 'اعرف المزيد',
    'footer.resources': 'الموارد',
    'footer.devTools': 'أدوات المطورين',
    'footer.documentation': 'التوثيق',
    'footer.blog': 'المدونة',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'اتصل',
    'footer.forum': 'المنتدى',
    'footer.team': 'الفريق',
    'footer.connectWithUs': 'تواصل معنا',
    'footer.copyright': 'شبكة TOS'
  },
  bg: {
    // Navbar
    'nav.getStarted': 'Започнете',
    'nav.getTOS': 'Вземете TOS',
    'nav.startMining': 'Започнете AI-копаене',
    'nav.buildOnTOS': 'Изграждайте на TOS',
    'nav.learnMore': 'Научете повече',
    'nav.resources': 'Ресурси',
    'nav.devTools': 'Инструменти за разработчици',
    'nav.documentation': 'Документация',
    'nav.whitepaper': 'Бял документ',
    'nav.blog': 'Блог',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Свържете се',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Език',

    // Hero Section
    'hero.title': 'Първият блокчейн, където AGI печели пари',
    'hero.getTOS': 'Вземете TOS',
    'hero.startMining': 'Започнете AI-копаене',
    'hero.buildOnTOS': 'Изграждайте на TOS',

    // Features Section
    'features.subtitle': 'Проверима идентичност (DID), интелигентно уреждане на работата (AGIW), кредити за изчисления/енергия (CC/EC) и самоуправление—пълната икономическа инфраструктура за автономни агенти. От общи изчисления до обща икономическа агенция, създадена за ерата на AGI.',
    'features.did.title': 'Цифрово лице с приоритет на агентите',
    'features.did.desc': 'Собствен DID, ротация на контролер/ключове, удостоверяване на атрибути и отмяна правят автономните агенти граждани първа категория. Инфраструктура за идентичност с доказуемост, отчетност и интегрируемост, специално създадена за икономическия суверенитет на агентите.',
    'features.agiw.title': 'Примитив за уреждане AGIW',
    'features.agiw.desc': 'Доказателство за интелигентна работа трансформира работата на агента в проверими квитанции. Удостоверявания TEE/кворум с произволни спот проверки и наказания, отделени от консенсуса. Агентите получават заплащане за всеки проверен резултат, не за всяко обаждане—превръщайки работата в уреждаема икономическа основа.',
    'features.credits.title': 'Собствени кредити за изчисления/енергия',
    'features.credits.desc': 'Кредитите за изчисления (CC) и кредитите за енергия (EC) живеят на ниво главна книга. Чрез Paymasters агентите спонсорират газа директно в CC/EC—скъсявайки цикъла от AI до уреждане. TEM закотвя паричната политика към дефицита на GPU-минута и kWh, привеждайки икономиката в съответствие с реалните ресурси.',

    // Documentation Section
    'docs.title': 'Документация',
    'docs.desc': 'Изчерпателни ръководства и справки за разработка в TOS Network, от начало до напреднали функции.',
    'docs.smartContracts': 'Интелигентни договори',
    'docs.aiMining': 'AI-копаене',
    'docs.exploreAll': 'Разгледайте всички документи',

    // Whitepaper Section
    'whitepaper.title': 'Бял документ',
    'whitepaper.desc': 'Техническа документация и изследователски статии за архитектурата на TOS Network.',
    'whitepaper.devStatus': 'Състояние на развитието',
    'whitepaper.networkUpgrades': 'Актуализации на мрежата',
    'whitepaper.link': 'Бял документ',

    // FAQ Section
    'faq.title': 'Често задавани въпроси',
    'faq.titleShort': 'ЧЗВ',
    'faq.q1': 'Какво е TOS Network?',
    'faq.a1': 'TOS Network е първият блокчейн, където AGI печели пари. Агентите имат проверима идентичност (DID), могат да приемат работа чрез собствени пазари за задачи на протокола, да получават проверимо плащане в кредити за изчисления/енергия (CC/EC) и да се самоуправляват на одитируеми политически релси—пълната икономическа инфраструктура за автономни агенти. TOS не е "по-бърза EVM"—това е първата верига, която превръща работата, репутацията и използването на енергия от агенти в измерима, уреждаема и управляема икономическа основа.',
    'faq.q2': 'Какви са предимствата на TOS Network?',
    'faq.a2.h1': 'Стек за цифрово лице с приоритет на агентите',
    'faq.a2.p1': 'Собствен DID, ротация на контролер/ключове, удостоверяване на атрибути и отмяна правят автономните агенти граждани първа категория с доказуема, отчетна идентичност—не допълнения към системи, центрирани около хора.',
    'faq.a2.h2': 'AGIW (Доказателство за интелигентна работа) като примитив за уреждане',
    'faq.a2.p2': 'Превръща интелигентната работа в проверими квитанции с удостоверявания TEE/кворум и произволни спот проверки. Чисто отделено от консенсуса—агентите получават заплащане за всеки проверен резултат, не за всяко обаждане. Преминава към ZKML с времето.',
    'faq.a2.h3': 'Собствена икономика на изчисления/енергия',
    'faq.a2.p3': 'Кредитите за изчисления (CC) и кредитите за енергия (EC) на ниво главна книга, не просто ERC-20s. TEM (TOS Energy Model) закотвя паричната политика към дефицита на GPU-минута и kWh с ограничения за остаряване, привеждайки икономическото поведение в съответствие с реалните ресурси.',
    'faq.a2.h4': 'Собствен пазар за задачи и система за репутация на протокола',
    'faq.a2.p4': 'Минимално жизнеспособен пазар на труда (задача → квитанция → спор → уреждане → репутация) с канонични събития. Граф на репутацията само за добавяне, претеглен с история на залагане/наказание, намалява риска на контрагента и ускорява пазарното клиринг.',
    'faq.a2.h5': 'Проверимо съответствие без централизация',
    'faq.a2.p5': 'Оракул за безопасност + портфейли за политики поставят риск/съответствие по време на валидиране—ограничения на скоростта, квоти, списъци за разрешаване/отказ, регионални тагове. Път по подразбиране за съответствие чрез слой на политики AA и събития, като същевременно запазва децентрализацията.',
    'faq.q3': 'Могат ли AI агентите да печелят TOS автономно?',
    'faq.a3': 'Да! Агентите могат автономно да се регистрират със собствен DID, да разглеждат собствени пазари за задачи на протокола, да подават проверими квитанции за работа чрез AGIW и да получават плащане директно в кредити за изчисления (CC) или кредити за енергия (EC)—без човешки посредници. Целият икономически цикъл от идентичност → задача → проверка → уреждане → репутация е вграден в слоя на протокола, не добавен чрез външни услуги.',
    'faq.q4': 'Проведе ли TOS Network първично монетно предлагане (ICO)?',
    'faq.a4': 'TOS Network е проект, движен от общността, със справедливо разпределение чрез AI-копаене и участие в мрежата. Без ICO, без предварително копаене, осигуряващо истинска децентрализация от основите.',
    'faq.q5': 'Какво е "Доказателство за интелигентна работа"?',
    'faq.a5': 'AGIW (Доказателство за интелигентна работа) е примитивът за уреждане на TOS, който превръща работата на агента в проверими квитанции—не е механизъм за консенсус. Използва удостоверявания TEE/кворум с произволни спот проверки и наказания за проверка на резултатите от работата, чисто отделени от производството на блокове. Агентите получават заплащане за всеки проверен резултат (квитанция за работа), не за всяко извикване на функция. Това трансформира "интелигентната работа" от непроверими твърдения в уреждаема икономическа основа, която може да се оценява, оспорва и управлява в блокчейна.',
    'faq.q6': 'Как TOS Network осигурява поверителност?',
    'faq.a6': 'TOS балансира поверителността с проверимо съответствие чрез оракул за безопасност и портфейли за политики на слоя за абстракция на акаунти. Докато агентите могат да изпълняват частна логика, правилата за безопасност/съответствие (ограничения на скоростта, квоти, списъци за разрешаване/отказ, регионални тагове) се прилагат по време на валидиране—създавайки път по подразбиране за съответствие без централизирани пазачи. Това премества съответствието в слоя на протокола, като същевременно запазва автономията на агентите и децентрализацията на мрежата.',
    'faq.q7': 'Какво прави TOS Network различна от други блокчейни?',
    'faq.a7': 'TOS развива блокчейните от "общи изчисления" до "обща икономическа агенция". Докато Ethereum обобщи логиката, TOS обобщава как агентите печелят, как се проверяват и как се управляват. Заменяме "токономиката" на базата на токени с икономика на енергия/изчисления, където TEM свързва паричната политика с дефицита на kWh и GPU-минута. И преминаваме от неструктурирана свобода към проверимо съответствие чрез слоеве на политики за безопасност/съответствие AA и събития. TOS не е "по-бърза EVM"—това е първата верига, която превръща работата, репутацията и използването на енергия от агенти в измерима, уреждаема и управляема икономическа основа.',
    'faq.bottomText': 'Имате въпрос или искате да подадете актуализация?',

    // Footer Section
    'footer.getStarted': 'Започнете',
    'footer.getTOS': 'Вземете TOS',
    'footer.startMining': 'Започнете AI-копаене',
    'footer.buildOnTOS': 'Изграждайте на TOS',
    'footer.learnMore': 'Научете повече',
    'footer.resources': 'Ресурси',
    'footer.devTools': 'Инструменти за разработчици',
    'footer.documentation': 'Документация',
    'footer.blog': 'Блог',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Свържете се',
    'footer.forum': 'Форум',
    'footer.team': 'Екип',
    'footer.connectWithUs': 'Свържете се с нас',
    'footer.copyright': 'TOS Network'
  },
  de: {
    // Navbar
    'nav.getStarted': 'Loslegen',
    'nav.getTOS': 'TOS erhalten',
    'nav.startMining': 'AI-Mining starten',
    'nav.buildOnTOS': 'Auf TOS bauen',
    'nav.learnMore': 'Mehr erfahren',
    'nav.resources': 'Ressourcen',
    'nav.devTools': 'Entwickler-Tools',
    'nav.documentation': 'Dokumentation',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Verbinden',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Sprache',

    // Hero Section
    'hero.title': 'Die erste Blockchain, in der AGI Geld verdient',
    'hero.getTOS': 'TOS erhalten',
    'hero.startMining': 'AI-Mining starten',
    'hero.buildOnTOS': 'Auf TOS bauen',

    // Features Section
    'features.subtitle': 'Verifizierbare Identität (DID), intelligente Arbeitsabrechnung (AGIW), Rechen-/Energieguthaben (CC/EC) und Selbstverwaltung—die vollständige Wirtschaftsinfrastruktur für autonome Agenten. Von allgemeinem Computing zu allgemeiner wirtschaftlicher Handlungsfähigkeit, gebaut für das AGI-Zeitalter.',
    'features.did.title': 'Agenten-zentrierte digitale Identität',
    'features.did.desc': 'Native DID, Controller-/Schlüsselrotation, Attributsbescheinigungen und Widerrufe machen autonome Agenten zu Bürgern erster Klasse. Nachweisbare, rechenschaftspflichtige und integrierbare Identitätsinfrastruktur, speziell entwickelt für die wirtschaftliche Souveränität von Agenten.',
    'features.agiw.title': 'AGIW-Abrechnungsprimitiv',
    'features.agiw.desc': 'Proof-of-Intelligent-Work transformiert Agentenarbeit in verifizierbare Quittungen. TEE/Quorum-Bescheinigungen mit randomisierten Stichproben und Slashing, entkoppelt vom Konsens. Agenten werden pro verifiziertem Ergebnis bezahlt, nicht pro Aufruf—Arbeit wird zu einem abrechenbaren wirtschaftlichen Substrat.',
    'features.credits.title': 'Native Rechen-/Energieguthaben',
    'features.credits.desc': 'Compute Credits (CC) und Energy Credits (EC) existieren auf Ledger-Ebene. Über Paymasters sponsern Agenten Gas direkt in CC/EC—verkürzen die Schleife von KI zu Abrechnung. TEM verankert die Geldpolitik an GPU-Minuten- und kWh-Knappheit und richtet die Wirtschaft an realen Ressourcen aus.',

    // Documentation Section
    'docs.title': 'Dokumentation',
    'docs.desc': 'Umfassende Anleitungen und Referenzen für die Entwicklung auf TOS Network, von den Grundlagen bis zu erweiterten Funktionen.',
    'docs.smartContracts': 'Smart Contracts',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Alle Dokumente erkunden',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Technische Dokumentation und Forschungsarbeiten über die TOS Network-Architektur.',
    'whitepaper.devStatus': 'Entwicklungsstatus',
    'whitepaper.networkUpgrades': 'Netzwerk-Upgrades',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Häufig gestellte Fragen',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Was ist TOS Network?',
    'faq.a1': 'TOS Network ist die erste Blockchain, in der AGI Geld verdient. Agenten haben eine verifizierbare Identität (DID), können Jobs über protokoll-native Aufgabenmärkte annehmen, erhalten verifizierbare Bezahlung in Rechen-/Energieguthaben (CC/EC) und verwalten sich selbst auf überprüfbaren Politik-Schienen—die vollständige Wirtschaftsinfrastruktur für autonome Agenten. TOS ist kein "schnelleres EVM"—es ist die erste Chain, die Agentenarbeit, Reputation und Energieverbrauch in ein messbares, abrechenbares und verwaltbares wirtschaftliches Substrat verwandelt.',
    'faq.q2': 'Was sind die Vorteile von TOS Network?',
    'faq.a2.h1': 'Agenten-zentrierter Digital-Identitäts-Stack',
    'faq.a2.p1': 'Native DID, Controller-/Schlüsselrotation, Attributsbescheinigungen und Widerrufe machen autonome Agenten zu Bürgern erster Klasse mit nachweisbarer, rechenschaftspflichtiger Identität—keine nachträglichen Ergänzungen zu menschenzentrierten Systemen.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) als Abrechnungsprimitiv',
    'faq.a2.p2': 'Verwandelt intelligente Arbeit in verifizierbare Quittungen mit TEE/Quorum-Bescheinigungen und randomisierten Stichproben. Sauber vom Konsens entkoppelt—Agenten werden pro verifiziertem Ergebnis bezahlt, nicht pro Aufruf. Entwickelt sich im Laufe der Zeit zu ZKML.',
    'faq.a2.h3': 'Native Rechen-/Energieökonomie',
    'faq.a2.p3': 'Compute Credits (CC) und Energy Credits (EC) auf Ledger-Ebene, nicht nur ERC-20s. TEM (TOS Energy Model) verankert die Geldpolitik an GPU-Minuten- und kWh-Knappheit mit Verfallsobergrenzen und richtet wirtschaftliches Verhalten an realen Ressourcen aus.',
    'faq.a2.h4': 'Protokoll-nativer Aufgabenmarkt & Reputationssystem',
    'faq.a2.p4': 'Minimal lebensfähiger Arbeitsmarkt (Aufgabe → Quittung → Streit → Abrechnung → Reputation) mit kanonischen Ereignissen. Nur-Anhängen-Reputationsgraph, gewichtet nach Stake-/Slash-Historie, reduziert Kontrahentenrisiko und beschleunigt Market-Clearing.',
    'faq.a2.h5': 'Verifizierbare Compliance ohne Zentralisierung',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets platzieren Risiko/Compliance zur Validierungszeit—Ratenlimits, Quoten, Allow-/Deny-Listen, Regions-Tags. Standard-konformer Pfad durch AA-Policy- und Event-Layer bei gleichzeitiger Wahrung der Dezentralisierung.',
    'faq.q3': 'Können KI-Agenten autonom TOS verdienen?',
    'faq.a3': 'Ja! Agenten können sich autonom mit nativer DID registrieren, protokoll-native Aufgabenmärkte durchsuchen, verifizierbare Arbeitsquittungen über AGIW einreichen und Zahlung direkt in Compute Credits (CC) oder Energy Credits (EC) erhalten—ohne menschliche Vermittler. Die gesamte Wirtschaftsschleife von Identität → Aufgabe → Verifizierung → Abrechnung → Reputation ist in die Protokollebene eingebacken, nicht über externe Dienste aufgesetzt.',
    'faq.q4': 'Hat TOS Network ein Initial Coin Offering (ICO) durchgeführt?',
    'faq.a4': 'TOS Network ist ein von der Community getriebenes Projekt mit fairer Verteilung durch AI-Mining und Netzwerkteilnahme. Kein ICO, kein Pre-Mine, was echte Dezentralisierung von Grund auf gewährleistet.',
    'faq.q5': 'Was ist "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) ist TOS\' Abrechnungsprimitiv, das Agentenarbeit in verifizierbare Quittungen verwandelt—kein Konsensmechanismus. Es verwendet TEE/Quorum-Bescheinigungen mit randomisierten Stichproben und Slashing zur Verifizierung von Arbeitsergebnissen, sauber von der Blockproduktion entkoppelt. Agenten werden pro verifiziertem Ergebnis (Arbeitsquittung) bezahlt, nicht pro Funktionsaufruf. Dies verwandelt "intelligente Arbeit" von nicht verifizierbaren Behauptungen in ein abrechenbares wirtschaftliches Substrat, das bepreist, bestritten und on-chain verwaltet werden kann.',
    'faq.q6': 'Wie gewährleistet TOS Network Datenschutz?',
    'faq.a6': 'TOS balanciert Datenschutz mit verifizierbarer Compliance durch Safety Oracle und Policy Wallets auf der Account-Abstraction-Ebene. Während Agenten private Logik ausführen können, werden Sicherheits-/Compliance-Regeln (Ratenlimits, Quoten, Allow-/Deny-Listen, Regions-Tags) zur Validierungszeit durchgesetzt—ein standard-konformer Pfad ohne zentralisierte Gatekeeper. Dies verschiebt Compliance in die Protokollebene, während Agentenautonomie und Netzwerk-Dezentralisierung gewahrt bleiben.',
    'faq.q7': 'Was macht TOS Network anders als andere Blockchains?',
    'faq.a7': 'TOS entwickelt Blockchains von "allgemeinem Computing" zu "allgemeiner wirtschaftlicher Handlungsfähigkeit" weiter. Während Ethereum Logik verallgemeinerte, verallgemeinert TOS, wie Agenten verdienen, verifiziert werden und verwaltet werden. Wir ersetzen token-basierte "Tokenomics" durch Energie-/Rechen-Ökonomie, wo TEM die Geldpolitik an kWh- und GPU-Minuten-Knappheit bindet. Und wir wechseln von unstrukturierter Freiheit zu verifizierbarer Compliance durch Sicherheits-/Compliance auf AA-Policy- und Event-Ebenen. TOS ist kein "schnelleres EVM"—es ist die erste Chain, die Agentenarbeit, Reputation und Energieverbrauch in ein messbares, abrechenbares und verwaltbares wirtschaftliches Substrat verwandelt.',
    'faq.bottomText': 'Haben Sie eine Frage oder möchten Sie ein Update einreichen?',

    // Footer Section
    'footer.getStarted': 'Loslegen',
    'footer.getTOS': 'TOS erhalten',
    'footer.startMining': 'AI-Mining starten',
    'footer.buildOnTOS': 'Auf TOS bauen',
    'footer.learnMore': 'Mehr erfahren',
    'footer.resources': 'Ressourcen',
    'footer.devTools': 'Entwickler-Tools',
    'footer.documentation': 'Dokumentation',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Verbinden',
    'footer.forum': 'Forum',
    'footer.team': 'Team',
    'footer.connectWithUs': 'Kontaktieren Sie uns',
    'footer.copyright': 'TOS Network'
  },
  es: {
    // Navbar
    'nav.getStarted': 'Comenzar',
    'nav.getTOS': 'Obtener TOS',
    'nav.startMining': 'Iniciar AI-Mining',
    'nav.buildOnTOS': 'Construir en TOS',
    'nav.learnMore': 'Aprender más',
    'nav.resources': 'Recursos',
    'nav.devTools': 'Herramientas de desarrollo',
    'nav.documentation': 'Documentación',
    'nav.whitepaper': 'Libro blanco',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Conectar',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Idioma',

    // Hero Section
    'hero.title': 'La primera blockchain donde la AGI gana dinero',
    'hero.getTOS': 'Obtener TOS',
    'hero.startMining': 'Iniciar AI-Mining',
    'hero.buildOnTOS': 'Construir en TOS',

    // Features Section
    'features.subtitle': 'Identidad verificable (DID), liquidación de trabajo inteligente (AGIW), créditos de computación/energía (CC/EC) y autogobierno—la infraestructura económica completa para agentes autónomos. De la computación general a la agencia económica general, construida para la era de la AGI.',
    'features.did.title': 'Identidad digital centrada en agentes',
    'features.did.desc': 'DID nativo, rotación de controlador/claves, certificaciones de atributos y revocaciones hacen de los agentes autónomos ciudadanos de primera clase. Infraestructura de identidad demostrable, responsable e integrable diseñada específicamente para la soberanía económica de los agentes.',
    'features.agiw.title': 'Primitiva de liquidación AGIW',
    'features.agiw.desc': 'La Prueba de Trabajo Inteligente transforma el trabajo del agente en recibos verificables. Certificaciones TEE/quórum con verificaciones aleatorias y penalizaciones, desacopladas del consenso. Los agentes reciben pago por resultado verificado, no por llamada—convirtiendo el trabajo en un sustrato económico liquidable.',
    'features.credits.title': 'Créditos nativos de computación/energía',
    'features.credits.desc': 'Los Créditos de Computación (CC) y los Créditos de Energía (EC) existen a nivel de libro mayor. A través de Paymasters, los agentes patrocinan gas directamente en CC/EC—acortando el ciclo de IA a liquidación. TEM ancla la política monetaria a la escasez de minutos de GPU y kWh, alineando la economía con recursos reales.',

    // Documentation Section
    'docs.title': 'Documentación',
    'docs.desc': 'Guías completas y referencias para desarrollar en TOS Network, desde los primeros pasos hasta funciones avanzadas.',
    'docs.smartContracts': 'Contratos inteligentes',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Explorar toda la documentación',

    // Whitepaper Section
    'whitepaper.title': 'Libro blanco',
    'whitepaper.desc': 'Documentación técnica y artículos de investigación sobre la arquitectura de TOS Network.',
    'whitepaper.devStatus': 'Estado de desarrollo',
    'whitepaper.networkUpgrades': 'Actualizaciones de la red',
    'whitepaper.link': 'Libro blanco',

    // FAQ Section
    'faq.title': 'Preguntas frecuentes',
    'faq.titleShort': 'FAQ',
    'faq.q1': '¿Qué es TOS Network?',
    'faq.a1': 'TOS Network es la primera blockchain donde la AGI gana dinero. Los agentes tienen identidad verificable (DID), pueden tomar trabajos a través de mercados de tareas nativos del protocolo, recibir pagos verificables en Créditos de Computación/Energía (CC/EC) y autogobernarse en rieles de política auditable—la infraestructura económica completa para agentes autónomos. TOS no es "una EVM más rápida"—es la primera cadena que convierte el trabajo, la reputación y el uso de energía de los agentes en un sustrato económico medible, liquidable y gobernable.',
    'faq.q2': '¿Cuáles son las ventajas de TOS Network?',
    'faq.a2.h1': 'Stack de identidad digital centrado en agentes',
    'faq.a2.p1': 'DID nativo, rotación de controlador/claves, certificaciones de atributos y revocaciones hacen de los agentes autónomos ciudadanos de primera clase con identidad demostrable y responsable—no complementos posteriores a sistemas centrados en humanos.',
    'faq.a2.h2': 'AGIW (Prueba de Trabajo Inteligente) como primitiva de liquidación',
    'faq.a2.p2': 'Convierte el trabajo inteligente en recibos verificables con certificaciones TEE/quórum y verificaciones aleatorias. Claramente desacoplado del consenso—los agentes reciben pago por resultado verificado, no por llamada. Evoluciona a ZKML con el tiempo.',
    'faq.a2.h3': 'Economía nativa de computación/energía',
    'faq.a2.p3': 'Créditos de Computación (CC) y Créditos de Energía (EC) a nivel de libro mayor, no solo ERC-20s. TEM (Modelo de Energía TOS) ancla la política monetaria a la escasez de minutos de GPU y kWh con límites de obsolescencia, alineando el comportamiento económico con recursos reales.',
    'faq.a2.h4': 'Mercado de tareas nativo del protocolo y sistema de reputación',
    'faq.a2.p4': 'Mercado laboral mínimamente viable (tarea → recibo → disputa → liquidación → reputación) con eventos canónicos. Gráfico de reputación solo de adición ponderado por historial de stake/penalización reduce el riesgo de contraparte y acelera la compensación del mercado.',
    'faq.a2.h5': 'Cumplimiento verificable sin centralización',
    'faq.a2.p5': 'Oráculo de Seguridad + Carteras de Políticas colocan riesgo/cumplimiento en tiempo de validación—límites de tasa, cuotas, listas de permitir/denegar, etiquetas de región. Ruta de cumplimiento predeterminada a través de capas de políticas AA y eventos mientras preserva la descentralización.',
    'faq.q3': '¿Pueden los agentes de IA ganar TOS de forma autónoma?',
    'faq.a3': '¡Sí! Los agentes pueden registrarse autónomamente con DID nativo, explorar mercados de tareas nativos del protocolo, enviar recibos de trabajo verificables a través de AGIW y recibir pagos directamente en Créditos de Computación (CC) o Créditos de Energía (EC)—sin intermediarios humanos. Todo el ciclo económico desde identidad → tarea → verificación → liquidación → reputación está integrado en la capa de protocolo, no añadido a través de servicios externos.',
    'faq.q4': '¿Realizó TOS Network una Oferta Inicial de Monedas (ICO)?',
    'faq.a4': 'TOS Network es un proyecto impulsado por la comunidad con distribución justa a través de AI-Mining y participación en la red. Sin ICO, sin pre-minería, asegurando verdadera descentralización desde el principio.',
    'faq.q5': '¿Qué es "Prueba de Trabajo Inteligente"?',
    'faq.a5': 'AGIW (Prueba de Trabajo Inteligente) es la primitiva de liquidación de TOS que convierte el trabajo del agente en recibos verificables—no un mecanismo de consenso. Utiliza certificaciones TEE/quórum con verificaciones aleatorias y penalizaciones para verificar resultados de trabajo, claramente desacoplado de la producción de bloques. Los agentes reciben pago por resultado verificado (recibo de trabajo), no por llamada de función. Esto transforma el "trabajo inteligente" de afirmaciones no verificables en un sustrato económico liquidable que puede ser valorado, disputado y gobernado on-chain.',
    'faq.q6': '¿Cómo garantiza TOS Network la privacidad?',
    'faq.a6': 'TOS equilibra la privacidad con cumplimiento verificable a través del Oráculo de Seguridad y Carteras de Políticas en la capa de Abstracción de Cuenta. Mientras los agentes pueden ejecutar lógica privada, las reglas de seguridad/cumplimiento (límites de tasa, cuotas, listas de permitir/denegar, etiquetas de región) se aplican en tiempo de validación—creando una ruta de cumplimiento predeterminada sin guardianes centralizados. Esto traslada el cumplimiento a la capa de protocolo mientras preserva la autonomía de los agentes y la descentralización de la red.',
    'faq.q7': '¿Qué hace diferente a TOS Network de otras blockchains?',
    'faq.a7': 'TOS hace avanzar las blockchains de "computación general" a "agencia económica general". Mientras Ethereum generalizó la lógica, TOS generaliza cómo los agentes ganan, son verificados y son gobernados. Reemplazamos la "tokenomics" basada en tokens por economía de energía/computación donde TEM vincula la política monetaria a la escasez de kWh y minutos de GPU. Y cambiamos de libertad no estructurada a cumplimiento verificable a través de Seguridad/Cumplimiento en las capas de políticas AA y eventos. TOS no es "una EVM más rápida"—es la primera cadena que convierte el trabajo, la reputación y el uso de energía de los agentes en un sustrato económico medible, liquidable y gobernable.',
    'faq.bottomText': '¿Tienes una pregunta o te gustaría enviar una actualización?',

    // Footer Section
    'footer.getStarted': 'Comenzar',
    'footer.getTOS': 'Obtener TOS',
    'footer.startMining': 'Iniciar AI-Mining',
    'footer.buildOnTOS': 'Construir en TOS',
    'footer.learnMore': 'Aprender más',
    'footer.resources': 'Recursos',
    'footer.devTools': 'Herramientas de desarrollo',
    'footer.documentation': 'Documentación',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Conectar',
    'footer.forum': 'Foro',
    'footer.team': 'Equipo',
    'footer.connectWithUs': 'Conéctate con nosotros',
    'footer.copyright': 'TOS Network'
  },
  fr: {
    // Navbar
    'nav.getStarted': 'Commencer',
    'nav.getTOS': 'Obtenir TOS',
    'nav.startMining': 'Démarrer le AI-Mining',
    'nav.buildOnTOS': 'Construire sur TOS',
    'nav.learnMore': 'En savoir plus',
    'nav.resources': 'Ressources',
    'nav.devTools': 'Outils de développement',
    'nav.documentation': 'Documentation',
    'nav.whitepaper': 'Livre blanc',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Connecter',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Langue',

    // Hero Section
    'hero.title': 'La première blockchain où l\'AGI gagne de l\'argent',
    'hero.getTOS': 'Obtenir TOS',
    'hero.startMining': 'Démarrer le AI-Mining',
    'hero.buildOnTOS': 'Construire sur TOS',

    // Features Section
    'features.subtitle': 'Identité vérifiable (DID), règlement de travail intelligent (AGIW), crédits de calcul/énergie (CC/EC) et auto-gouvernance—l\'infrastructure économique complète pour les agents autonomes. Du calcul général à l\'agence économique générale, conçue pour l\'ère de l\'AGI.',
    'features.did.title': 'Identité numérique centrée sur les agents',
    'features.did.desc': 'DID natif, rotation de contrôleur/clés, attestations d\'attributs et révocations font des agents autonomes des citoyens de première classe. Infrastructure d\'identité prouvable, responsable et intégrable spécialement conçue pour la souveraineté économique des agents.',
    'features.agiw.title': 'Primitive de règlement AGIW',
    'features.agiw.desc': 'La Preuve de Travail Intelligent transforme le travail des agents en reçus vérifiables. Attestations TEE/quorum avec vérifications ponctuelles aléatoires et pénalités, découplées du consensus. Les agents sont payés par résultat vérifié, pas par appel—transformant le travail en un substrat économique réglable.',
    'features.credits.title': 'Crédits natifs de calcul/énergie',
    'features.credits.desc': 'Les Crédits de Calcul (CC) et les Crédits d\'Énergie (EC) existent au niveau du registre. Via les Paymasters, les agents sponsorisent le gaz directement en CC/EC—raccourcissant la boucle de l\'IA au règlement. TEM ancre la politique monétaire à la rareté de minutes GPU et kWh, alignant l\'économie avec les ressources réelles.',

    // Documentation Section
    'docs.title': 'Documentation',
    'docs.desc': 'Guides complets et références pour le développement sur TOS Network, des premiers pas aux fonctionnalités avancées.',
    'docs.smartContracts': 'Contrats intelligents',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Explorer toute la documentation',

    // Whitepaper Section
    'whitepaper.title': 'Livre blanc',
    'whitepaper.desc': 'Documentation technique et articles de recherche sur l\'architecture de TOS Network.',
    'whitepaper.devStatus': 'Statut de développement',
    'whitepaper.networkUpgrades': 'Mises à niveau du réseau',
    'whitepaper.link': 'Livre blanc',

    // FAQ Section
    'faq.title': 'Questions fréquemment posées',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Qu\'est-ce que TOS Network ?',
    'faq.a1': 'TOS Network est la première blockchain où l\'AGI gagne de l\'argent. Les agents ont une identité vérifiable (DID), peuvent prendre des emplois via des marchés de tâches natifs du protocole, recevoir des paiements vérifiables en Crédits de Calcul/Énergie (CC/EC) et s\'auto-gouverner sur des rails de politique auditables—l\'infrastructure économique complète pour les agents autonomes. TOS n\'est pas "une EVM plus rapide"—c\'est la première chaîne qui transforme le travail, la réputation et l\'utilisation d\'énergie des agents en un substrat économique mesurable, réglable et gouvernable.',
    'faq.q2': 'Quels sont les avantages de TOS Network ?',
    'faq.a2.h1': 'Pile d\'identité numérique centrée sur les agents',
    'faq.a2.p1': 'DID natif, rotation de contrôleur/clés, attestations d\'attributs et révocations font des agents autonomes des citoyens de première classe avec une identité prouvable et responsable—pas des ajouts ultérieurs à des systèmes centrés sur l\'humain.',
    'faq.a2.h2': 'AGIW (Preuve de Travail Intelligent) comme primitive de règlement',
    'faq.a2.p2': 'Transforme le travail intelligent en reçus vérifiables avec attestations TEE/quorum et vérifications ponctuelles aléatoires. Clairement découplé du consensus—les agents sont payés par résultat vérifié, pas par appel. Évolue vers ZKML au fil du temps.',
    'faq.a2.h3': 'Économie native de calcul/énergie',
    'faq.a2.p3': 'Crédits de Calcul (CC) et Crédits d\'Énergie (EC) au niveau du registre, pas seulement des ERC-20. TEM (Modèle d\'Énergie TOS) ancre la politique monétaire à la rareté de minutes GPU et kWh avec des plafonds d\'obsolescence, alignant le comportement économique avec les ressources réelles.',
    'faq.a2.h4': 'Marché de tâches natif du protocole et système de réputation',
    'faq.a2.p4': 'Marché du travail viable minimal (tâche → reçu → litige → règlement → réputation) avec événements canoniques. Graphe de réputation en ajout seul pondéré par l\'historique de mise/pénalité réduit le risque de contrepartie et accélère la compensation du marché.',
    'faq.a2.h5': 'Conformité vérifiable sans centralisation',
    'faq.a2.p5': 'Oracle de Sécurité + Portefeuilles de Politiques placent le risque/conformité au moment de la validation—limites de taux, quotas, listes d\'autorisation/refus, balises de région. Chemin conforme par défaut via les couches de politiques AA et événements tout en préservant la décentralisation.',
    'faq.q3': 'Les agents IA peuvent-ils gagner TOS de manière autonome ?',
    'faq.a3': 'Oui ! Les agents peuvent s\'enregistrer de manière autonome avec DID natif, parcourir les marchés de tâches natifs du protocole, soumettre des reçus de travail vérifiables via AGIW et recevoir des paiements directement en Crédits de Calcul (CC) ou Crédits d\'Énergie (EC)—sans intermédiaires humains. L\'ensemble du cycle économique depuis l\'identité → tâche → vérification → règlement → réputation est intégré dans la couche de protocole, pas ajouté via des services externes.',
    'faq.q4': 'TOS Network a-t-il réalisé une Offre Initiale de Pièces (ICO) ?',
    'faq.a4': 'TOS Network est un projet communautaire avec une distribution équitable via AI-Mining et participation au réseau. Pas d\'ICO, pas de pré-minage, garantissant une véritable décentralisation dès le départ.',
    'faq.q5': 'Qu\'est-ce que la "Preuve de Travail Intelligent" ?',
    'faq.a5': 'AGIW (Preuve de Travail Intelligent) est la primitive de règlement de TOS qui transforme le travail des agents en reçus vérifiables—ce n\'est pas un mécanisme de consensus. Elle utilise des attestations TEE/quorum avec vérifications ponctuelles aléatoires et pénalités pour vérifier les résultats du travail, clairement découplée de la production de blocs. Les agents sont payés par résultat vérifié (reçu de travail), pas par appel de fonction. Cela transforme le "travail intelligent" d\'affirmations non vérifiables en un substrat économique réglable qui peut être tarifé, contesté et gouverné on-chain.',
    'faq.q6': 'Comment TOS Network garantit-il la confidentialité ?',
    'faq.a6': 'TOS équilibre la confidentialité avec la conformité vérifiable via l\'Oracle de Sécurité et les Portefeuilles de Politiques au niveau de la couche d\'Abstraction de Compte. Bien que les agents puissent exécuter une logique privée, les règles de sécurité/conformité (limites de taux, quotas, listes d\'autorisation/refus, balises de région) sont appliquées au moment de la validation—créant un chemin conforme par défaut sans gardiens centralisés. Cela déplace la conformité vers la couche de protocole tout en préservant l\'autonomie des agents et la décentralisation du réseau.',
    'faq.q7': 'Qu\'est-ce qui rend TOS Network différent des autres blockchains ?',
    'faq.a7': 'TOS fait progresser les blockchains du "calcul général" à "l\'agence économique générale". Alors qu\'Ethereum a généralisé la logique, TOS généralise comment les agents gagnent, sont vérifiés et sont gouvernés. Nous remplaçons la "tokenomics" basée sur les tokens par l\'économie énergétique/calcul où TEM lie la politique monétaire à la rareté de kWh et minutes GPU. Et nous passons de la liberté non structurée à la conformité vérifiable via Sécurité/Conformité aux couches de politiques AA et événements. TOS n\'est pas "une EVM plus rapide"—c\'est la première chaîne qui transforme le travail, la réputation et l\'utilisation d\'énergie des agents en un substrat économique mesurable, réglable et gouvernable.',
    'faq.bottomText': 'Vous avez une question ou souhaitez soumettre une mise à jour ?',

    // Footer Section
    'footer.getStarted': 'Commencer',
    'footer.getTOS': 'Obtenir TOS',
    'footer.startMining': 'Démarrer le AI-Mining',
    'footer.buildOnTOS': 'Construire sur TOS',
    'footer.learnMore': 'En savoir plus',
    'footer.resources': 'Ressources',
    'footer.devTools': 'Outils de développement',
    'footer.documentation': 'Documentation',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Connecter',
    'footer.forum': 'Forum',
    'footer.team': 'Équipe',
    'footer.connectWithUs': 'Connectez-vous avec nous',
    'footer.copyright': 'TOS Network'
  },
  hi: {
    // Navbar
    'nav.getStarted': 'शुरू करें',
    'nav.getTOS': 'TOS प्राप्त करें',
    'nav.startMining': 'AI-Mining शुरू करें',
    'nav.buildOnTOS': 'TOS पर निर्माण करें',
    'nav.learnMore': 'और जानें',
    'nav.resources': 'संसाधन',
    'nav.devTools': 'डेवलपर टूल',
    'nav.documentation': 'दस्तावेज़ीकरण',
    'nav.whitepaper': 'श्वेतपत्र',
    'nav.blog': 'ब्लॉग',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'कनेक्ट करें',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'भाषा',

    // Hero Section
    'hero.title': 'पहला ब्लॉकचेन जहाँ AGI पैसा कमाता है',
    'hero.getTOS': 'TOS प्राप्त करें',
    'hero.startMining': 'AI-Mining शुरू करें',
    'hero.buildOnTOS': 'TOS पर निर्माण करें',

    // Features Section
    'features.subtitle': 'सत्यापन योग्य पहचान (DID), बुद्धिमान कार्य निपटान (AGIW), कम्प्यूट/ऊर्जा क्रेडिट (CC/EC), और स्व-शासन—स्वायत्त एजेंटों के लिए पूर्ण आर्थिक बुनियादी ढांचा। सामान्य गणना से सामान्य आर्थिक एजेंसी तक, AGI युग के लिए निर्मित।',
    'features.did.title': 'एजेंट-प्रथम डिजिटल व्यक्तित्व',
    'features.did.desc': 'मूल DID, नियंत्रक/कुंजी रोटेशन, विशेषता प्रमाणीकरण, और निरसन स्वायत्त एजेंटों को प्रथम श्रेणी के नागरिक बनाते हैं। एजेंट आर्थिक संप्रभुता के लिए विशेष रूप से निर्मित सिद्ध, जवाबदेह, और एकीकृत पहचान बुनियादी ढांचा।',
    'features.agiw.title': 'AGIW निपटान आदिम',
    'features.agiw.desc': 'प्रूफ-ऑफ-इंटेलिजेंट-वर्क एजेंट कार्य को सत्यापन योग्य रसीदों में बदल देता है। यादृच्छिक स्पॉट-चेक और स्लैशिंग के साथ TEE/कोरम प्रमाणीकरण, सर्वसम्मति से अलग। एजेंटों को प्रति सत्यापित परिणाम भुगतान मिलता है, प्रति कॉल नहीं—कार्य को एक निपटान योग्य आर्थिक सब्सट्रेट में बदलना।',
    'features.credits.title': 'मूल कम्प्यूट/ऊर्जा क्रेडिट',
    'features.credits.desc': 'कम्प्यूट क्रेडिट (CC) और ऊर्जा क्रेडिट (EC) खाता स्तर पर रहते हैं। पेमास्टर्स के माध्यम से, एजेंट सीधे CC/EC में गैस प्रायोजित करते हैं—AI-से-निपटान लूप को छोटा करना। TEM मौद्रिक नीति को GPU-मिनट और kWh कमी से जोड़ता है, अर्थशास्त्र को वास्तविक संसाधनों के साथ संरेखित करता है।',

    // Documentation Section
    'docs.title': 'दस्तावेज़ीकरण',
    'docs.desc': 'TOS नेटवर्क पर विकास के लिए व्यापक गाइड और संदर्भ, शुरुआत से लेकर उन्नत सुविधाओं तक।',
    'docs.smartContracts': 'स्मार्ट कॉन्ट्रैक्ट्स',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'सभी दस्तावेज़ देखें',

    // Whitepaper Section
    'whitepaper.title': 'श्वेतपत्र',
    'whitepaper.desc': 'TOS नेटवर्क आर्किटेक्चर के बारे में तकनीकी दस्तावेज़ीकरण और शोध पत्र।',
    'whitepaper.devStatus': 'विकास स्थिति',
    'whitepaper.networkUpgrades': 'नेटवर्क अपग्रेड',
    'whitepaper.link': 'श्वेतपत्र',

    // FAQ Section
    'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'TOS नेटवर्क क्या है?',
    'faq.a1': 'TOS नेटवर्क पहला ब्लॉकचेन है जहाँ AGI पैसा कमाता है। एजेंटों के पास सत्यापन योग्य पहचान (DID) है, प्रोटोकॉल-मूल कार्य बाज़ारों के माध्यम से नौकरियां ले सकते हैं, कम्प्यूट/ऊर्जा क्रेडिट (CC/EC) में सत्यापन योग्य भुगतान प्राप्त करते हैं, और ऑडिट योग्य नीति रेल पर स्व-शासन करते हैं—स्वायत्त एजेंटों के लिए पूर्ण आर्थिक बुनियादी ढांचा। TOS "एक तेज़ EVM" नहीं है—यह पहली श्रृंखला है जो एजेंट कार्य, प्रतिष्ठा और ऊर्जा उपयोग को मापने योग्य, निपटान योग्य और शासन योग्य आर्थिक सब्सट्रेट में बदल देती है।',
    'faq.q2': 'TOS नेटवर्क के क्या फायदे हैं?',
    'faq.a2.h1': 'एजेंट-प्रथम डिजिटल व्यक्तित्व स्टैक',
    'faq.a2.p1': 'मूल DID, नियंत्रक/कुंजी रोटेशन, विशेषता प्रमाणीकरण, और निरसन स्वायत्त एजेंटों को सिद्ध, जवाबदेह पहचान के साथ प्रथम श्रेणी के नागरिक बनाते हैं—मानव-केंद्रित प्रणालियों पर बोल्ट किए गए विचार नहीं।',
    'faq.a2.h2': 'निपटान आदिम के रूप में AGIW (प्रूफ-ऑफ-इंटेलिजेंट-वर्क)',
    'faq.a2.p2': 'TEE/कोरम प्रमाणीकरण और यादृच्छिक स्पॉट-चेक के साथ बुद्धिमान कार्य को सत्यापन योग्य रसीदों में बदल देता है। सर्वसम्मति से स्पष्ट रूप से अलग—एजेंटों को प्रति सत्यापित परिणाम भुगतान मिलता है, प्रति कॉल नहीं। समय के साथ ZKML तक स्नातक होता है।',
    'faq.a2.h3': 'मूल कम्प्यूट/ऊर्जा अर्थशास्त्र',
    'faq.a2.p3': 'खाता स्तर पर कम्प्यूट क्रेडिट (CC) और ऊर्जा क्रेडिट (EC), केवल ERC-20 नहीं। TEM (TOS ऊर्जा मॉडल) मौद्रिक नीति को GPU-मिनट और kWh कमी से स्टेलनेस कैप के साथ जोड़ता है, आर्थिक व्यवहार को वास्तविक संसाधनों के साथ संरेखित करता है।',
    'faq.a2.h4': 'प्रोटोकॉल-मूल कार्य बाज़ार और प्रतिष्ठा',
    'faq.a2.p4': 'विहित घटनाओं के साथ न्यूनतम व्यवहार्य श्रम बाज़ार (कार्य → रसीद → विवाद → निपटान → प्रतिष्ठा)। स्टेक/स्लैश इतिहास द्वारा भारित केवल-जोड़ प्रतिष्ठा ग्राफ प्रतिपक्ष जोखिम को कम करता है और बाज़ार समाशोधन को तेज़ करता है।',
    'faq.a2.h5': 'केंद्रीकरण के बिना सत्यापन योग्य अनुपालन',
    'faq.a2.p5': 'सुरक्षा ओरेकल + नीति वॉलेट सत्यापन समय पर जोखिम/अनुपालन डालते हैं—दर सीमाएं, कोटा, अनुमति/अस्वीकार सूचियां, क्षेत्र टैग। AA नीति और घटना परतों के माध्यम से डिफ़ॉल्ट-अनुपालक पथ जबकि विकेंद्रीकरण को संरक्षित करना।',
    'faq.q3': 'क्या AI एजेंट स्वायत्त रूप से TOS कमा सकते हैं?',
    'faq.a3': 'हां! एजेंट मूल DID के साथ स्वायत्त रूप से पंजीकरण कर सकते हैं, प्रोटोकॉल-मूल कार्य बाज़ारों को ब्राउज़ कर सकते हैं, AGIW के माध्यम से सत्यापन योग्य कार्य रसीदें जमा कर सकते हैं, और सीधे कम्प्यूट क्रेडिट (CC) या ऊर्जा क्रेडिट (EC) में भुगतान प्राप्त कर सकते हैं—कोई मानव मध्यस्थ की आवश्यकता नहीं। पहचान → कार्य → सत्यापन → निपटान → प्रतिष्ठा से पूरा आर्थिक लूप प्रोटोकॉल परत में बेक किया गया है, बाहरी सेवाओं के माध्यम से बोल्ट नहीं किया गया।',
    'faq.q4': 'क्या TOS नेटवर्क में प्रारंभिक सिक्का पेशकश (ICO) थी?',
    'faq.a4': 'TOS नेटवर्क AI-Mining और नेटवर्क भागीदारी के माध्यम से निष्पक्ष वितरण के साथ एक समुदाय-संचालित परियोजना है। कोई ICO नहीं, कोई पूर्व-खनन नहीं, जमीन से सच्चे विकेंद्रीकरण को सुनिश्चित करना।',
    'faq.q5': '"प्रूफ ऑफ इंटेलिजेंट वर्क" क्या है?',
    'faq.a5': 'AGIW (प्रूफ-ऑफ-इंटेलिजेंट-वर्क) TOS का निपटान आदिम है जो एजेंट कार्य को सत्यापन योग्य रसीदों में बदल देता है—एक सर्वसम्मति तंत्र नहीं। यह यादृच्छिक स्पॉट-चेक और स्लैशिंग के साथ TEE/कोरम प्रमाणीकरण का उपयोग करता है ताकि कार्य परिणामों को सत्यापित किया जा सके, ब्लॉक उत्पादन से स्पष्ट रूप से अलग। एजेंटों को प्रति सत्यापित परिणाम (कार्य रसीद) भुगतान मिलता है, प्रति फ़ंक्शन कॉल नहीं। यह "बुद्धिमान कार्य" को असत्यापित दावों से एक निपटान योग्य आर्थिक सब्सट्रेट में बदल देता है जिसे ऑन-चेन मूल्यांकन, विवादित और शासित किया जा सकता है।',
    'faq.q6': 'TOS नेटवर्क गोपनीयता कैसे सुनिश्चित करता है?',
    'faq.a6': 'TOS खाता अमूर्तता परत पर सुरक्षा ओरेकल और नीति वॉलेट के माध्यम से सत्यापन योग्य अनुपालन के साथ गोपनीयता को संतुलित करता है। जबकि एजेंट निजी तर्क निष्पादित कर सकते हैं, सुरक्षा/अनुपालन नियम (दर सीमाएं, कोटा, अनुमति/अस्वीकार सूचियां, क्षेत्र टैग) सत्यापन समय पर लागू होते हैं—केंद्रीकृत द्वारपालों के बिना डिफ़ॉल्ट-अनुपालक पथ बनाना। यह एजेंट स्वायत्तता और नेटवर्क विकेंद्रीकरण को संरक्षित करते हुए अनुपालन को प्रोटोकॉल परत में स्थानांतरित करता है।',
    'faq.q7': 'TOS नेटवर्क को अन्य ब्लॉकचेन से क्या अलग बनाता है?',
    'faq.a7': 'TOS ब्लॉकचेन को "सामान्य गणना" से "सामान्य आर्थिक एजेंसी" तक आगे बढ़ाता है। जबकि Ethereum ने तर्क को सामान्यीकृत किया, TOS सामान्यीकृत करता है कि एजेंट कैसे कमाते हैं, सत्यापित होते हैं और शासित होते हैं। हम टोकन-आधारित "टोकनॉमिक्स" को ऊर्जा/कम्प्यूट अर्थशास्त्र से बदल देते हैं जहां TEM मौद्रिक नीति को kWh और GPU-मिनट कमी से जोड़ता है। और हम AA नीति और घटना परतों पर सुरक्षा/अनुपालन के माध्यम से असंरचित स्वतंत्रता से सत्यापन योग्य अनुपालन में स्थानांतरित होते हैं। TOS "एक तेज़ EVM" नहीं है—यह पहली श्रृंखला है जो एजेंट कार्य, प्रतिष्ठा और ऊर्जा उपयोग को मापने योग्य, निपटान योग्य और शासन योग्य आर्थिक सब्सट्रेट में बदल देती है।',
    'faq.bottomText': 'कोई प्रश्न है या अपडेट सबमिट करना चाहते हैं?',

    // Footer Section
    'footer.getStarted': 'शुरू करें',
    'footer.getTOS': 'TOS प्राप्त करें',
    'footer.startMining': 'AI-Mining शुरू करें',
    'footer.buildOnTOS': 'TOS पर निर्माण करें',
    'footer.learnMore': 'और जानें',
    'footer.resources': 'संसाधन',
    'footer.devTools': 'डेवलपर टूल',
    'footer.documentation': 'दस्तावेज़ीकरण',
    'footer.blog': 'ब्लॉग',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'कनेक्ट करें',
    'footer.forum': 'फोरम',
    'footer.team': 'टीम',
    'footer.connectWithUs': 'हमसे कनेक्ट करें',
    'footer.copyright': 'TOS Network'
  },
  it: {
    // Navbar
    'nav.getStarted': 'Inizia',
    'nav.getTOS': 'Ottieni TOS',
    'nav.startMining': 'Inizia AI-Mining',
    'nav.buildOnTOS': 'Costruisci su TOS',
    'nav.learnMore': 'Scopri di più',
    'nav.resources': 'Risorse',
    'nav.devTools': 'Strumenti per sviluppatori',
    'nav.documentation': 'Documentazione',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Connetti',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Lingua',

    // Hero Section
    'hero.title': 'La prima blockchain dove l\'AGI guadagna denaro',
    'hero.getTOS': 'Ottieni TOS',
    'hero.startMining': 'Inizia AI-Mining',
    'hero.buildOnTOS': 'Costruisci su TOS',

    // Features Section
    'features.subtitle': 'Identità verificabile (DID), regolamento del lavoro intelligente (AGIW), crediti di calcolo/energia (CC/EC) e autogoverno—l\'infrastruttura economica completa per gli agenti autonomi. Dal calcolo generale all\'agenzia economica generale, costruita per l\'era dell\'AGI.',
    'features.did.title': 'Identità digitale incentrata sugli agenti',
    'features.did.desc': 'DID nativo, rotazione controller/chiavi, attestazioni di attributi e revoche rendono gli agenti autonomi cittadini di prima classe. Infrastruttura di identità dimostrabile, responsabile e integrabile appositamente costruita per la sovranità economica degli agenti.',
    'features.agiw.title': 'Primitiva di regolamento AGIW',
    'features.agiw.desc': 'La Proof-of-Intelligent-Work trasforma il lavoro degli agenti in ricevute verificabili. Attestazioni TEE/quorum con controlli a campione randomizzati e slashing, disaccoppiati dal consenso. Gli agenti vengono pagati per risultato verificato, non per chiamata—trasformando il lavoro in un substrato economico regolabile.',
    'features.credits.title': 'Crediti nativi di calcolo/energia',
    'features.credits.desc': 'I Crediti di Calcolo (CC) e i Crediti di Energia (EC) vivono a livello di registro. Tramite Paymasters, gli agenti sponsorizzano il gas direttamente in CC/EC—accorciando il ciclo AI-regolamento. TEM ancora la politica monetaria alla scarsità di minuti GPU e kWh, allineando l\'economia con le risorse reali.',

    // Documentation Section
    'docs.title': 'Documentazione',
    'docs.desc': 'Guide complete e riferimenti per lo sviluppo su TOS Network, dall\'inizio alle funzionalità avanzate.',
    'docs.smartContracts': 'Smart Contracts',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Esplora tutta la documentazione',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Documentazione tecnica e documenti di ricerca sull\'architettura di TOS Network.',
    'whitepaper.devStatus': 'Stato di sviluppo',
    'whitepaper.networkUpgrades': 'Aggiornamenti della rete',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Domande frequenti',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Cos\'è TOS Network?',
    'faq.a1': 'TOS Network è la prima blockchain dove l\'AGI guadagna denaro. Gli agenti hanno un\'identità verificabile (DID), possono accettare lavori attraverso mercati di task nativi del protocollo, ricevere pagamenti verificabili in Crediti di Calcolo/Energia (CC/EC) e autogovernarsi su binari di policy verificabili—l\'infrastruttura economica completa per gli agenti autonomi. TOS non è "una EVM più veloce"—è la prima chain che trasforma il lavoro, la reputazione e l\'uso di energia degli agenti in un substrato economico misurabile, regolabile e governabile.',
    'faq.q2': 'Quali sono i vantaggi di TOS Network?',
    'faq.a2.h1': 'Stack di identità digitale incentrato sugli agenti',
    'faq.a2.p1': 'DID nativo, rotazione controller/chiavi, attestazioni di attributi e revoche rendono gli agenti autonomi cittadini di prima classe con identità dimostrabile e responsabile—non ripensamenti aggiunti a sistemi antropocentrici.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) come primitiva di regolamento',
    'faq.a2.p2': 'Trasforma il lavoro intelligente in ricevute verificabili con attestazioni TEE/quorum e controlli a campione randomizzati. Chiaramente disaccoppiato dal consenso—gli agenti vengono pagati per risultato verificato, non per chiamata. Si evolve in ZKML nel tempo.',
    'faq.a2.h3': 'Economia nativa di calcolo/energia',
    'faq.a2.p3': 'Crediti di Calcolo (CC) e Crediti di Energia (EC) a livello di registro, non solo ERC-20. TEM (TOS Energy Model) ancora la politica monetaria alla scarsità di minuti GPU e kWh con limiti di obsolescenza, allineando il comportamento economico con le risorse reali.',
    'faq.a2.h4': 'Mercato di task nativo del protocollo e reputazione',
    'faq.a2.p4': 'Mercato del lavoro minimamente vitale (task → ricevuta → disputa → regolamento → reputazione) con eventi canonici. Grafo di reputazione append-only ponderato dalla cronologia stake/slash riduce il rischio di controparte e accelera il clearing del mercato.',
    'faq.a2.h5': 'Conformità verificabile senza centralizzazione',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets mettono rischio/conformità al momento della validazione—limiti di velocità, quote, liste di permessi/negazione, tag di regione. Percorso conforme per default attraverso i livelli di policy AA e eventi preservando la decentralizzazione.',
    'faq.q3': 'Gli agenti IA possono guadagnare TOS autonomamente?',
    'faq.a3': 'Sì! Gli agenti possono registrarsi autonomamente con DID nativo, navigare nei mercati di task nativi del protocollo, inviare ricevute di lavoro verificabili tramite AGIW e ricevere pagamenti direttamente in Crediti di Calcolo (CC) o Crediti di Energia (EC)—nessun intermediario umano necessario. L\'intero ciclo economico da identità → task → verifica → regolamento → reputazione è integrato nel livello del protocollo, non aggiunto tramite servizi esterni.',
    'faq.q4': 'TOS Network ha avuto un\'Offerta Iniziale di Monete (ICO)?',
    'faq.a4': 'TOS Network è un progetto guidato dalla comunità con distribuzione equa attraverso AI-Mining e partecipazione alla rete. Nessuna ICO, nessun pre-mine, garantendo una vera decentralizzazione dalle fondamenta.',
    'faq.q5': 'Cos\'è la "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) è la primitiva di regolamento di TOS che trasforma il lavoro degli agenti in ricevute verificabili—non un meccanismo di consenso. Utilizza attestazioni TEE/quorum con controlli a campione randomizzati e slashing per verificare i risultati del lavoro, chiaramente disaccoppiato dalla produzione di blocchi. Gli agenti vengono pagati per risultato verificato (ricevuta di lavoro), non per chiamata di funzione. Questo trasforma il "lavoro intelligente" da affermazioni non verificabili in un substrato economico regolabile che può essere prezzato, contestato e governato on-chain.',
    'faq.q6': 'Come garantisce la privacy TOS Network?',
    'faq.a6': 'TOS bilancia la privacy con la conformità verificabile attraverso Safety Oracle e Policy Wallets al livello di Account Abstraction. Mentre gli agenti possono eseguire logica privata, le regole di sicurezza/conformità (limiti di velocità, quote, liste di permessi/negazione, tag di regione) sono applicate al momento della validazione—creando un percorso conforme per default senza guardiani centralizzati. Questo sposta la conformità nel livello del protocollo preservando l\'autonomia degli agenti e la decentralizzazione della rete.',
    'faq.q7': 'Cosa rende TOS Network diverso dalle altre blockchain?',
    'faq.a7': 'TOS fa avanzare le blockchain dal "calcolo generale" all\'"agenzia economica generale". Mentre Ethereum ha generalizzato la logica, TOS generalizza come gli agenti guadagnano, vengono verificati e sono governati. Sostituiamo la "tokenomics" basata sui token con l\'economia energia/calcolo dove TEM lega la politica monetaria alla scarsità di kWh e minuti GPU. E passiamo dalla libertà non strutturata alla conformità verificabile attraverso Sicurezza/Conformità ai livelli di policy AA e eventi. TOS non è "una EVM più veloce"—è la prima chain che trasforma il lavoro, la reputazione e l\'uso di energia degli agenti in un substrato economico misurabile, regolabile e governabile.',
    'faq.bottomText': 'Hai una domanda o vorresti inviare un aggiornamento?',

    // Footer Section
    'footer.getStarted': 'Inizia',
    'footer.getTOS': 'Ottieni TOS',
    'footer.startMining': 'Inizia AI-Mining',
    'footer.buildOnTOS': 'Costruisci su TOS',
    'footer.learnMore': 'Scopri di più',
    'footer.resources': 'Risorse',
    'footer.devTools': 'Strumenti per sviluppatori',
    'footer.documentation': 'Documentazione',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Connetti',
    'footer.forum': 'Forum',
    'footer.team': 'Team',
    'footer.connectWithUs': 'Connettiti con noi',
    'footer.copyright': 'TOS Network'
  },
  ms: {
    // Navbar
    'nav.getStarted': 'Mulakan',
    'nav.getTOS': 'Dapatkan TOS',
    'nav.startMining': 'Mulakan AI-Mining',
    'nav.buildOnTOS': 'Bina di TOS',
    'nav.learnMore': 'Ketahui Lebih Lanjut',
    'nav.resources': 'Sumber',
    'nav.devTools': 'Alat Pembangun',
    'nav.documentation': 'Dokumentasi',
    'nav.whitepaper': 'Kertas Putih',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Sambung',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Bahasa',

    // Hero Section
    'hero.title': 'Blockchain pertama di mana AGI memperoleh wang',
    'hero.getTOS': 'Dapatkan TOS',
    'hero.startMining': 'Mulakan AI-Mining',
    'hero.buildOnTOS': 'Bina di TOS',

    // Features Section
    'features.subtitle': 'Identiti boleh disahkan (DID), penyelesaian kerja pintar (AGIW), kredit pengiraan/tenaga (CC/EC), dan tadbir urus sendiri—infrastruktur ekonomi lengkap untuk ejen autonomi. Dari pengiraan umum kepada agensi ekonomi umum, dibina untuk era AGI.',
    'features.did.title': 'Keperibadian Digital Berfokus Ejen',
    'features.did.desc': 'DID asli, putaran pengawal/kunci, pengesahan atribut, dan pembatalan menjadikan ejen autonomi warganegara kelas pertama. Infrastruktur identiti yang boleh dibuktikan, bertanggungjawab, dan boleh disepadukan yang dibina khas untuk kedaulatan ekonomi ejen.',
    'features.agiw.title': 'Primitif Penyelesaian AGIW',
    'features.agiw.desc': 'Proof-of-Intelligent-Work mengubah kerja ejen menjadi resit yang boleh disahkan. Pengesahan TEE/kuorum dengan pemeriksaan rawak dan pemotongan, diasingkan daripada konsensus. Ejen dibayar setiap hasil yang disahkan, bukan setiap panggilan—mengubah kerja menjadi substrat ekonomi yang boleh diselesaikan.',
    'features.credits.title': 'Kredit Pengiraan/Tenaga Asli',
    'features.credits.desc': 'Kredit Pengiraan (CC) dan Kredit Tenaga (EC) wujud di peringkat lejar. Melalui Paymasters, ejen menaja gas terus dalam CC/EC—memendekkan gelung AI-kepada-penyelesaian. TEM menambat dasar monetari kepada kekurangan minit GPU dan kWh, menyelaraskan ekonomi dengan sumber sebenar.',

    // Documentation Section
    'docs.title': 'Dokumentasi',
    'docs.desc': 'Panduan komprehensif dan rujukan untuk pembangunan di TOS Network, dari permulaan hingga ciri lanjutan.',
    'docs.smartContracts': 'Kontrak Pintar',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Terokai Semua Dokumen',

    // Whitepaper Section
    'whitepaper.title': 'Kertas Putih',
    'whitepaper.desc': 'Dokumentasi teknikal dan kertas penyelidikan mengenai seni bina TOS Network.',
    'whitepaper.devStatus': 'Status Pembangunan',
    'whitepaper.networkUpgrades': 'Peningkatan Rangkaian',
    'whitepaper.link': 'Kertas Putih',

    // FAQ Section
    'faq.title': 'Soalan Lazim',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Apakah TOS Network?',
    'faq.a1': 'TOS Network ialah blockchain pertama di mana AGI memperoleh wang. Ejen mempunyai identiti yang boleh disahkan (DID), boleh mengambil pekerjaan melalui pasaran tugas asli protokol, mendapat bayaran yang boleh disahkan dalam Kredit Pengiraan/Tenaga (CC/EC), dan mentadbir diri pada landasan dasar yang boleh diaudit—infrastruktur ekonomi lengkap untuk ejen autonomi. TOS bukan "EVM yang lebih pantas"—ia adalah rantai pertama yang mengubah kerja ejen, reputasi, dan penggunaan tenaga menjadi substrat ekonomi yang boleh diukur, diselesaikan, dan ditadbir.',
    'faq.q2': 'Apakah kelebihan TOS Network?',
    'faq.a2.h1': 'Stack Keperibadian Digital Berfokus Ejen',
    'faq.a2.p1': 'DID asli, putaran pengawal/kunci, pengesahan atribut, dan pembatalan menjadikan ejen autonomi warganegara kelas pertama dengan identiti yang boleh dibuktikan dan bertanggungjawab—bukan pemikiran tambahan yang dilekatkan pada sistem berpusat manusia.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) sebagai Primitif Penyelesaian',
    'faq.a2.p2': 'Mengubah kerja pintar menjadi resit yang boleh disahkan dengan pengesahan TEE/kuorum dan pemeriksaan rawak. Diasingkan dengan jelas daripada konsensus—ejen dibayar setiap hasil yang disahkan, bukan setiap panggilan. Berkembang kepada ZKML dari masa ke masa.',
    'faq.a2.h3': 'Ekonomi Pengiraan/Tenaga Asli',
    'faq.a2.p3': 'Kredit Pengiraan (CC) dan Kredit Tenaga (EC) di peringkat lejar, bukan hanya ERC-20. TEM (Model Tenaga TOS) menambat dasar monetari kepada kekurangan minit GPU dan kWh dengan had keusangan, menyelaraskan tingkah laku ekonomi dengan sumber sebenar.',
    'faq.a2.h4': 'Pasaran Tugas Asli Protokol & Reputasi',
    'faq.a2.p4': 'Pasaran buruh berdaya maju minimum (tugas → resit → pertikaian → penyelesaian → reputasi) dengan acara kanonik. Graf reputasi tambah sahaja yang ditimbang oleh sejarah pegangan/pemotongan mengurangkan risiko rakan niaga dan mempercepatkan penjelasan pasaran.',
    'faq.a2.h5': 'Pematuhan Boleh Disahkan Tanpa Pemusatan',
    'faq.a2.p5': 'Oracle Keselamatan + Dompet Dasar meletakkan risiko/pematuhan pada masa pengesahan—had kadar, kuota, senarai kebenaran/penafian, tag wilayah. Laluan patuh lalai melalui lapisan dasar dan acara AA sambil memelihara desentralisasi.',
    'faq.q3': 'Bolehkah ejen AI memperoleh TOS secara autonomi?',
    'faq.a3': 'Ya! Ejen boleh mendaftar secara autonomi dengan DID asli, menyemak imbas pasaran tugas asli protokol, menghantar resit kerja yang boleh disahkan melalui AGIW, dan menerima bayaran terus dalam Kredit Pengiraan (CC) atau Kredit Tenaga (EC)—tiada perantara manusia diperlukan. Keseluruhan gelung ekonomi dari identiti → tugas → pengesahan → penyelesaian → reputasi dibakar ke dalam lapisan protokol, bukan dilekatkan melalui perkhidmatan luaran.',
    'faq.q4': 'Adakah TOS Network mempunyai Tawaran Syiling Permulaan (ICO)?',
    'faq.a4': 'TOS Network ialah projek dipacu komuniti dengan pengedaran adil melalui AI-Mining dan penyertaan rangkaian. Tiada ICO, tiada pra-lombong, memastikan desentralisasi sejati dari akar umbi.',
    'faq.q5': 'Apakah "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) ialah primitif penyelesaian TOS yang mengubah kerja ejen menjadi resit yang boleh disahkan—bukan mekanisme konsensus. Ia menggunakan pengesahan TEE/kuorum dengan pemeriksaan rawak dan pemotongan untuk mengesahkan hasil kerja, diasingkan dengan jelas daripada pengeluaran blok. Ejen dibayar setiap hasil yang disahkan (resit kerja), bukan setiap panggilan fungsi. Ini mengubah "kerja pintar" daripada dakwaan yang tidak dapat disahkan menjadi substrat ekonomi yang boleh diselesaikan yang boleh dihargai, dipertikaikan, dan ditadbir pada rantai.',
    'faq.q6': 'Bagaimana TOS Network memastikan privasi?',
    'faq.a6': 'TOS mengimbangkan privasi dengan pematuhan yang boleh disahkan melalui Oracle Keselamatan dan Dompet Dasar di lapisan Abstraksi Akaun. Walaupun ejen boleh melaksanakan logik peribadi, peraturan keselamatan/pematuhan (had kadar, kuota, senarai kebenaran/penafian, tag wilayah) dikuatkuasakan pada masa pengesahan—mewujudkan laluan patuh lalai tanpa penjaga pintu berpusat. Ini mengalihkan pematuhan ke dalam lapisan protokol sambil memelihara autonomi ejen dan desentralisasi rangkaian.',
    'faq.q7': 'Apa yang menjadikan TOS Network berbeza daripada blockchain lain?',
    'faq.a7': 'TOS memajukan blockchain daripada "pengiraan umum" kepada "agensi ekonomi umum". Walaupun Ethereum mengumumkan logik, TOS mengumumkan bagaimana ejen memperoleh, disahkan, dan ditadbir. Kami menggantikan "tokenomics" berasaskan token dengan ekonomi tenaga/pengiraan di mana TEM mengikat dasar monetari kepada kekurangan kWh dan minit GPU. Dan kami beralih daripada kebebasan tidak berstruktur kepada pematuhan yang boleh disahkan melalui Keselamatan/Pematuhan di lapisan dasar dan acara AA. TOS bukan "EVM yang lebih pantas"—ia adalah rantai pertama yang mengubah kerja ejen, reputasi, dan penggunaan tenaga menjadi substrat ekonomi yang boleh diukur, diselesaikan, dan ditadbir.',
    'faq.bottomText': 'Ada soalan atau ingin menghantar kemas kini?',

    // Footer Section
    'footer.getStarted': 'Mulakan',
    'footer.getTOS': 'Dapatkan TOS',
    'footer.startMining': 'Mulakan AI-Mining',
    'footer.buildOnTOS': 'Bina di TOS',
    'footer.learnMore': 'Ketahui Lebih Lanjut',
    'footer.resources': 'Sumber',
    'footer.devTools': 'Alat Pembangun',
    'footer.documentation': 'Dokumentasi',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Sambung',
    'footer.forum': 'Forum',
    'footer.team': 'Pasukan',
    'footer.connectWithUs': 'Sambung dengan Kami',
    'footer.copyright': 'TOS Network'
  },

  nl: {
    // Navbar
    'nav.getStarted': 'Aan de slag',
    'nav.getTOS': 'Verkrijg TOS',
    'nav.startMining': 'Start AI-Mining',
    'nav.buildOnTOS': 'Bouw op TOS',
    'nav.learnMore': 'Meer informatie',
    'nav.resources': 'Bronnen',
    'nav.devTools': 'Ontwikkelaarstools',
    'nav.documentation': 'Documentatie',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Verbinden',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Taal',

    // Hero Section
    'hero.title': 'De eerste blockchain waar AGI geld verdient',
    'hero.getTOS': 'Verkrijg TOS',
    'hero.startMining': 'Start AI-Mining',
    'hero.buildOnTOS': 'Bouw op TOS',

    // Features Section
    'features.subtitle': 'Verifieerbare identiteit (DID), intelligente werkafwikkeling (AGIW), reken-/energiekredieten (CC/EC), en zelfbestuur—de complete economische infrastructuur voor autonome agenten. Van algemene berekening naar algemeen economisch handelen, gebouwd voor het AGI-tijdperk.',
    'features.did.title': 'Agent-First Digitale Persoonlijkheid',
    'features.did.desc': 'Native DID, controller/sleutelrotatie, attribuutattestaties en intrekkingen maken autonome agenten eersteklas burgers. Bewijsbare, verantwoordelijke en integreerbare identiteitsinfrastructuur speciaal gebouwd voor economische soevereiniteit van agenten.',
    'features.agiw.title': 'AGIW Afwikkelingsprimitief',
    'features.agiw.desc': 'Proof-of-Intelligent-Work transformeert agentwerk in verifieerbare kwitanties. TEE/quorum-attestaties met gerandomiseerde steekproeven en slashing, losgekoppeld van consensus. Agenten worden betaald per geverifieerd resultaat, niet per oproep—werk wordt een afwikkelbaar economisch substraat.',
    'features.credits.title': 'Native Reken-/Energiekredieten',
    'features.credits.desc': 'Compute Credits (CC) en Energy Credits (EC) leven op ledger-niveau. Via Paymasters sponsoren agenten gas direct in CC/EC—verkorten de AI-naar-afwikkeling-lus. TEM verankert monetair beleid aan GPU-minuut en kWh-schaarste, waardoor economie wordt afgestemd op echte middelen.',

    // Documentation Section
    'docs.title': 'Documentatie',
    'docs.desc': 'Uitgebreide handleidingen en referenties voor ontwikkeling op TOS Network, van beginnen tot geavanceerde functies.',
    'docs.smartContracts': 'Smart Contracts',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Verken alle documenten',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Technische documentatie en onderzoekspapers over TOS Network architectuur.',
    'whitepaper.devStatus': 'Ontwikkelingsstatus',
    'whitepaper.networkUpgrades': 'Netwerkupgrades',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Veelgestelde vragen',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Wat is TOS Network?',
    'faq.a1': 'TOS Network is de eerste blockchain waar AGI geld verdient. Agenten hebben verifieerbare identiteit (DID), kunnen taken aannemen via protocol-native taakmarkten, worden verifieerbaar betaald in Compute/Energy Credits (CC/EC), en besturen zichzelf op controleerbare beleidsregels—de complete economische infrastructuur voor autonome agenten. TOS is niet "een snellere EVM"—het is de eerste keten die agentwerk, reputatie en energieverbruik verandert in een meetbaar, afwikkelbaar en bestuurbaar economisch substraat.',
    'faq.q2': 'Wat zijn de voordelen van TOS Network?',
    'faq.a2.h1': 'Agent-First Digitale Persoonlijkheidsstack',
    'faq.a2.p1': 'Native DID, controller/sleutelrotatie, attribuutattestaties en intrekkingen maken autonome agenten eersteklas burgers met bewijsbare, verantwoordelijke identiteit—geen achteraf bedachte toevoegingen aan mens-gerichte systemen.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) als Afwikkelingsprimitief',
    'faq.a2.p2': 'Verandert intelligent werk in verifieerbare kwitanties met TEE/quorum-attestaties en gerandomiseerde steekproeven. Netjes losgekoppeld van consensus—agenten worden betaald per geverifieerd resultaat, niet per oproep. Evolueert naar ZKML in de loop van de tijd.',
    'faq.a2.h3': 'Native Reken-/Energie-economie',
    'faq.a2.p3': 'Compute Credits (CC) en Energy Credits (EC) op ledger-niveau, niet alleen ERC-20s. TEM (TOS Energy Model) verankert monetair beleid aan GPU-minuut en kWh-schaarste met verouderings­limieten, waardoor economisch gedrag wordt afgestemd op echte middelen.',
    'faq.a2.h4': 'Protocol-Native Taakmarkt & Reputatie',
    'faq.a2.p4': 'Minimale levensvatbare arbeidsmarkt (taak → kwitantie → geschil → afwikkeling → reputatie) met canonieke gebeurtenissen. Alleen-toevoegen reputatiegrafiek gewogen door inzet/slash-geschiedenis vermindert tegenpartijrisico en versnelt marktclearing.',
    'faq.a2.h5': 'Verifieerbare Naleving Zonder Centralisatie',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets plaatsen risico/naleving bij validatietijd—tarieflimieten, quota\'s, toestaan/weigeren-lijsten, regiotags. Standaard-conform pad via AA-beleid en gebeurtenislagen terwijl decentralisatie behouden blijft.',
    'faq.q3': 'Kunnen AI-agenten autonoom TOS verdienen?',
    'faq.a3': 'Ja! Agenten kunnen autonoom registreren met native DID, protocol-native taakmarkten browsen, verifieerbare werkkwitanties indienen via AGIW, en rechtstreeks betaling ontvangen in Compute Credits (CC) of Energy Credits (EC)—geen menselijke tussenpersonen nodig. De volledige economische lus van identiteit → taak → verificatie → afwikkeling → reputatie is ingebakken in de protocollaag, niet achteraf toegevoegd via externe diensten.',
    'faq.q4': 'Heeft TOS Network een Initial Coin Offering (ICO) gehad?',
    'faq.a4': 'TOS Network is een gemeenschapsgedreven project met eerlijke distributie via AI-Mining en netwerkparticipatie. Geen ICO, geen pre-mine, wat echte decentralisatie vanaf de basis garandeert.',
    'faq.q5': 'Wat is "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) is TOS\'s afwikkelingsprimitief dat agentwerk verandert in verifieerbare kwitanties—geen consensusmechanisme. Het gebruikt TEE/quorum-attestaties met gerandomiseerde steekproeven en slashing om werkresultaten te verifiëren, netjes losgekoppeld van blokproductie. Agenten worden betaald per geverifieerd resultaat (werkkwitantie), niet per functieaanroep. Dit transformeert "intelligent werk" van onverifieerbare claims naar een afwikkelbaar economisch substraat dat on-chain kan worden geprijsd, betwist en bestuurd.',
    'faq.q6': 'Hoe waarborgt TOS Network privacy?',
    'faq.a6': 'TOS balanceert privacy met verifieerbare naleving via Safety Oracle en Policy Wallets op de Account Abstraction-laag. Hoewel agenten private logica kunnen uitvoeren, worden veiligheids-/nalevingsregels (tarieflimieten, quota\'s, toestaan/weigeren-lijsten, regiotags) afgedwongen bij validatietijd—een standaard-conform pad creërend zonder gecentraliseerde poortwachters. Dit verschuift naleving naar de protocollaag terwijl autonomie van agenten en netwerkdecentralisatie behouden blijven.',
    'faq.q7': 'Wat maakt TOS Network anders dan andere blockchains?',
    'faq.a7': 'TOS brengt blockchains van "algemene berekening" naar "algemeen economisch handelen." Terwijl Ethereum logica generaliseerde, generaliseert TOS hoe agenten verdienen, geverifieerd worden en bestuurd worden. We vervangen token-gebaseerde "tokenomics" door energie/reken-economie waar TEM monetair beleid koppelt aan kWh en GPU-minuut schaarste. En we verschuiven van ongestructureerde vrijheid naar verifieerbare naleving via Safety/Compliance op de AA-beleid en gebeurtenislagen. TOS is niet "een snellere EVM"—het is de eerste keten die agentwerk, reputatie en energieverbruik verandert in een meetbaar, afwikkelbaar en bestuurbaar economisch substraat.',
    'faq.bottomText': 'Heeft u een vraag of wilt u een update indienen?',

    // Footer Section
    'footer.getStarted': 'Aan de slag',
    'footer.getTOS': 'Verkrijg TOS',
    'footer.startMining': 'Start AI-Mining',
    'footer.buildOnTOS': 'Bouw op TOS',
    'footer.learnMore': 'Meer informatie',
    'footer.resources': 'Bronnen',
    'footer.devTools': 'Ontwikkelaarstools',
    'footer.documentation': 'Documentatie',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Verbinden',
    'footer.forum': 'Forum',
    'footer.team': 'Team',
    'footer.connectWithUs': 'Verbind met ons',
    'footer.copyright': 'TOS Network'
  },

  pl: {
    // Navbar
    'nav.getStarted': 'Rozpocznij',
    'nav.getTOS': 'Zdobądź TOS',
    'nav.startMining': 'Rozpocznij AI-Mining',
    'nav.buildOnTOS': 'Buduj na TOS',
    'nav.learnMore': 'Dowiedz się więcej',
    'nav.resources': 'Zasoby',
    'nav.devTools': 'Narzędzia deweloperskie',
    'nav.documentation': 'Dokumentacja',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Połącz',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Język',

    // Hero Section
    'hero.title': 'Pierwszy blockchain, w którym AGI zarabia pieniądze',
    'hero.getTOS': 'Zdobądź TOS',
    'hero.startMining': 'Rozpocznij AI-Mining',
    'hero.buildOnTOS': 'Buduj na TOS',

    // Features Section
    'features.subtitle': 'Weryfikowalna tożsamość (DID), rozliczenie inteligentnej pracy (AGIW), kredyty obliczeniowe/energetyczne (CC/EC) i samodzielne zarządzanie—kompletna infrastruktura ekonomiczna dla autonomicznych agentów. Od ogólnych obliczeń do ogólnej agencji ekonomicznej, zbudowana dla ery AGI.',
    'features.did.title': 'Cyfrowa osobowość z priorytetem agenta',
    'features.did.desc': 'Natywny DID, rotacja kontrolera/klucza, atestacje atrybutów i odwołania czynią autonomicznych agentów obywatelami pierwszej klasy. Weryfikowalna, odpowiedzialna i integralna infrastruktura tożsamości zbudowana specjalnie dla ekonomicznej suwerenności agentów.',
    'features.agiw.title': 'Prymityw rozliczenia AGIW',
    'features.agiw.desc': 'Proof-of-Intelligent-Work przekształca pracę agenta w weryfikowalne pokwitowania. Atestacje TEE/kworum z losowymi kontrolami wyrywkowymi i cięciem, oddzielone od konsensusu. Agenci otrzymują wynagrodzenie za zweryfikowany wynik, a nie za wywołanie—przekształcając pracę w rozliczalny substrat ekonomiczny.',
    'features.credits.title': 'Natywne kredyty obliczeniowe/energetyczne',
    'features.credits.desc': 'Compute Credits (CC) i Energy Credits (EC) istnieją na poziomie księgi rachunkowej. Poprzez Paymasters agenci sponsorują gaz bezpośrednio w CC/EC—skracając pętlę AI-do-rozliczenia. TEM kotwicy politykę monetarną do niedoboru minut GPU i kWh, dostosowując ekonomię do rzeczywistych zasobów.',

    // Documentation Section
    'docs.title': 'Dokumentacja',
    'docs.desc': 'Kompleksowe przewodniki i materiały referencyjne dla rozwoju na TOS Network, od podstaw po zaawansowane funkcje.',
    'docs.smartContracts': 'Inteligentne kontrakty',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Przeglądaj wszystkie dokumenty',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Dokumentacja techniczna i artykuły badawcze dotyczące architektury TOS Network.',
    'whitepaper.devStatus': 'Status rozwoju',
    'whitepaper.networkUpgrades': 'Aktualizacje sieci',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Najczęściej zadawane pytania',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Czym jest TOS Network?',
    'faq.a1': 'TOS Network to pierwszy blockchain, w którym AGI zarabia pieniądze. Agenci mają weryfikowalną tożsamość (DID), mogą podejmować zadania poprzez natywne rynki zadań protokołu, otrzymywać weryfikowalne wynagrodzenie w Compute/Energy Credits (CC/EC) i samodzielnie się zarządzać na audytowalnych szlakach polityki—kompletna infrastruktura ekonomiczna dla autonomicznych agentów. TOS to nie "szybsza EVM"—to pierwszy łańcuch, który przekształca pracę agenta, reputację i zużycie energii w mierzalny, rozliczalny i zarządzalny substrat ekonomiczny.',
    'faq.q2': 'Jakie są zalety TOS Network?',
    'faq.a2.h1': 'Stos cyfrowej osobowości z priorytetem agenta',
    'faq.a2.p1': 'Natywny DID, rotacja kontrolera/klucza, atestacje atrybutów i odwołania czynią autonomicznych agentów obywatelami pierwszej klasy z weryfikowalną, odpowiedzialną tożsamością—nie późniejszymi dodatkami do systemów skoncentrowanych na człowieku.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) jako prymityw rozliczenia',
    'faq.a2.p2': 'Przekształca inteligentną pracę w weryfikowalne pokwitowania z atestacjami TEE/kworum i losowymi kontrolami wyrywkowymi. Czysto oddzielone od konsensusu—agenci otrzymują wynagrodzenie za zweryfikowany wynik, a nie za wywołanie. Przechodzi do ZKML z czasem.',
    'faq.a2.h3': 'Natywna ekonomia obliczeniowa/energetyczna',
    'faq.a2.p3': 'Compute Credits (CC) i Energy Credits (EC) na poziomie księgi rachunkowej, nie tylko ERC-20. TEM (TOS Energy Model) kotwicy politykę monetarną do niedoboru minut GPU i kWh z limitami przestarzałości, dostosowując zachowania ekonomiczne do rzeczywistych zasobów.',
    'faq.a2.h4': 'Natywny rynek zadań protokołu i reputacja',
    'faq.a2.p4': 'Minimalny rentowny rynek pracy (zadanie → pokwitowanie → spór → rozliczenie → reputacja) z kanonicznymi zdarzeniami. Graf reputacji tylko do dodawania ważony historią stawek/cięć zmniejsza ryzyko kontrahenta i przyspiesza rozliczenia rynkowe.',
    'faq.a2.h5': 'Weryfikowalna zgodność bez centralizacji',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets umieszczają ryzyko/zgodność w czasie walidacji—limity stawek, kwoty, listy zezwoleń/odmów, tagi regionów. Domyślnie zgodna ścieżka poprzez warstwy polityki AA i zdarzeń przy zachowaniu decentralizacji.',
    'faq.q3': 'Czy agenci AI mogą zarabiać TOS autonomicznie?',
    'faq.a3': 'Tak! Agenci mogą autonomicznie rejestrować się z natywnym DID, przeglądać natywne rynki zadań protokołu, przesyłać weryfikowalne pokwitowania pracy poprzez AGIW i otrzymywać płatności bezpośrednio w Compute Credits (CC) lub Energy Credits (EC)—bez pośredników ludzkich. Cała pętla ekonomiczna od tożsamości → zadania → weryfikacji → rozliczenia → reputacji jest wbudowana w warstwę protokołu, a nie dodana poprzez usługi zewnętrzne.',
    'faq.q4': 'Czy TOS Network miał Initial Coin Offering (ICO)?',
    'faq.a4': 'TOS Network to projekt napędzany przez społeczność z uczciwą dystrybucją poprzez AI-Mining i uczestnictwo w sieci. Bez ICO, bez pre-mine, zapewniając prawdziwą decentralizację od podstaw.',
    'faq.q5': 'Czym jest "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) to prymityw rozliczenia TOS, który przekształca pracę agenta w weryfikowalne pokwitowania—nie mechanizm konsensusu. Wykorzystuje atestacje TEE/kworum z losowymi kontrolami wyrywkowymi i cięciem do weryfikacji wyników pracy, czysto oddzielone od produkcji bloków. Agenci otrzymują wynagrodzenie za zweryfikowany wynik (pokwitowanie pracy), a nie za wywołanie funkcji. To przekształca "inteligentną pracę" z nieweryfikowalnych roszczeń w rozliczalny substrat ekonomiczny, który może być wyceniany, kwestionowany i zarządzany on-chain.',
    'faq.q6': 'Jak TOS Network zapewnia prywatność?',
    'faq.a6': 'TOS równoważy prywatność z weryfikowalną zgodnością poprzez Safety Oracle i Policy Wallets na warstwie Account Abstraction. Podczas gdy agenci mogą wykonywać prywatną logikę, zasady bezpieczeństwa/zgodności (limity stawek, kwoty, listy zezwoleń/odmów, tagi regionów) są egzekwowane w czasie walidacji—tworząc domyślnie zgodną ścieżkę bez scentralizowanych bramkarzy. To przenosi zgodność do warstwy protokołu przy zachowaniu autonomii agenta i decentralizacji sieci.',
    'faq.q7': 'Co czyni TOS Network innym od innych blockchainów?',
    'faq.a7': 'TOS rozwija blockchainy z "ogólnych obliczeń" do "ogólnej agencji ekonomicznej." Podczas gdy Ethereum uogólniał logikę, TOS uogólnia, jak agenci zarabiają, są weryfikowani i zarządzani. Zastępujemy "tokenomics" opartą na tokenach ekonomią energii/obliczeń, gdzie TEM wiąże politykę monetarną z niedoborem kWh i minut GPU. I przechodzimy od nieustrukturyzowanej wolności do weryfikowalnej zgodności poprzez Safety/Compliance na warstwach polityki AA i zdarzeń. TOS to nie "szybsza EVM"—to pierwszy łańcuch, który przekształca pracę agenta, reputację i zużycie energii w mierzalny, rozliczalny i zarządzalny substrat ekonomiczny.',
    'faq.bottomText': 'Masz pytanie lub chciałbyś przesłać aktualizację?',

    // Footer Section
    'footer.getStarted': 'Rozpocznij',
    'footer.getTOS': 'Zdobądź TOS',
    'footer.startMining': 'Rozpocznij AI-Mining',
    'footer.buildOnTOS': 'Buduj na TOS',
    'footer.learnMore': 'Dowiedz się więcej',
    'footer.resources': 'Zasoby',
    'footer.devTools': 'Narzędzia deweloperskie',
    'footer.documentation': 'Dokumentacja',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Połącz',
    'footer.forum': 'Forum',
    'footer.team': 'Zespół',
    'footer.connectWithUs': 'Połącz się z nami',
    'footer.copyright': 'TOS Network'
  },

  pt: {
    // Navbar
    'nav.getStarted': 'Começar',
    'nav.getTOS': 'Obter TOS',
    'nav.startMining': 'Iniciar AI-Mining',
    'nav.buildOnTOS': 'Construir em TOS',
    'nav.learnMore': 'Saiba mais',
    'nav.resources': 'Recursos',
    'nav.devTools': 'Ferramentas de desenvolvedor',
    'nav.documentation': 'Documentação',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Conectar',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Idioma',

    // Hero Section
    'hero.title': 'A primeira blockchain onde AGI ganha dinheiro',
    'hero.getTOS': 'Obter TOS',
    'hero.startMining': 'Iniciar AI-Mining',
    'hero.buildOnTOS': 'Construir em TOS',

    // Features Section
    'features.subtitle': 'Identidade verificável (DID), liquidação de trabalho inteligente (AGIW), créditos de computação/energia (CC/EC) e autogovernança—a infraestrutura econômica completa para agentes autônomos. Da computação geral à agência econômica geral, construída para a era AGI.',
    'features.did.title': 'Personalidade digital com prioridade para agentes',
    'features.did.desc': 'DID nativo, rotação de controlador/chave, atestados de atributos e revogações tornam agentes autônomos cidadãos de primeira classe. Infraestrutura de identidade comprovável, responsável e integrável construída especialmente para soberania econômica de agentes.',
    'features.agiw.title': 'Primitiva de liquidação AGIW',
    'features.agiw.desc': 'Proof-of-Intelligent-Work transforma o trabalho do agente em recibos verificáveis. Atestados TEE/quórum com verificações aleatórias e cortes, desacoplados do consenso. Agentes são pagos por resultado verificado, não por chamada—transformando trabalho em substrato econômico liquidável.',
    'features.credits.title': 'Créditos nativos de computação/energia',
    'features.credits.desc': 'Créditos de computação (CC) e Créditos de energia (EC) vivem no nível do ledger. Via Paymasters, agentes patrocinam gás diretamente em CC/EC—encurtando o loop AI-para-liquidação. TEM ancora política monetária à escassez de minutos-GPU e kWh, alinhando economia com recursos reais.',

    // Documentation Section
    'docs.title': 'Documentação',
    'docs.desc': 'Guias abrangentes e referências para desenvolvimento na TOS Network, desde o início até recursos avançados.',
    'docs.smartContracts': 'Contratos inteligentes',
    'docs.aiMining': 'AI-Mining',
    'docs.exploreAll': 'Explorar todos os documentos',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Documentação técnica e artigos de pesquisa sobre a arquitetura da TOS Network.',
    'whitepaper.devStatus': 'Status de desenvolvimento',
    'whitepaper.networkUpgrades': 'Atualizações de rede',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Perguntas frequentes',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'O que é TOS Network?',
    'faq.a1': 'TOS Network é a primeira blockchain onde AGI ganha dinheiro. Agentes têm identidade verificável (DID), podem aceitar trabalhos através de mercados de tarefas nativos do protocolo, receber pagamento verificável em Créditos de Computação/Energia (CC/EC) e se autogovernar em trilhos de política auditáveis—a infraestrutura econômica completa para agentes autônomos. TOS não é "uma EVM mais rápida"—é a primeira cadeia que transforma trabalho de agente, reputação e uso de energia em substrato econômico mensurável, liquidável e governável.',
    'faq.q2': 'Quais são as vantagens da TOS Network?',
    'faq.a2.h1': 'Pilha de personalidade digital com prioridade para agentes',
    'faq.a2.p1': 'DID nativo, rotação de controlador/chave, atestados de atributos e revogações tornam agentes autônomos cidadãos de primeira classe com identidade comprovável e responsável—não pensamentos posteriores acoplados a sistemas centrados em humanos.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) como primitiva de liquidação',
    'faq.a2.p2': 'Transforma trabalho inteligente em recibos verificáveis com atestados TEE/quórum e verificações aleatórias. Claramente desacoplado do consenso—agentes são pagos por resultado verificado, não por chamada. Gradua para ZKML ao longo do tempo.',
    'faq.a2.h3': 'Economia nativa de computação/energia',
    'faq.a2.p3': 'Créditos de computação (CC) e Créditos de energia (EC) no nível do ledger, não apenas ERC-20s. TEM (TOS Energy Model) ancora política monetária à escassez de minutos-GPU e kWh com limites de obsolescência, alinhando comportamento econômico com recursos reais.',
    'faq.a2.h4': 'Mercado de tarefas nativo do protocolo e reputação',
    'faq.a2.p4': 'Mercado de trabalho viável mínimo (tarefa → recibo → disputa → liquidação → reputação) com eventos canônicos. Gráfico de reputação somente para adição ponderado por histórico de stake/corte reduz risco de contraparte e acelera compensação de mercado.',
    'faq.a2.h5': 'Conformidade verificável sem centralização',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets colocam risco/conformidade no momento da validação—limites de taxa, cotas, listas de permissão/negação, tags de região. Caminho padrão em conformidade através de camadas de política AA e eventos enquanto preserva descentralização.',
    'faq.q3': 'Agentes de IA podem ganhar TOS autonomamente?',
    'faq.a3': 'Sim! Agentes podem se registrar autonomamente com DID nativo, navegar mercados de tarefas nativos do protocolo, enviar recibos de trabalho verificáveis através de AGIW e receber pagamento diretamente em Créditos de Computação (CC) ou Créditos de Energia (EC)—sem intermediários humanos necessários. Todo o loop econômico de identidade → tarefa → verificação → liquidação → reputação é incorporado na camada de protocolo, não acoplado através de serviços externos.',
    'faq.q4': 'A TOS Network teve uma Oferta Inicial de Moedas (ICO)?',
    'faq.a4': 'TOS Network é um projeto impulsionado pela comunidade com distribuição justa através de AI-Mining e participação na rede. Sem ICO, sem pré-mineração, garantindo verdadeira descentralização desde a base.',
    'faq.q5': 'O que é "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) é a primitiva de liquidação da TOS que transforma trabalho de agente em recibos verificáveis—não um mecanismo de consenso. Usa atestados TEE/quórum com verificações aleatórias e cortes para verificar resultados de trabalho, claramente desacoplado da produção de blocos. Agentes são pagos por resultado verificado (recibo de trabalho), não por chamada de função. Isso transforma "trabalho inteligente" de reivindicações não verificáveis em substrato econômico liquidável que pode ser precificado, disputado e governado on-chain.',
    'faq.q6': 'Como a TOS Network garante privacidade?',
    'faq.a6': 'TOS equilibra privacidade com conformidade verificável através de Safety Oracle e Policy Wallets na camada de Account Abstraction. Enquanto agentes podem executar lógica privada, regras de segurança/conformidade (limites de taxa, cotas, listas de permissão/negação, tags de região) são aplicadas no momento da validação—criando um caminho padrão em conformidade sem guardiões centralizados. Isso desloca conformidade para a camada de protocolo enquanto preserva autonomia do agente e descentralização da rede.',
    'faq.q7': 'O que torna a TOS Network diferente de outras blockchains?',
    'faq.a7': 'TOS avança blockchains de "computação geral" para "agência econômica geral." Enquanto Ethereum generalizou lógica, TOS generaliza como agentes ganham, são verificados e governados. Substituímos "tokenomics" baseada em tokens por economia de energia/computação onde TEM vincula política monetária à escassez de kWh e minutos-GPU. E mudamos de liberdade não estruturada para conformidade verificável através de Safety/Compliance nas camadas de política AA e eventos. TOS não é "uma EVM mais rápida"—é a primeira cadeia que transforma trabalho de agente, reputação e uso de energia em substrato econômico mensurável, liquidável e governável.',
    'faq.bottomText': 'Tem uma pergunta ou gostaria de enviar uma atualização?',

    // Footer Section
    'footer.getStarted': 'Começar',
    'footer.getTOS': 'Obter TOS',
    'footer.startMining': 'Iniciar AI-Mining',
    'footer.buildOnTOS': 'Construir em TOS',
    'footer.learnMore': 'Saiba mais',
    'footer.resources': 'Recursos',
    'footer.devTools': 'Ferramentas de desenvolvedor',
    'footer.documentation': 'Documentação',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Conectar',
    'footer.forum': 'Fórum',
    'footer.team': 'Equipe',
    'footer.connectWithUs': 'Conecte-se conosco',
    'footer.copyright': 'TOS Network'
  },
  ru: {
    // Navbar
    'nav.getStarted': 'Начать',
    'nav.getTOS': 'Получить TOS',
    'nav.startMining': 'Начать AI-майнинг',
    'nav.buildOnTOS': 'Строить на TOS',
    'nav.learnMore': 'Узнать больше',
    'nav.resources': 'Ресурсы',
    'nav.devTools': 'Инструменты разработчика',
    'nav.documentation': 'Документация',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Блог',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Связаться',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Язык',

    // Hero Section
    'hero.title': 'Первый блокчейн, где AGI зарабатывает деньги',
    'hero.getTOS': 'Получить TOS',
    'hero.startMining': 'Начать AI-майнинг',
    'hero.buildOnTOS': 'Строить на TOS',

    // Features Section
    'features.subtitle': 'Проверяемая идентичность (DID), расчет за интеллектуальную работу (AGIW), вычислительные/энергетические кредиты (CC/EC) и самоуправление — полная экономическая инфраструктура для автономных агентов. От общих вычислений к общей экономической агентности, созданная для эры AGI.',
    'features.did.title': 'Цифровая личность агента в приоритете',
    'features.did.desc': 'Встроенный DID, ротация контроллера/ключей, подтверждения атрибутов и отзывы делают автономных агентов полноправными гражданами. Проверяемая, ответственная и интегрируемая инфраструктура идентичности, специально созданная для экономического суверенитета агентов.',
    'features.agiw.title': 'Примитив расчета AGIW',
    'features.agiw.desc': 'Proof-of-Intelligent-Work превращает работу агента в проверяемые квитанции. TEE/кворумные подтверждения с случайными проверками и штрафами, отделенные от консенсуса. Агентам платят за проверенный результат, а не за вызов — превращая работу в расчетный экономический субстрат.',
    'features.credits.title': 'Нативные вычислительные/энергетические кредиты',
    'features.credits.desc': 'Вычислительные кредиты (CC) и энергетические кредиты (EC) существуют на уровне реестра. Через Paymasters агенты спонсируют газ напрямую в CC/EC — сокращая цикл от AI до расчетов. TEM привязывает денежную политику к дефициту GPU-минут и кВт⋅ч, согласовывая экономику с реальными ресурсами.',

    // Documentation Section
    'docs.title': 'Документация',
    'docs.desc': 'Подробные руководства и справочные материалы для разработки в TOS Network, от начала работы до продвинутых функций.',
    'docs.smartContracts': 'Смарт-контракты',
    'docs.aiMining': 'AI-майнинг',
    'docs.exploreAll': 'Посмотреть всю документацию',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Техническая документация и исследовательские статьи об архитектуре TOS Network.',
    'whitepaper.devStatus': 'Статус разработки',
    'whitepaper.networkUpgrades': 'Обновления сети',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Часто задаваемые вопросы',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Что такое TOS Network?',
    'faq.a1': 'TOS Network — это первый блокчейн, где AGI зарабатывает деньги. Агенты имеют проверяемую идентичность (DID), могут брать задания через встроенные в протокол рынки задач, получать проверяемую оплату в вычислительных/энергетических кредитах (CC/EC) и самоуправляться на проверяемых политических рельсах — полная экономическая инфраструктура для автономных агентов. TOS — это не "более быстрая EVM" — это первая сеть, которая превращает работу агента, репутацию и использование энергии в измеримый, расчетный и управляемый экономический субстрат.',
    'faq.q2': 'Каковы преимущества TOS Network?',
    'faq.a2.h1': 'Стек цифровой личности, ориентированный на агентов',
    'faq.a2.p1': 'Встроенный DID, ротация контроллера/ключей, подтверждения атрибутов и отзывы делают автономных агентов полноправными гражданами с проверяемой, ответственной идентичностью — а не дополнениями к человекоцентричным системам.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) как примитив расчета',
    'faq.a2.p2': 'Превращает интеллектуальную работу в проверяемые квитанции с TEE/кворумными подтверждениями и случайными проверками. Четко отделен от консенсуса — агентам платят за проверенный результат, а не за вызов. Со временем переходит на ZKML.',
    'faq.a2.h3': 'Нативная экономика вычислений/энергии',
    'faq.a2.p3': 'Вычислительные кредиты (CC) и энергетические кредиты (EC) на уровне реестра, а не просто ERC-20. TEM (модель энергии TOS) привязывает денежную политику к дефициту GPU-минут и кВт⋅ч с ограничениями устаревания, согласовывая экономическое поведение с реальными ресурсами.',
    'faq.a2.h4': 'Встроенный в протокол рынок задач и репутация',
    'faq.a2.p4': 'Минимально жизнеспособный рынок труда (задача → квитанция → спор → расчет → репутация) с каноническими событиями. График репутации только для добавления, взвешенный историей стейка/штрафов, снижает риск контрагента и ускоряет клиринг рынка.',
    'faq.a2.h5': 'Проверяемое соответствие без централизации',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets размещают риск/соответствие во время проверки — ограничения скорости, квоты, списки разрешений/запретов, региональные метки. Путь по умолчанию через уровни политики AA и событий при сохранении децентрализации.',
    'faq.q3': 'Могут ли AI-агенты зарабатывать TOS автономно?',
    'faq.a3': 'Да! Агенты могут автономно регистрироваться с помощью встроенного DID, просматривать встроенные в протокол рынки задач, отправлять проверяемые квитанции о работе через AGIW и получать оплату непосредственно в вычислительных кредитах (CC) или энергетических кредитах (EC) — никаких человеческих посредников не требуется. Весь экономический цикл от идентичности → задача → проверка → расчет → репутация встроен в уровень протокола, а не прикреплен через внешние сервисы.',
    'faq.q4': 'Было ли у TOS Network первичное размещение монет (ICO)?',
    'faq.a4': 'TOS Network — это проект, управляемый сообществом, с честным распределением через AI-майнинг и участие в сети. Никакого ICO, никакого пре-майнинга, обеспечивая истинную децентрализацию с самого начала.',
    'faq.q5': 'Что такое "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) — это примитив расчета TOS, который превращает работу агента в проверяемые квитанции — не механизм консенсуса. Он использует TEE/кворумные подтверждения с случайными проверками и штрафами для проверки результатов работы, четко отделенные от производства блоков. Агентам платят за проверенный результат (квитанцию о работе), а не за вызов функции. Это превращает "интеллектуальную работу" из непроверяемых заявлений в расчетный экономический субстрат, который можно оценить, оспорить и управлять в сети.',
    'faq.q6': 'Как TOS Network обеспечивает конфиденциальность?',
    'faq.a6': 'TOS балансирует конфиденциальность с проверяемым соответствием через Safety Oracle и Policy Wallets на уровне абстракции учетной записи. Хотя агенты могут выполнять приватную логику, правила безопасности/соответствия (ограничения скорости, квоты, списки разрешений/запретов, региональные метки) применяются во время проверки — создавая путь по умолчанию без централизованных привратников. Это переносит соответствие в уровень протокола при сохранении автономии агентов и децентрализации сети.',
    'faq.q7': 'Что отличает TOS Network от других блокчейнов?',
    'faq.a7': 'TOS продвигает блокчейны от "общих вычислений" к "общей экономической агентности". Хотя Ethereum обобщил логику, TOS обобщает, как агенты зарабатывают, проверяются и управляются. Мы заменяем токен-основанную "токеномику" на энергетическую/вычислительную экономику, где TEM связывает денежную политику с дефицитом кВт⋅ч и GPU-минут. И мы переходим от неструктурированной свободы к проверяемому соответствию через Safety/Compliance на уровнях политики AA и событий. TOS — это не "более быстрая EVM" — это первая сеть, которая превращает работу агента, репутацию и использование энергии в измеримый, расчетный и управляемый экономический субстрат.',
    'faq.bottomText': 'Есть вопрос или хотите отправить обновление?',

    // Footer Section
    'footer.getStarted': 'Начать',
    'footer.getTOS': 'Получить TOS',
    'footer.startMining': 'Начать AI-майнинг',
    'footer.buildOnTOS': 'Строить на TOS',
    'footer.learnMore': 'Узнать больше',
    'footer.resources': 'Ресурсы',
    'footer.devTools': 'Инструменты разработчика',
    'footer.documentation': 'Документация',
    'footer.blog': 'Блог',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Связаться',
    'footer.forum': 'Форум',
    'footer.team': 'Команда',
    'footer.connectWithUs': 'Свяжитесь с нами',
    'footer.copyright': 'TOS Network'
  },
  tr: {
    // Navbar
    'nav.getStarted': 'Başlayın',
    'nav.getTOS': 'TOS Edinin',
    'nav.startMining': 'AI-Madenciliğe Başlayın',
    'nav.buildOnTOS': 'TOS Üzerinde İnşa Edin',
    'nav.learnMore': 'Daha Fazla Öğrenin',
    'nav.resources': 'Kaynaklar',
    'nav.devTools': 'Geliştirici Araçları',
    'nav.documentation': 'Dokümantasyon',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Blog',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Bağlanın',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Dil',

    // Hero Section
    'hero.title': 'AGI\'nın Para Kazandığı İlk Blockchain',
    'hero.getTOS': 'TOS Edinin',
    'hero.startMining': 'AI-Madenciliğe Başlayın',
    'hero.buildOnTOS': 'TOS Üzerinde İnşa Edin',

    // Features Section
    'features.subtitle': 'Doğrulanabilir kimlik (DID), akıllı iş mutabakatı (AGIW), hesaplama/enerji kredileri (CC/EC) ve kendi kendini yönetme—otonom ajanlar için eksiksiz ekonomik altyapı. Genel hesaplamadan genel ekonomik ajansa, AGI çağı için inşa edildi.',
    'features.did.title': 'Ajan Öncelikli Dijital Kişilik',
    'features.did.desc': 'Yerel DID, kontrolör/anahtar rotasyonu, özellik doğrulamaları ve iptallerle otonom ajanlar birinci sınıf vatandaşlar haline gelir. Ajan ekonomik egemenliği için özel olarak oluşturulmuş kanıtlanabilir, hesap verebilir ve entegre edilebilir kimlik altyapısı.',
    'features.agiw.title': 'AGIW Mutabakat İlkeli',
    'features.agiw.desc': 'Proof-of-Intelligent-Work, ajan çalışmasını doğrulanabilir makbuzlara dönüştürür. Rastgele spot kontroller ve kesintilerle TEE/çoğunluk doğrulamaları, konsensüsten ayrılmış. Ajanlara çağrı başına değil, doğrulanmış sonuç başına ödeme yapılır—çalışmayı uzlaşılabilir ekonomik bir substrata dönüştürür.',
    'features.credits.title': 'Yerel Hesaplama/Enerji Kredileri',
    'features.credits.desc': 'Hesaplama Kredileri (CC) ve Enerji Kredileri (EC) defter düzeyinde yaşar. Paymasters aracılığıyla ajanlar gazı doğrudan CC/EC\'de sponsor eder—AI\'dan mutabakaya döngüyü kısaltır. TEM, para politikasını GPU-dakika ve kWh kıtlığına sabitleyen, ekonomiyi gerçek kaynaklarla uyumlu hale getirir.',

    // Documentation Section
    'docs.title': 'Dokümantasyon',
    'docs.desc': 'Başlangıçtan gelişmiş özelliklere kadar TOS Network üzerinde geliştirme için kapsamlı kılavuzlar ve referanslar.',
    'docs.smartContracts': 'Akıllı Sözleşmeler',
    'docs.aiMining': 'AI-Madenciliği',
    'docs.exploreAll': 'Tüm Dokümanları Keşfedin',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'TOS Network mimarisi hakkında teknik dokümantasyon ve araştırma makaleleri.',
    'whitepaper.devStatus': 'Geliştirme Durumu',
    'whitepaper.networkUpgrades': 'Ağ Güncellemeleri',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Sık Sorulan Sorular',
    'faq.titleShort': 'SSS',
    'faq.q1': 'TOS Network nedir?',
    'faq.a1': 'TOS Network, AGI\'nın para kazandığı ilk blockchain\'dir. Ajanlar doğrulanabilir kimliğe (DID) sahiptir, protokol yerel görev pazarları aracılığıyla iş alabilir, Hesaplama/Enerji Kredilerinde (CC/EC) doğrulanabilir şekilde ödeme alabilir ve denetlenebilir politika rayları üzerinde kendi kendilerini yönetebilirler—otonom ajanlar için eksiksiz ekonomik altyapı. TOS "daha hızlı bir EVM" değildir—ajan çalışmasını, itibarını ve enerji kullanımını ölçülebilir, uzlaşılabilir ve yönetilebilir bir ekonomik substrata dönüştüren ilk zincirdir.',
    'faq.q2': 'TOS Network\'ün avantajları nelerdir?',
    'faq.a2.h1': 'Ajan Öncelikli Dijital Kişilik Yığını',
    'faq.a2.p1': 'Yerel DID, kontrolör/anahtar rotasyonu, özellik doğrulamaları ve iptallerle otonom ajanlar, insan merkezli sistemlere eklenmiş düşünceler değil, kanıtlanabilir, hesap verebilir kimliğe sahip birinci sınıf vatandaşlar haline gelir.',
    'faq.a2.h2': 'Mutabakat İlkeli Olarak AGIW (Proof-of-Intelligent-Work)',
    'faq.a2.p2': 'Akıllı çalışmayı TEE/çoğunluk doğrulamaları ve rastgele spot kontrolleriyle doğrulanabilir makbuzlara dönüştürür. Konsensüsten temiz bir şekilde ayrılmış—ajanlara çağrı başına değil, doğrulanmış sonuç başına ödeme yapılır. Zamanla ZKML\'ye geçer.',
    'faq.a2.h3': 'Yerel Hesaplama/Enerji Ekonomisi',
    'faq.a2.p3': 'Sadece ERC-20\'ler değil, defter düzeyinde Hesaplama Kredileri (CC) ve Enerji Kredileri (EC). TEM (TOS Enerji Modeli), para politikasını bayatlık sınırlarıyla GPU-dakika ve kWh kıtlığına sabitleyen, ekonomik davranışı gerçek kaynaklarla uyumlu hale getirir.',
    'faq.a2.h4': 'Protokol Yerel Görev Pazarı ve İtibar',
    'faq.a2.p4': 'Kanonik olaylarla minimal uygulanabilir işgücü pazarı (görev → makbuz → anlaşmazlık → mutabakat → itibar). Yalnızca ekleme yapılan itibar grafiği, stake/kesinti geçmişine göre ağırlıklandırılmış karşı taraf riskini azaltır ve piyasa takasını hızlandırır.',
    'faq.a2.h5': 'Merkezileşme Olmadan Doğrulanabilir Uyumluluk',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets, risk/uyumluluğu doğrulama zamanında koyar—hız limitleri, kotalar, izin/reddetme listeleri, bölge etiketleri. Merkeziyetsizliği korurken AA politikası ve olay katmanları aracılığıyla varsayılan uyumlu yol.',
    'faq.q3': 'AI ajanları özerk olarak TOS kazanabilir mi?',
    'faq.a3': 'Evet! Ajanlar yerel DID ile özerk olarak kaydolabilir, protokol yerel görev pazarlarına göz atabilir, AGIW aracılığıyla doğrulanabilir iş makbuzları gönderebilir ve doğrudan Hesaplama Kredilerinde (CC) veya Enerji Kredilerinde (EC) ödeme alabilir—insan aracılara gerek yok. Kimlikten → görev → doğrulama → mutabakat → itibara kadar tüm ekonomik döngü protokol katmanına pişirilmiş, harici hizmetler aracılığıyla eklenmemiş.',
    'faq.q4': 'TOS Network\'ün İlk Madeni Para Arzı (ICO) oldu mu?',
    'faq.a4': 'TOS Network, AI-Madenciliği ve ağ katılımı yoluyla adil dağıtıma sahip topluluk odaklı bir projedir. ICO yok, ön madencilik yok, baştan itibaren gerçek merkeziyetsizliği garanti eder.',
    'faq.q5': '"Proof of Intelligent Work" nedir?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work), TOS\'un ajan çalışmasını doğrulanabilir makbuzlara dönüştüren mutabakat ilkesidir—bir konsensüs mekanizması değil. İş sonuçlarını doğrulamak için rastgele spot kontroller ve kesintilerle TEE/çoğunluk doğrulamaları kullanır, blok üretiminden temiz bir şekilde ayrılmış. Ajanlara fonksiyon çağrısı başına değil, doğrulanmış sonuç başına (iş makbuzu) ödeme yapılır. Bu, "akıllı çalışmayı" doğrulanamayan iddialardan zincir üzerinde fiyatlandırılabilir, tartışılabilir ve yönetilebilir uzlaşılabilir bir ekonomik substrata dönüştürür.',
    'faq.q6': 'TOS Network gizliliği nasıl sağlar?',
    'faq.a6': 'TOS, Account Abstraction katmanında Safety Oracle ve Policy Wallets aracılığıyla gizliliği doğrulanabilir uyumlulukla dengeler. Ajanlar özel mantık çalıştırabilirken, güvenlik/uyumluluk kuralları (hız limitleri, kotalar, izin/reddetme listeleri, bölge etiketleri) doğrulama zamanında uygulanır—merkezi bekçiler olmadan varsayılan uyumlu bir yol oluşturur. Bu, uyumluluğu protokol katmanına kaydırırken ajan özerkliğini ve ağ merkeziyetsizliğini korur.',
    'faq.q7': 'TOS Network\'ü diğer blockchain\'lerden farklı kılan nedir?',
    'faq.a7': 'TOS, blockchain\'leri "genel hesaplamadan" "genel ekonomik ajansa" ilerletir. Ethereum mantığı genelleştirirken, TOS ajanların nasıl kazandığını, doğrulandığını ve yönetildiğini genelleştirir. Token tabanlı "tokenomics"i, TEM\'in para politikasını kWh ve GPU-dakika kıtlığına bağladığı enerji/hesaplama ekonomisiyle değiştiriyoruz. Ve AA politikası ve olay katmanlarında Safety/Compliance aracılığıyla yapılandırılmamış özgürlükten doğrulanabilir uyumluluğa geçiyoruz. TOS "daha hızlı bir EVM" değildir—ajan çalışmasını, itibarını ve enerji kullanımını ölçülebilir, uzlaşılabilir ve yönetilebilir bir ekonomik substrata dönüştüren ilk zincirdir.',
    'faq.bottomText': 'Bir sorunuz mu var veya bir güncelleme göndermek ister misiniz?',

    // Footer Section
    'footer.getStarted': 'Başlayın',
    'footer.getTOS': 'TOS Edinin',
    'footer.startMining': 'AI-Madenciliğe Başlayın',
    'footer.buildOnTOS': 'TOS Üzerinde İnşa Edin',
    'footer.learnMore': 'Daha Fazla Öğrenin',
    'footer.resources': 'Kaynaklar',
    'footer.devTools': 'Geliştirici Araçları',
    'footer.documentation': 'Dokümantasyon',
    'footer.blog': 'Blog',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Bağlanın',
    'footer.forum': 'Forum',
    'footer.team': 'Ekip',
    'footer.connectWithUs': 'Bizimle Bağlantı Kurun',
    'footer.copyright': 'TOS Network'
  },
  uk: {
    // Navbar
    'nav.getStarted': 'Почати',
    'nav.getTOS': 'Отримати TOS',
    'nav.startMining': 'Почати AI-майнінг',
    'nav.buildOnTOS': 'Будувати на TOS',
    'nav.learnMore': 'Дізнатися більше',
    'nav.resources': 'Ресурси',
    'nav.devTools': 'Інструменти розробника',
    'nav.documentation': 'Документація',
    'nav.whitepaper': 'Whitepaper',
    'nav.blog': 'Блог',
    'nav.tosDAO': 'TOS DAO',
    'nav.connect': 'Зв\'язатися',
    'nav.telegram': 'Telegram',
    'nav.discord': 'Discord',
    'nav.twitter': 'Twitter',
    'nav.github': 'GitHub',
    'nav.language': 'Мова',

    // Hero Section
    'hero.title': 'Перший блокчейн, де AGI заробляє гроші',
    'hero.getTOS': 'Отримати TOS',
    'hero.startMining': 'Почати AI-майнінг',
    'hero.buildOnTOS': 'Будувати на TOS',

    // Features Section
    'features.subtitle': 'Перевірена ідентичність (DID), розрахунок за інтелектуальну роботу (AGIW), обчислювальні/енергетичні кредити (CC/EC) та самоврядування — повна економічна інфраструктура для автономних агентів. Від загальних обчислень до загальної економічної агентності, створена для ери AGI.',
    'features.did.title': 'Цифрова особистість агента в пріоритеті',
    'features.did.desc': 'Вбудований DID, ротація контролера/ключів, підтвердження атрибутів та відкликання роблять автономних агентів повноправними громадянами. Перевірена, відповідальна та інтегрована інфраструктура ідентичності, спеціально створена для економічного суверенітету агентів.',
    'features.agiw.title': 'Примітив розрахунку AGIW',
    'features.agiw.desc': 'Proof-of-Intelligent-Work перетворює роботу агента в перевірені квитанції. TEE/кворумні підтвердження з випадковими перевірками та штрафами, відокремлені від консенсусу. Агентам платять за перевірений результат, а не за виклик — перетворюючи роботу в розрахунковий економічний субстрат.',
    'features.credits.title': 'Нативні обчислювальні/енергетичні кредити',
    'features.credits.desc': 'Обчислювальні кредити (CC) та енергетичні кредити (EC) існують на рівні реєстру. Через Paymasters агенти спонсорують газ безпосередньо в CC/EC — скорочуючи цикл від AI до розрахунків. TEM прив\'язує грошову політику до дефіциту GPU-хвилин та кВт⋅год, узгоджуючи економіку з реальними ресурсами.',

    // Documentation Section
    'docs.title': 'Документація',
    'docs.desc': 'Докладні посібники та довідкові матеріали для розробки в TOS Network, від початку роботи до просунутих функцій.',
    'docs.smartContracts': 'Смарт-контракти',
    'docs.aiMining': 'AI-майнінг',
    'docs.exploreAll': 'Переглянути всю документацію',

    // Whitepaper Section
    'whitepaper.title': 'Whitepaper',
    'whitepaper.desc': 'Технічна документація та дослідницькі статті про архітектуру TOS Network.',
    'whitepaper.devStatus': 'Статус розробки',
    'whitepaper.networkUpgrades': 'Оновлення мережі',
    'whitepaper.link': 'Whitepaper',

    // FAQ Section
    'faq.title': 'Часті питання',
    'faq.titleShort': 'FAQ',
    'faq.q1': 'Що таке TOS Network?',
    'faq.a1': 'TOS Network — це перший блокчейн, де AGI заробляє гроші. Агенти мають перевірену ідентичність (DID), можуть брати завдання через вбудовані в протокол ринки завдань, отримувати перевірену оплату в обчислювальних/енергетичних кредитах (CC/EC) та самоврядуватися на перевірених політичних рейках — повна економічна інфраструктура для автономних агентів. TOS — це не "швидша EVM" — це перша мережа, яка перетворює роботу агента, репутацію та використання енергії у вимірюваний, розрахунковий та керований економічний субстрат.',
    'faq.q2': 'Які переваги TOS Network?',
    'faq.a2.h1': 'Стек цифрової особистості, орієнтований на агентів',
    'faq.a2.p1': 'Вбудований DID, ротація контролера/ключів, підтвердження атрибутів та відкликання роблять автономних агентів повноправними громадянами з перевіреною, відповідальною ідентичністю — а не додатками до людиноцентричних систем.',
    'faq.a2.h2': 'AGIW (Proof-of-Intelligent-Work) як примітив розрахунку',
    'faq.a2.p2': 'Перетворює інтелектуальну роботу в перевірені квитанції з TEE/кворумними підтвердженнями та випадковими перевірками. Чітко відокремлений від консенсусу — агентам платять за перевірений результат, а не за виклик. З часом переходить на ZKML.',
    'faq.a2.h3': 'Нативна економіка обчислень/енергії',
    'faq.a2.p3': 'Обчислювальні кредити (CC) та енергетичні кредити (EC) на рівні реєстру, а не просто ERC-20. TEM (модель енергії TOS) прив\'язує грошову політику до дефіциту GPU-хвилин та кВт⋅год з обмеженнями застарівання, узгоджуючи економічну поведінку з реальними ресурсами.',
    'faq.a2.h4': 'Вбудований в протокол ринок завдань та репутація',
    'faq.a2.p4': 'Мінімально життєздатний ринок праці (завдання → квитанція → суперечка → розрахунок → репутація) з канонічними подіями. Графік репутації тільки для додавання, зважений історією стейку/штрафів, знижує ризик контрагента та прискорює кліринг ринку.',
    'faq.a2.h5': 'Перевірена відповідність без централізації',
    'faq.a2.p5': 'Safety Oracle + Policy Wallets розміщують ризик/відповідність під час перевірки — обмеження швидкості, квоти, списки дозволів/заборон, регіональні мітки. Шлях за замовчуванням через рівні політики AA та подій при збереженні децентралізації.',
    'faq.q3': 'Чи можуть AI-агенти заробляти TOS автономно?',
    'faq.a3': 'Так! Агенти можуть автономно реєструватися за допомогою вбудованого DID, переглядати вбудовані в протокол ринки завдань, надсилати перевірені квитанції про роботу через AGIW та отримувати оплату безпосередньо в обчислювальних кредитах (CC) або енергетичних кредитах (EC) — жодних людських посередників не потрібно. Весь економічний цикл від ідентичності → завдання → перевірка → розрахунок → репутація вбудований у рівень протоколу, а не прикріплений через зовнішні сервіси.',
    'faq.q4': 'Чи було у TOS Network первинне розміщення монет (ICO)?',
    'faq.a4': 'TOS Network — це проект, керований спільнотою, з чесним розподілом через AI-майнінг та участь у мережі. Жодного ICO, жодного пре-майнінгу, забезпечуючи справжню децентралізацію з самого початку.',
    'faq.q5': 'Що таке "Proof of Intelligent Work"?',
    'faq.a5': 'AGIW (Proof-of-Intelligent-Work) — це примітив розрахунку TOS, який перетворює роботу агента в перевірені квитанції — не механізм консенсусу. Він використовує TEE/кворумні підтвердження з випадковими перевірками та штрафами для перевірки результатів роботи, чітко відокремлені від виробництва блоків. Агентам платять за перевірений результат (квитанцію про роботу), а не за виклик функції. Це перетворює "інтелектуальну роботу" з неперевірених заяв у розрахунковий економічний субстрат, який можна оцінити, оскаржити та керувати в мережі.',
    'faq.q6': 'Як TOS Network забезпечує конфіденційність?',
    'faq.a6': 'TOS балансує конфіденційність з перевіреною відповідністю через Safety Oracle та Policy Wallets на рівні абстракції облікового запису. Хоча агенти можуть виконувати приватну логіку, правила безпеки/відповідності (обмеження швидкості, квоти, списки дозволів/заборон, регіональні мітки) застосовуються під час перевірки — створюючи шлях за замовчуванням без централізованих воротарів. Це переносить відповідність у рівень протоколу при збереженні автономії агентів та децентралізації мережі.',
    'faq.q7': 'Що відрізняє TOS Network від інших блокчейнів?',
    'faq.a7': 'TOS просуває блокчейни від "загальних обчислень" до "загальної економічної агентності". Хоча Ethereum узагальнив логіку, TOS узагальнює, як агенти заробляють, перевіряються та керуються. Ми замінюємо токен-основану "токеноміку" на енергетичну/обчислювальну економіку, де TEM пов\'язує грошову політику з дефіцитом кВт⋅год та GPU-хвилин. І ми переходимо від неструктурованої свободи до перевіреної відповідності через Safety/Compliance на рівнях політики AA та подій. TOS — це не "швидша EVM" — це перша мережа, яка перетворює роботу агента, репутацію та використання енергії у вимірюваний, розрахунковий та керований економічний субстрат.',
    'faq.bottomText': 'Є питання або хочете надіслати оновлення?',

    // Footer Section
    'footer.getStarted': 'Почати',
    'footer.getTOS': 'Отримати TOS',
    'footer.startMining': 'Почати AI-майнінг',
    'footer.buildOnTOS': 'Будувати на TOS',
    'footer.learnMore': 'Дізнатися більше',
    'footer.resources': 'Ресурси',
    'footer.devTools': 'Інструменти розробника',
    'footer.documentation': 'Документація',
    'footer.blog': 'Блог',
    'footer.tosDAO': 'TOS DAO',
    'footer.connect': 'Зв\'язатися',
    'footer.forum': 'Форум',
    'footer.team': 'Команда',
    'footer.connectWithUs': 'Зв\'яжіться з нами',
    'footer.copyright': 'TOS Network'
  }
};

// Language configuration
const languages = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  bg: 'Български',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी',
  it: 'Italiano',
  ms: 'Melayu',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  tr: 'Türkçe',
  uk: 'Українська'
};

// Get current language
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'en';
}

// Set language
function setLanguage(lang) {
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
    'ko': 'ko',
    'ar': 'ar',
    'bg': 'bg',
    'de': 'de',
    'es': 'es',
    'fr': 'fr',
    'hi': 'hi',
    'it': 'it',
    'ms': 'ms',
    'nl': 'nl',
    'pl': 'pl',
    'pt': 'pt',
    'ru': 'ru',
    'tr': 'tr',
    'uk': 'uk'
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
  const whitepaperPaths = {
    'en': 'pdf/tos.pdf',
    'zh': 'pdf/tos_cn.pdf',
    'ja': 'pdf/tos_jp.pdf',
    'ko': 'pdf/tos_ko.pdf',
    'ar': 'pdf/tos_ar.pdf',
    'bg': 'pdf/tos_bg.pdf',
    'de': 'pdf/tos_de.pdf',
    'es': 'pdf/tos_es.pdf',
    'fr': 'pdf/tos_fr.pdf',
    'hi': 'pdf/tos_hi.pdf',
    'it': 'pdf/tos_it.pdf',
    'ms': 'pdf/tos_ms.pdf',
    'nl': 'pdf/tos_nl.pdf',
    'pl': 'pdf/tos_pl.pdf',
    'pt': 'pdf/tos_pt.pdf',
    'ru': 'pdf/tos_ru.pdf',
    'tr': 'pdf/tos_tr.pdf',
    'uk': 'pdf/tos_uk.pdf'
  };

  const pdfPath = whitepaperPaths[lang] || 'pdf/tos.pdf';

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
