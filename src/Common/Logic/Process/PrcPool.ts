/**
 * 流程处理逻辑 池;
 */
namespace PrcPool {
    export const enum E_Prc {
        // 0 保留为错误标识;
        Start = 1,
        Loading,
        MainGame,
    }

    export function Init(): void {
        // 注册游戏流程;
        PrcMgr.Add(E_Prc.Start, new Prc_Start());
        PrcMgr.Add(E_Prc.Loading, new Prc_Loading());
        // PrcMgr.Add(E_Prc.MainGame, new ICarry.Prc_MainGame());
    }
}