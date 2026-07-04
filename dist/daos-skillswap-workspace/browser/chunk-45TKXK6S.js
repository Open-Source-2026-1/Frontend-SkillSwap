import{a as Ne}from"./chunk-LL4YBOKK.js";import{a as te}from"./chunk-XYVSH4DR.js";import"./chunk-Q3DAP65F.js";import{c as Pe,d as De}from"./chunk-EEFDCMZY.js";import{a as Te,b as Se,g as Me,h as ze}from"./chunk-GOHYD6J5.js";import{a as ue,b as pe,c as be,d as k,f as fe,g as _e,i as u,j as ve,k as we,l as ye,m as ke,n as xe,r as Ce,u as Ee,v as Ie}from"./chunk-YONHZQHG.js";import{a as ie}from"./chunk-ODYZZUNY.js";import{a as he,b as ge}from"./chunk-LMVWDZAA.js";import{C as de,E as ce,F as me,d as ne,e as ae,n as re,v as le,y as oe,z as se}from"./chunk-PQ4DDLZN.js";import"./chunk-S273XI22.js";import{o as ee}from"./chunk-XW7H45GI.js";import{$ as w,Ab as B,Db as g,Eb as f,Fb as U,Gb as G,Ib as j,Jb as X,Kb as Q,Ma as s,Ob as $,P,Qb as S,R as D,Rb as H,Sb as r,T as N,Ub as M,V as d,Za as x,_ as v,_a as L,aa as O,ac as Z,ga as I,kb as C,kc as Y,la as y,lb as p,mb as b,mc as J,oa as F,ob as V,pb as A,qb as q,qc as K,ra as R,rb as h,sb as a,sc as _,tb as i,tc as W,ub as c,zb as T}from"./chunk-5N5ZSK7Y.js";import"./chunk-2NFLSA4Y.js";var Ve=["switch"],Ae=["*"];function qe(n,o){n&1&&(a(0,"span",11),O(),a(1,"svg",13),c(2,"path",14),i(),a(3,"svg",15),c(4,"path",16),i()())}var Be=new N("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),E=class{source;checked;constructor(o,e){this.source=o,this.checked=e}},z=(()=>{class n{_elementRef=d(R);_focusMonitor=d(ne);_changeDetectorRef=d(K);defaults=d(Be);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new E(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=le();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new I;toggleChange=new I;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){d(ae).load(se);let e=d(new J("tabindex"),{optional:!0}),l=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=l.color||"accent",this.id=this._uniqueId=d(re).getId("mat-mdc-slide-toggle-"),this.hideIcon=l.hideIcon??!1,this.disabledInteractive=l.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new E(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(l){return new(l||n)};static \u0275cmp=x({type:n,selectors:[["mat-slide-toggle"]],viewQuery:function(l,t){if(l&1&&j(Ve,5),l&2){let m;X(m=Q())&&(t._switchElement=m.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(l,t){l&2&&(B("id",t.id),C("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),H(t.color?"mat-"+t.color:""),S("mat-mdc-slide-toggle-focused",t._focused)("mat-mdc-slide-toggle-checked",t.checked)("_mat-animation-noopable",t._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",_],color:"color",disabled:[2,"disabled","disabled",_],disableRipple:[2,"disableRipple","disableRipple",_],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:W(e)],checked:[2,"checked","checked",_],hideIcon:[2,"hideIcon","hideIcon",_],disabledInteractive:[2,"disabledInteractive","disabledInteractive",_]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Z([{provide:ue,useExisting:P(()=>n),multi:!0},{provide:be,useExisting:n,multi:!0}]),F],ngContentSelectors:Ae,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(l,t){if(l&1&&(U(),a(0,"div",1)(1,"button",2,0),g("click",function(){return t._handleClick()}),c(3,"div",3)(4,"span",4),a(5,"span",5)(6,"span",6)(7,"span",7),c(8,"span",8),i(),a(9,"span",9),c(10,"span",10),i(),p(11,qe,5,0,"span",11),i()()(),a(12,"label",12),g("click",function(Re){return Re.stopPropagation()}),G(13),i()()),l&2){let m=$(2);h("labelPosition",t.labelPosition),s(),S("mdc-switch--selected",t.checked)("mdc-switch--unselected",!t.checked)("mdc-switch--checked",t.checked)("mdc-switch--disabled",t.disabled)("mat-mdc-slide-toggle-disabled-interactive",t.disabledInteractive),h("tabIndex",t.disabled&&!t.disabledInteractive?-1:t.tabIndex)("disabled",t.disabled&&!t.disabledInteractive),C("id",t.buttonId)("name",t.name)("aria-label",t.ariaLabel)("aria-labelledby",t._getAriaLabelledBy())("aria-describedby",t.ariaDescribedby)("aria-required",t.required||null)("aria-checked",t.checked)("aria-disabled",t.disabled&&t.disabledInteractive?"true":null),s(9),h("matRippleTrigger",m)("matRippleDisabled",t.disableRipple||t.disabled)("matRippleCentered",!0),s(),b(t.hideIcon?-1:11),s(),h("for",t.buttonId),C("id",t._labelId)}},dependencies:[oe,Ne],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return n})(),Oe=(()=>{class n{static \u0275fac=function(l){return new(l||n)};static \u0275mod=L({type:n});static \u0275inj=D({imports:[z,de]})}return n})();function Ge(n,o){n&1&&(a(0,"div",4)(1,"mat-icon"),r(2,"error_outline"),i(),a(3,"p"),r(4,"No se encontr\xF3 tu perfil de tutor."),i()())}function je(n,o){n&1&&(a(0,"div",5)(1,"mat-icon"),r(2,"check_circle"),i(),r(3," Tu perfil se actualiz\xF3 correctamente. "),i())}function Xe(n,o){if(n&1&&(a(0,"div",6)(1,"mat-icon"),r(2,"error"),i(),r(3),i()),n&2){let e=f(2);s(3),M(" ",e.error()," ")}}function Qe(n,o){n&1&&(a(0,"mat-error"),r(1,"Al menos 20 caracteres"),i())}function $e(n,o){if(n&1){let e=T();a(0,"span",18),r(1),a(2,"mat-icon",26),g("click",function(){let t=v(e).$implicit,m=f(2);return w(m.removeSkill(t))}),r(3,"close"),i()()}if(n&2){let e=o.$implicit;s(),M(" ",e," ")}}function He(n,o){n&1&&(a(0,"span",19),r(1,"Agrega al menos una habilidad"),i())}function Ze(n,o){if(n&1){let e=T();p(0,je,4,0,"div",5),p(1,Xe,4,1,"div",6),a(2,"form",7),g("ngSubmit",function(){v(e);let t=f();return w(t.submit())}),a(3,"mat-form-field",8)(4,"mat-label"),r(5,"Universidad"),i(),c(6,"input",9),i(),a(7,"mat-form-field",8)(8,"mat-label"),r(9,"Especialidad principal"),i(),c(10,"input",10),i(),a(11,"mat-form-field",8)(12,"mat-label"),r(13,"Sobre ti"),i(),c(14,"textarea",11),p(15,Qe,2,0,"mat-error"),i(),a(16,"div",12)(17,"label",13),r(18,"Cursos / habilidades que ense\xF1as"),i(),a(19,"div",14)(20,"input",15),g("keydown.enter",function(t){v(e);let m=f();return t.preventDefault(),w(m.addSkill())}),i(),a(21,"button",16),g("click",function(){v(e);let t=f();return w(t.addSkill())}),a(22,"mat-icon"),r(23,"add"),i()()(),a(24,"div",17),A(25,$e,4,1,"span",18,V),i(),p(27,He,2,0,"span",19),i(),a(28,"mat-form-field",8)(29,"mat-label"),r(30,"A\xF1os de experiencia"),i(),c(31,"input",20),i(),a(32,"mat-form-field",8)(33,"mat-label"),r(34,"URL de foto de perfil"),i(),c(35,"input",21),i(),a(36,"mat-form-field",8)(37,"mat-label"),r(38,"Portafolio / trabajos (opcional)"),i(),c(39,"input",22),i(),a(40,"div",23)(41,"mat-slide-toggle",24),r(42," Disponible para nuevas tutor\xEDas "),i()(),a(43,"button",25)(44,"mat-icon"),r(45,"save"),i(),r(46," Guardar cambios "),i()()}if(n&2){let e=f();b(e.saved()?0:-1),s(),b(e.error()?1:-1),s(),h("formGroup",e.form),s(13),b(e.form.get("bio").touched&&e.form.get("bio").hasError("minlength")?15:-1),s(5),h("formControl",e.skillInput),s(5),q(e.skills()),s(2),b(e.skills().length===0?27:-1),s(16),h("disabled",e.form.invalid||e.skills().length===0||e.saving())}}var Fe=class n{fb=d(Ee);router=d(ee);discoveryStore=d(te);iamStore=d(ie);saving=y(!1);error=y(null);saved=y(!1);tutorId=this.iamStore.currentTutorId();currentTutor=Y(()=>this.tutorId?this.discoveryStore.getTutorById(this.tutorId)():void 0);skills=y(this.currentTutor()?.skills??[]);skillInput=new u("",{nonNullable:!0});form=this.fb.group({university:new u(this.currentTutor()?.university??"",{nonNullable:!0,validators:[k.required]}),specialty:new u(this.currentTutor()?.specialty??"",{nonNullable:!0,validators:[k.required]}),bio:new u(this.currentTutor()?.bio??"",{nonNullable:!0,validators:[k.required,k.minLength(20)]}),avatarUrl:new u(this.currentTutor()?.avatarUrl??"",{nonNullable:!0}),portfolioUrl:new u(this.currentTutor()?.portfolioUrl??"",{nonNullable:!0}),yearsExperience:new u(this.currentTutor()?.yearsExperience??0,{nonNullable:!0}),available:new u(this.currentTutor()?.available??!0,{nonNullable:!0})});addSkill(){let o=this.skillInput.value.trim();!o||this.skills().includes(o)||(this.skills.update(e=>[...e,o]),this.skillInput.reset())}removeSkill(o){this.skills.update(e=>e.filter(l=>l!==o))}submit(){if(this.form.invalid||this.skills().length===0||!this.tutorId)return;let o=this.currentTutor();o&&(this.saving.set(!0),this.error.set(null),this.saved.set(!1),this.discoveryStore.updateTutor(this.tutorId,{name:o.name,university:this.form.value.university,bio:this.form.value.bio,skills:this.skills(),available:this.form.value.available,avatarUrl:this.form.value.avatarUrl,specialty:this.form.value.specialty,portfolioUrl:this.form.value.portfolioUrl??"",yearsExperience:this.form.value.yearsExperience??0}).subscribe({next:()=>{this.saving.set(!1),this.saved.set(!0)},error:e=>{this.error.set(e instanceof Error?e.message:"No se pudo actualizar tu perfil"),this.saving.set(!1)}}))}goBack(){this.router.navigate(["/reputation/my-profile"]).then()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=x({type:n,selectors:[["app-edit-tutor-profile"]],decls:12,vars:1,consts:[[1,"edit-container"],[1,"edit-card"],["mat-button","",1,"btn-back",3,"click"],[1,"edit-title"],[1,"edit-empty"],[1,"edit-success"],[1,"edit-error"],[1,"edit-form",3,"ngSubmit","formGroup"],["appearance","outline",1,"full-width"],["matInput","","formControlName","university"],["matInput","","formControlName","specialty"],["matInput","","formControlName","bio","rows","3"],[1,"skills-field"],[1,"skills-label"],[1,"skills-input-row"],["placeholder","Ej: C\xE1lculo 2",1,"skill-input",3,"keydown.enter","formControl"],["mat-stroked-button","","type","button",3,"click"],[1,"skills-chips"],[1,"skill-chip"],[1,"skills-hint"],["matInput","","type","number","min","0","formControlName","yearsExperience"],["matInput","","formControlName","avatarUrl"],["matInput","","formControlName","portfolioUrl","placeholder","https://..."],[1,"availability-row"],["formControlName","available"],["mat-raised-button","","color","primary","type","submit",1,"btn-submit",3,"disabled"],[1,"chip-remove",3,"click"]],template:function(e,l){e&1&&(a(0,"div",0)(1,"div",1)(2,"button",2),g("click",function(){return l.goBack()}),a(3,"mat-icon"),r(4,"arrow_back"),i(),r(5," Volver a mi perfil "),i(),a(6,"h2",3)(7,"mat-icon"),r(8,"edit"),i(),r(9," Editar mi perfil de tutor "),i(),p(10,Ge,5,0,"div",4)(11,Ze,47,7),i()()),e&2&&(s(10),b(l.currentTutor()?11:10))},dependencies:[Ie,ve,pe,we,fe,_e,Ce,ye,xe,ke,ze,Me,Te,Se,De,Pe,me,ce,ge,he,Oe,z],styles:[".edit-container[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:24px 16px}.edit-card[_ngcontent-%COMP%]{background:#fff;border-radius:16px;box-shadow:0 8px 32px #00000014;padding:32px;max-width:480px;width:100%}.btn-back[_ngcontent-%COMP%]{color:#666;margin-bottom:8px}.edit-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-size:1.25rem;font-weight:700;color:#1a1a2e;margin:0 0 20px}.edit-empty[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px;padding:32px 0;color:#999}.edit-success[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;background:#e8f5e9;color:#2e7d32;padding:10px 14px;border-radius:8px;font-size:.85rem;margin-bottom:16px}.edit-error[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;background:#fdecea;color:#c62828;padding:10px 14px;border-radius:8px;font-size:.85rem;margin-bottom:16px}.edit-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px}.full-width[_ngcontent-%COMP%]{width:100%}.skills-field[_ngcontent-%COMP%]{margin-bottom:12px}.skills-label[_ngcontent-%COMP%]{font-size:.82rem;font-weight:600;color:#333;display:block;margin-bottom:6px}.skills-input-row[_ngcontent-%COMP%]{display:flex;gap:8px;margin-bottom:8px}.skill-input[_ngcontent-%COMP%]{flex:1;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:.9rem}.skills-chips[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px}.skill-chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;background:#f3f8ff;color:#005a9c;font-size:.8rem;font-weight:600;padding:4px 10px;border-radius:16px}.chip-remove[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px;cursor:pointer}.skills-hint[_ngcontent-%COMP%]{font-size:.78rem;color:#999;font-style:italic}.availability-row[_ngcontent-%COMP%]{margin:12px 0}.btn-submit[_ngcontent-%COMP%]{background-color:#005a9c!important;color:#fff!important;margin-top:12px;height:44px}"]})};export{Fe as EditTutorProfile};
