// utils/loadState.ts
export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem("taskFilters");
      if (!serializedState) return undefined;
      return JSON.parse(serializedState);
    } catch {
      return undefined;
    }
  };
  
  export const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem("taskFilters", serializedState);
    } catch {}
  };
  