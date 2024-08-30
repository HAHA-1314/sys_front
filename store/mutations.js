// 保存当前菜单栏的路径
export const savePath = (state, pathName) => {
    state.pathName = pathName;
  };
   
  // 保存当前点击的数据源
  export const saveCurrDbSource = (state, currDbSource) => {
    state.currDbSource = currDbSource;
  };
   
  // 保存当前点击的元数据
  export const saveCurrJobData = (state, currJobData) => {
    state.currJobData = null;
    state.currJobData = currJobData;
  };
   
  // 保存所有数据源
  export const saveDbSource = (state, DbSource) => {
    state.DbSource = DbSource;
  };
   
  // 保存搜索后选择的那一条元数据
  export const saveSelectJobMeta = (state, selectJobMeta) => {
    state.selectJobMeta = selectJobMeta;
  };
   
  // 保存搜索的那一类专题
  export const saveSpecialSubject = (state, specialSubject) => {
    state.specialSubject = specialSubject;
    state.selectJobMeta = {};
  };
   
  // 保存复制的元数据（名称为空）
  export const saveDuplicateJobMeta = (state, duplicateJobMeta) => {
    state.duplicateJobMeta = duplicateJobMeta;
  };