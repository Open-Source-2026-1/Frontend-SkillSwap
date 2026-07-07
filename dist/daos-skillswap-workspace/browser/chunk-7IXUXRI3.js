import{a as Se}from"./chunk-LL4YBOKK.js";import{c as Ie,d as Me}from"./chunk-KDSBNV7H.js";import{a as ye,b as Ce,g as Ee,h as we}from"./chunk-NY3VBISR.js";import{a as he,b as be,c as ke,d as _,f as ue,g as pe,i as g,j as xe,m as _e,n as fe,u as ge,v as ve}from"./chunk-DRH3GUU4.js";import{a as le,b as se}from"./chunk-SQHG5TSL.js";import{C as re,E as de,F as me,e as te,n as ce,v as ae,y as oe,z as ie}from"./chunk-XB2IQPP2.js";import{o as W,p as ee,z as ne}from"./chunk-5RDSYLOX.js";import{Ab as B,Db as p,Eb as V,Fb as G,Gb as j,Ib as X,Jb as w,Kb as I,Ma as m,Ob as Q,P as F,Qb as M,R,Rb as H,Sb as i,T as D,Ub as Z,V as s,Za as v,_a as q,aa as O,ac as $,ba as P,ga as C,ha as N,kb as E,la as f,lb as k,mb as u,mc as K,na as A,oa as L,qc as Y,ra as U,rb as b,sb as o,sc as x,tb as a,tc as J,ub as h}from"./chunk-5N5ZSK7Y.js";import"./chunk-2NFLSA4Y.js";var Re=["input"],De=["label"],Oe=["*"],S={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},Pe=new D("mat-checkbox-default-options",{providedIn:"root",factory:()=>S}),l=(function(c){return c[c.Init=0]="Init",c[c.Checked=1]="Checked",c[c.Unchecked=2]="Unchecked",c[c.Indeterminate=3]="Indeterminate",c})(l||{}),T=class{source;checked},z=(()=>{class c{_elementRef=s(U);_changeDetectorRef=s(Y);_ngZone=s(N);_animationsDisabled=ae();_options=s(Pe,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let n=new T;return n.source=this,n.checked=e,n}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new C;indeterminateChange=new C;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=l.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){s(te).load(ie);let e=s(new K("tabindex"),{optional:!0});this._options=this._options||S,this.color=this._options.color||S.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=s(ce).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let n=e!=this._indeterminate();this._indeterminate.set(e),n&&(e?this._transitionCheckState(l.Indeterminate):this._transitionCheckState(this.checked?l.Checked:l.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=f(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let n=this._currentCheckState,t=this._getAnimationTargetElement();if(!(n===e||!t)&&(this._currentAnimationClass&&t.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(n,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){t.classList.add(this._currentAnimationClass);let d=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{t.classList.remove(d)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?l.Checked:l.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,n){if(this._animationsDisabled)return"";switch(e){case l.Init:if(n===l.Checked)return this._animationClasses.uncheckedToChecked;if(n==l.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case l.Unchecked:return n===l.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case l.Checked:return n===l.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case l.Indeterminate:return n===l.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let n=this._inputElement;n&&(n.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(n){return new(n||c)};static \u0275cmp=v({type:c,selectors:[["mat-checkbox"]],viewQuery:function(n,t){if(n&1&&X(Re,5)(De,5),n&2){let d;w(d=I())&&(t._inputElement=d.first),w(d=I())&&(t._labelElement=d.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(n,t){n&2&&(B("id",t.id),E("tabindex",null)("aria-label",null)("aria-labelledby",null),H(t.color?"mat-"+t.color:"mat-accent"),M("_mat-animation-noopable",t._animationsDisabled)("mdc-checkbox--disabled",t.disabled)("mat-mdc-checkbox-disabled",t.disabled)("mat-mdc-checkbox-checked",t.checked)("mat-mdc-checkbox-disabled-interactive",t.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",x],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",x],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",x],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:J(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",x],checked:[2,"checked","checked",x],disabled:[2,"disabled","disabled",x],indeterminate:[2,"indeterminate","indeterminate",x]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[$([{provide:he,useExisting:F(()=>c),multi:!0},{provide:ke,useExisting:c,multi:!0}]),L],ngContentSelectors:Oe,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(n,t){if(n&1&&(G(),o(0,"div",3),p("click",function(y){return t._preventBubblingFromLabel(y)}),o(1,"div",4,0)(3,"div",5),p("click",function(){return t._onTouchTargetClick()}),a(),o(4,"input",6,1),p("blur",function(){return t._onBlur()})("click",function(){return t._onInputClick()})("change",function(y){return t._onInteractionEvent(y)}),a(),h(6,"div",7),o(7,"div",8),O(),o(8,"svg",9),h(9,"path",10),a(),P(),h(10,"div",11),a(),h(11,"div",12),a(),o(12,"label",13,2),j(14),a()()),n&2){let d=Q(2);b("labelPosition",t.labelPosition),m(4),M("mdc-checkbox--selected",t.checked),b("checked",t.checked)("indeterminate",t.indeterminate)("disabled",t.disabled&&!t.disabledInteractive)("id",t.inputId)("required",t.required)("tabIndex",t.disabled&&!t.disabledInteractive?-1:t.tabIndex),E("aria-label",t.ariaLabel||null)("aria-labelledby",t.ariaLabelledby)("aria-describedby",t.ariaDescribedby)("aria-checked",t.indeterminate?"mixed":null)("aria-controls",t.ariaControls)("aria-disabled",t.disabled&&t.disabledInteractive?!0:null)("aria-expanded",t.ariaExpanded)("aria-owns",t.ariaOwns)("name",t.name)("value",t.value),m(7),b("matRippleTrigger",d)("matRippleDisabled",t.disableRipple||t.disabled)("matRippleCentered",!0),m(),b("for",t.inputId)}},dependencies:[oe,Se],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return c})(),Te=(()=>{class c{static \u0275fac=function(n){return new(n||c)};static \u0275mod=q({type:c});static \u0275inj=R({imports:[z,re]})}return c})();function Ae(c,r){if(c&1&&(o(0,"div",7)(1,"mat-icon"),i(2,"error"),a(),i(3),a()),c&2){let e=V();m(3),Z(" ",e.store.error()," ")}}function Le(c,r){c&1&&(o(0,"mat-error"),i(1,"M\xEDnimo 3 caracteres"),a())}function Ue(c,r){c&1&&(o(0,"mat-error"),i(1,"El correo es obligatorio"),a())}function qe(c,r){c&1&&(o(0,"mat-error"),i(1,"Debe ser un correo institucional v\xE1lido (termina en .edu.pe)"),a())}function Be(c,r){c&1&&(o(0,"mat-error"),i(1,"M\xEDnimo 8 caracteres"),a())}function Ve(c,r){c&1&&(o(0,"span",21),i(1,"Elige al menos un rol"),a())}function Ge(c,r){c&1&&(o(0,"p",22)(1,"mat-icon",26),i(2,"info"),a(),i(3," Al terminar te vamos a pedir completar tu perfil de tutor (universidad, especialidad, etc.) "),a())}var ze=class c{fb=s(ge);router=s(W);store=s(ne);wantsLearner=f(!0);wantsTutor=f(!1);noRoleSelected=f(!1);form=this.fb.group({username:new g("",{nonNullable:!0,validators:[_.required,_.minLength(3)]}),email:new g("",{nonNullable:!0,validators:[_.required,_.email,_.pattern(/^[^\s@]+@[^\s@]+\.edu\.pe$/)]}),password:new g("",{nonNullable:!0,validators:[_.required,_.minLength(8)]}),firstName:new g("",{nonNullable:!0}),lastName:new g("",{nonNullable:!0})});constructor(){A(()=>{if(!this.store.isSignedIn())return;let r=this.store.nextRequiredRoute();if(r){this.router.navigateByUrl(r).then();return}let e=this.store.isModerator()?"/coordinator":"/home";this.router.navigateByUrl(e).then()})}toggleLearner(r){this.wantsLearner.set(r),this.noRoleSelected.set(!1)}toggleTutor(r){this.wantsTutor.set(r),this.noRoleSelected.set(!1)}submit(){if(this.form.invalid)return;let r=[];if(this.wantsLearner()&&r.push("ROLE_LEARNER"),this.wantsTutor()&&r.push("ROLE_TUTOR"),r.length===0){this.noRoleSelected.set(!0);return}this.store.signUp({username:this.form.value.username,email:this.form.value.email,password:this.form.value.password,firstName:this.form.value.firstName||void 0,lastName:this.form.value.lastName||void 0,roles:r})}static \u0275fac=function(e){return new(e||c)};static \u0275cmp=v({type:c,selectors:[["app-sign-up-form"]],decls:59,vars:11,consts:[[1,"auth-container"],[1,"auth-card"],[1,"auth-logo"],[1,"auth-logo-icon"],[1,"auth-logo-text"],[1,"auth-title"],[1,"auth-subtitle"],[1,"auth-error"],[1,"auth-form",3,"ngSubmit","formGroup"],["appearance","outline",1,"full-width"],["matInput","","formControlName","username","autocomplete","username"],["matInput","","formControlName","email","autocomplete","email","placeholder","tu.nombre@upc.edu.pe"],[1,"name-row"],["appearance","outline",1,"field-half"],["matInput","","formControlName","firstName"],["matInput","","formControlName","lastName"],["matInput","","type","password","formControlName","password","autocomplete","new-password"],[1,"roles-label"],[1,"roles-row"],[3,"change","checked"],[1,"role-icon"],[1,"roles-error"],[1,"tutor-hint"],["mat-raised-button","","color","primary","type","submit",1,"btn-submit",3,"disabled"],[1,"auth-switch"],["routerLink","/iam/sign-in"],[1,"sm-icon"]],template:function(e,n){e&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-icon",3),i(4,"school"),a(),o(5,"span",4),i(6,"SkillSwap"),a()(),o(7,"h2",5),i(8,"Crear cuenta"),a(),o(9,"p",6),i(10,"\xDAnete como aprendiz, tutor, o ambos a la vez"),a(),k(11,Ae,4,1,"div",7),o(12,"form",8),p("ngSubmit",function(){return n.submit()}),o(13,"mat-form-field",9)(14,"mat-label"),i(15,"Usuario"),a(),h(16,"input",10),k(17,Le,2,0,"mat-error"),a(),o(18,"mat-form-field",9)(19,"mat-label"),i(20,"Correo institucional"),a(),h(21,"input",11),k(22,Ue,2,0,"mat-error"),k(23,qe,2,0,"mat-error"),a(),o(24,"div",12)(25,"mat-form-field",13)(26,"mat-label"),i(27,"Nombre (opcional)"),a(),h(28,"input",14),a(),o(29,"mat-form-field",13)(30,"mat-label"),i(31,"Apellido (opcional)"),a(),h(32,"input",15),a()(),o(33,"mat-form-field",9)(34,"mat-label"),i(35,"Contrase\xF1a"),a(),h(36,"input",16),k(37,Be,2,0,"mat-error"),a(),o(38,"label",17),i(39,"\xBFC\xF3mo quieres usar SkillSwap?"),a(),o(40,"div",18)(41,"mat-checkbox",19),p("change",function(d){return n.toggleLearner(d.checked)}),o(42,"mat-icon",20),i(43,"school"),a(),i(44," Como Aprendiz "),a(),o(45,"mat-checkbox",19),p("change",function(d){return n.toggleTutor(d.checked)}),o(46,"mat-icon",20),i(47,"person"),a(),i(48," Como Tutor "),a()(),k(49,Ve,2,0,"span",21),k(50,Ge,4,0,"p",22),o(51,"button",23)(52,"mat-icon"),i(53,"person_add"),a(),i(54," Crear cuenta "),a()(),o(55,"p",24),i(56," \xBFYa tienes cuenta? "),o(57,"a",25),i(58,"Inicia sesi\xF3n"),a()()()()),e&2&&(m(11),u(n.store.error()?11:-1),m(),b("formGroup",n.form),m(5),u(n.form.get("username").touched&&n.form.get("username").hasError("minlength")?17:-1),m(5),u(n.form.get("email").touched&&n.form.get("email").hasError("required")?22:-1),m(),u(n.form.get("email").touched&&(n.form.get("email").hasError("email")||n.form.get("email").hasError("pattern"))?23:-1),m(14),u(n.form.get("password").touched&&n.form.get("password").hasError("minlength")?37:-1),m(4),b("checked",n.wantsLearner()),m(4),b("checked",n.wantsTutor()),m(4),u(n.noRoleSelected()?49:-1),m(),u(n.wantsTutor()?50:-1),m(),b("disabled",n.form.invalid||n.store.loading()))},dependencies:[ve,xe,be,ue,pe,fe,_e,we,Ee,ye,Ce,Me,Ie,me,de,se,le,Te,z,ee],styles:[".auth-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;min-height:80vh;padding:24px}.auth-card[_ngcontent-%COMP%]{background:#fff;border-radius:16px;box-shadow:0 8px 32px #00000014;padding:36px 32px;max-width:440px;width:100%}.auth-logo[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px}.auth-logo-icon[_ngcontent-%COMP%]{color:#e63946;font-size:28px;width:28px;height:28px}.auth-logo-text[_ngcontent-%COMP%]{font-size:1.3rem;font-weight:800;color:#1a1a2e}.auth-title[_ngcontent-%COMP%]{text-align:center;font-size:1.4rem;font-weight:700;color:#1a1a2e;margin:0 0 4px}.auth-subtitle[_ngcontent-%COMP%]{text-align:center;font-size:.9rem;color:#666;margin:0 0 24px}.auth-error[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;background:#fdecea;color:#c62828;padding:10px 14px;border-radius:8px;font-size:.85rem;margin-bottom:16px}.auth-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px}.full-width[_ngcontent-%COMP%]{width:100%}.name-row[_ngcontent-%COMP%]{display:flex;gap:12px}.field-half[_ngcontent-%COMP%]{flex:1}.roles-label[_ngcontent-%COMP%]{font-size:.85rem;font-weight:600;color:#333;margin:8px 0}.roles-row[_ngcontent-%COMP%]{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:4px}.role-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;vertical-align:middle;margin-right:2px}.roles-error[_ngcontent-%COMP%]{color:#c62828;font-size:.8rem;margin-bottom:8px}.tutor-hint[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-size:.8rem;color:#666;background:#f3f8ff;padding:8px 12px;border-radius:8px;margin:4px 0 8px}.sm-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.btn-submit[_ngcontent-%COMP%]{background-color:#005a9c!important;color:#fff!important;margin-top:8px;height:44px}.auth-switch[_ngcontent-%COMP%]{text-align:center;font-size:.85rem;color:#666;margin-top:20px}.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#005a9c;font-weight:600;text-decoration:none}"]})};export{ze as SignUpForm};
