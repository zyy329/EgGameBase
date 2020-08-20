/**
 * egret 生命周期控制类;
 */
namespace LifeCycle {
    const UP_TIME: number = 100;        // 逻辑代码固定更新时间间隔;

    let _lastTimeStamp: number;         // 最后一次更新时间戳;
    let _updateDelta: number = 0;       // 更新间隔时间;


    export function Init(): void {
        // 生命周期
        egret.lifecycle.addLifecycleListener((ct) => {
            ct.onUpdate = () => {
                // 运行时间差计算;
                let curTime = egret.getTimer();
                // 计算运行间隔;
                _updateDelta += _lastTimeStamp ? curTime - _lastTimeStamp : UP_TIME;

                // 更新主逻辑;
                if (_updateDelta >= UP_TIME) {
                    heart(UP_TIME);
                    _updateDelta -= UP_TIME;
                }
                // 更新 最后一次更新时间戳;
                _lastTimeStamp = curTime;
            }
        })

        egret.lifecycle.onPause = onPause;
        egret.lifecycle.onResume = onResume;
    }

    // 生命周期心跳 (UP_TIME 执行一次)
    function heart(timeSpan: number): void {
        PrcMgr.Update(timeSpan);
    }
    // 暂停处理;
    function onPause(): void {
    }
    // 暂停处理;
    function onResume(): void {
        egret.ticker.resume();
    }
}