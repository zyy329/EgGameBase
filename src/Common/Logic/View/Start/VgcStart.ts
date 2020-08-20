/**
 * 开始页面 控制系统;
 */
class VgcStart extends VgcBase{
    private _uiName: string;

    // 显示开始页面;
    public Show() {
        let ui = new VStart();
        this._uiName = ui.Name;
        VgcBase.vi.root.Pop(ui);
    }

    // 关闭开始页面;
    public Close() {
        VgcBase.vi.root.Remove(this._uiName);
    }

    // 开始页面是否播放结束;
    public IsFinish(): boolean {
        let ui: VStart = <VStart>VgcBase.vi.root.GetPop(this._uiName);
        return ui ? ui.IsFinish() : false;
    }
}