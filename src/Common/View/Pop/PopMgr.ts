/**
 * 弹窗管理器;
 * 
 * 可同时存在多级弹窗; (从0 开始依次往上累加)
 * 每一级只允许存在一个弹窗
 * 当较小级别的弹窗被移除时, 所有级别大于它的也会被自动移除;
 * 自带蒙版支持;
 */
class PopMgr {
    // 弹窗根节点;
    private _root: eui.Group;
    // 弹窗队列; 从0 开始, 一级一个弹窗, 依次占用队列;
    private _popArr: Array<PopObj> = new Array<PopObj>();
    // 弹窗查找容器; first: popName; second: PopObj;
    private _popMap: { [name: string]: PopObj } = {}


    public constructor(root: eui.Group) {
        this._root = root;
    }

    /**
     * 弹出新的窗口; 弹窗级别自动增加;
     * @param pop, 将要弹出的窗口对象;
     * @param isSp, 是否附带蒙版;
     * @return 当前弹窗的层级(从0 开始依次往上累加);
     */
    public Pop(pop: VPop, isSp: boolean = false): number {
        if (!pop) {
            // 非法 pop;
            return;
        }

        // 弹窗对象创建;
        let popObj = new PopObj();

        // 新弹窗级别;
        popObj._lev = this._popArr.length;

        // 蒙版;
        if (isSp) {
            popObj._mask = new VMask();
            this._root.addChild(popObj._mask);
            pop.addEventListener(egret.TouchEvent.TOUCH_TAP, pop.onClickMask, pop);
        }

        // 弹窗对象;
        popObj._pop = pop;
        this._root.addChild(pop);

        // 加入容器;
        this._popArr.push(popObj);
        this._popMap[pop.Name] = popObj;

        return popObj._lev;
    }

    // 移除最高一级弹窗;
    // @return 被删除弹窗的级别;
    public RemoveLast(): number {
        // 从队列中删除;
        let last: PopObj = this._popArr.pop();
        let pop: VPop = last._pop;

        // 从查找容器中删除;
        delete this._popMap[pop.Name];

        // 移除弹窗;
        NodeTool.rmvChild(pop);

        // 移除蒙版;
        NodeTool.rmvChild(last._mask);

        return last._lev;
    }

    // 移除指定弹窗;
    public Remove(popName: string) {
        // 获得指定弹窗;
        let popObj = this.GetPopObj(popName);
        if (!popObj) {
            return;
        }

        // 从最高级别, 依次删除所有级别 >= 该对象的弹窗
        let lev = popObj._lev;
        let delLev = 0;
        do {
            delLev = this.RemoveLast();
        } while (delLev > lev);
    }


    // 获得指定弹窗;
    public GetPop(popName: string): VPop {
        let popObj = this.GetPopObj(popName);
        return popObj ? popObj._pop : null;
    }

    // 获得指定弹窗结构体;
    private GetPopObj(popName: string): PopObj {
        let popObj = this._popMap[popName];
        if (popObj == undefined) {
            // 弹窗容器中没有该弹窗, 退出;
            LogMgr.Error(this, `pop not in PopMgr; [popName:${popName}]`);
            return null;
        }
        return popObj;
    }
}

class PopObj {
    // 弹窗的主体显示对象;
    public _pop: VPop;
    // 弹窗附带的蒙版对象;
    public _mask: VMask = null;
    // 弹窗级别;
    public _lev: number;
}