/**
 * 显示层 管理器;
 */
class ViewMgr {
    private _root: PopMgr;         // 普通游戏层;
    private _guide: PopMgr;        // 新手引导层(要求始终在游戏层上一层);


    public Init(stage: egret.Stage) {
        // 层级节点;
        let grRoot: eui.Group = new eui.Group();
        let grGuide: eui.Group = new eui.Group();

        // 游戏层节点 设置为 100% 宽高; 便于子节点自适应;
        grRoot.percentWidth = 100;
        grRoot.percentHeight = 100;

        // 添加到舞台;
        stage.addChild(grRoot);
        stage.addChild(grGuide);

        // 创建对应的弹窗管理器;
        this._root = new PopMgr(grRoot);
        this._guide = new PopMgr(grGuide);
    }

    /* 普通游戏层 根节点获得; 增加一层接口, 方便以后需要时进行修改; */
    public get root(): PopMgr {
        return this._root;
    }
    /* 新手引导层 根节点获得 */
    public get guide(): PopMgr {
        return this._guide;
    }
}