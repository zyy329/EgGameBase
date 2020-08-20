/**
 * 流程处理逻辑 管理类;
 */
class PrcMgr {
    // 等待激活标记
    private static wait_to_active = false;
    // 等待激活目标流程标签;
    private static active_key = 0;

    // 当前正在执行的 流程;
    private static cur: PrcBase = null;
    // 已注册流程容器;
    private static prcMap: { [key: number]: PrcBase } = {};
    // 流程切换中标记;
    private static _inSwitch = false;




    // 请求 激活/切换 当前流程处理逻辑;
    public static Active(key: number) {
        this.wait_to_active = true;
        this.active_key = key;
        LogMgr.Debug(this, `Active ${key}`);
    }

    // 流程处理逻辑 激活切换处理;
    public static async DealActive() {
        if (!this.wait_to_active)
            return;

        this.wait_to_active = false;
        this._inSwitch = true;
        do {
            let temp = this.prcMap[this.active_key];

            if (!temp) {
                // 目标处理流程不存在;
                break;
            }

            if (this.cur) {
                // 触发当前处理流程 失活处理逻辑;
                this.cur.OnDeactive();
            }

            // 替换为新的处理流程;
            this.cur = temp;
            await this.cur.OnActive();
        } while (false);

        this._inSwitch = false;
    }

    // 更新当前激活的流程处理逻辑;
    // timeSpan, 距离上次更新的时间差; 单位毫秒;
    public static Update(timeSpan: number) {
        PrcMgr.DealActive();

        if (this._inSwitch) {
            // 切换流程中, 不执行更新逻辑;
            return;
        }

        if (this.cur) {
            this.cur.Update(timeSpan);
        }
    }


    // 向管理器中添加新的流程处理逻辑;
    public static Add(key: number, prc: PrcBase) {
        if (this.prcMap[key])
            return;
        this.prcMap[key] = prc;
    }

    // 从管理器中移除流程处理逻辑;
    public static Remove(key: number) {
        delete this.prcMap[key];
    }
}