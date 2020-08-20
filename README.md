# EgameBase
    自用egeret客户端 开发框架
    设计, 根据自身的需求, 经验, 再单独设计符合自身项目开发的基础框架, 规定

##总结:
    1. ui 类中混杂了太多逻辑代码, 变得很庞大
    2. 复杂的, 不那么易用的框架规则, 在实际执行中容易走样;
    3. 消息通知机制用起来 稍显繁琐; 主要目的是松耦合;
    4. 分系统组织 工具类, 枚举, 不属于特定系统的才写入公共模块中;
    5. 版本差异化文件(Platform.ts js) 的管理优化;
        分成多个文件;
        更多版本相关内容划入 Platform;
        Platform.ts 中只保留接口;
    6. Data 数据 承载了部分逻辑功能, 应使其更单纯化; 但只处理数据读写 的 基本功能;
    8. View 组织框架: 统一流程化 View 的加入/撤离 显示舞台的方式/逻辑;
	9. 网络处理代码拆分
	10. 资源管理需要强化

##框架的个人认知:
    1. 框架的作用: 规定代码的组织方式, 指导开发工作中 新加入的代码该写到哪里去; 逻辑代码之间该如何拆分;
    2. 框架的目标:
        (1) 易用性, 易于执行;(否则实际执行中容易违反)
        (2) 使得代码逻辑清晰, 不混乱;
        (3) 易于扩展
        (4) 易读, 易理解
        (5) 按框架的规则设计 可清晰的帮助分拆逻辑, 控制每个代码文件不要过大;
        (6) 指导代码模块间能尽量的 高内聚, 低耦合



##概念划分:
    View: (可被 (多个)View Logic 操控)
        单纯化, 只处理 页面的基础控制, 复杂控制逻辑交给 View Logic;
        需要一个 View 组织框架:
            统一流程化 View 的加入/撤离 显示舞台的方式/逻辑
            通用的 create, realse 回调接口;

    ViewLogic:
        页面控制逻辑;         (对 View 的操作处理)
        将页面的 业务逻辑抽离出来, 单纯化View 的功能; 并利于 View Logic 的进一步拆分;

    SysLogic:
        游戏业务处理逻辑; (对 Data 的操作处理)

    Data:
        游戏 数据;
        单纯化, 只处理 数据的 读写 基本功能;

    Process logic;
        流程控制处理逻辑; 操控目标对象: SysLogic, ViewLogic
    NetLogic:
        网络响应处理逻辑; 操控目标对象: SysLogic, ViewLogic

##管理器:
    ViewMgr:
        统一流程化 View 的加入/撤离 显示舞台的方式/逻辑
        通用的 create, realse 回调接口;
        可通过 ViewMgr 访问到所有的 View;
    VLgcPool:
        ViewLogic 容器;
        可通过 VLgcPool 访问到所有的 ViewLogic;
    LgcPool:
        SysLogic 容器;
        可通过 LgcPool 访问到所有的 SysLogic;
    DataPool:
        可通过 DataPool 访问到所有的 Data 数据;

##可见性(读写权限):
    Data: 仅对 SysLogic 可见;
    View: 仅对 View Logic 可见
    View Logic 与 Logic 相互可见;
##技术上实现该可见性限制的方式:
    所有Logic 继承自 LogicBase; LogicBase 包含:
        protected static DataPool;
    所有ViewLogic 继承自 VLogicBase; VLogicBase 包含:
        protected static ViewMgr;
    VLgcPool, LgcPool 全局可见;
    View, Data 单纯化, 不包含复杂逻辑;

##组织划分:
    --BaseFrame(可多个项目间重用的工具代码 -- 可先写入Common, 在实际使用中发现是比较通用的, 再移动到该文件夹下)
    --Common(游戏主体代码)
        --View
            --ViewMgr
            --按模块划分
                --View
        --Logic
            --View
                --VLgcPool
                --按模块划分
                    --ViewLogic
            --Sys
                --LgcPool
                --按模块划分
                    --SysLogic
            --ProcessLogic
            --NetLogic
                --网络基础代码
                --Command(MsgHandler, 一个消息, 一条)
        --Data
            --DataPool
            --通用数据(不属于特定系统模块)
            --按系统模块划分(或者通过命名的方式来划分)
        --配置表
        --全局常量(尽量划分到各个系统模块中, 无法划分的才放到这里)
            --枚举
            --常量
        --Platform(平台相关代码/接口)
        --Eg(Egret 相关代码, 比如入口 Main.ts)