import{ag as n,ah as i,ai as l}from"./main-zFq7zC_h.js";import"./index-BfZ0Q78_.js";const a=n({selectId:t=>t.id}),d={cards:[]},s=i({name:"cardEntries",initialState:a.getInitialState(d),reducers:{setCard:(t,e)=>{t.entities[e.payload.id]=e.payload},setCards:(t,e)=>{a.setAll(t,e.payload.map(r=>({...r,isDragging:!1}))),t.cards=e.payload}}}),o={id:null,offset:{x:0,y:0}},c=i({name:"select",initialState:o,reducers:{setSelect(t,e){Object.assign(t,e.payload)}}}),S="github",u=l(c,s),m={...c.actions,...s.actions};export{m as githubActions,S as githubPrefix,u as githubReducer};
