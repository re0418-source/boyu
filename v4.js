
(function(){
const wizard=document.querySelector('.v4-wizard');

const copy={
zh:{uniform:['企業制服／團體服','可先提供服裝類型、數量與品牌識別需求。'],brand:['品牌服飾開發','可先提供設計概念、預期布料與打樣需求。'],fabric:['機能布料採購','可先提供用途、功能需求與預估採購量。'],other:['其他客製需求','可先描述產品想法與希望解決的問題。']},
en:{uniform:['Corporate Uniforms','Share garment type, quantity and branding needs.'],brand:['Fashion Brand Development','Share your design concept, fabrics and sampling needs.'],fabric:['Performance Fabric Sourcing','Share intended use, desired functions and estimated quantity.'],other:['Other Custom Projects','Describe your concept and the problem you want to solve.']}
};
if(wizard){
const l=wizard.dataset.lang||'zh',buttons=[...wizard.querySelectorAll('.v4-option')],qty=wizard.querySelector('#v4-quantity'),cta=wizard.querySelector('.v4-wizard-cta');let need='uniform';
function refresh(){
buttons.forEach(b=>{const active=b.dataset.need===need;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active))});
wizard.querySelector('.v4-wizard-result h3').textContent=copy[l][need][0];
wizard.querySelector('.v4-wizard-result p').textContent=copy[l][need][1];
cta.href=(l==='en'?'/en/contact':'/contact')+'?need='+encodeURIComponent(need)+'&quantity='+encodeURIComponent(qty.value);
}
buttons.forEach(b=>b.addEventListener('click',()=>{need=b.dataset.need;refresh()}));qty.addEventListener('change',refresh);refresh();
}
const form=document.querySelector('form[data-v4-contact]');
if(form){
const params=new URLSearchParams(location.search),need=params.get('need'),qty=params.get('quantity');
const l=form.dataset.lang||'zh',needNames={uniform:l==='en'?'Corporate uniforms':'企業制服／團體服',brand:l==='en'?'Brand apparel development':'品牌服飾開發',fabric:l==='en'?'Performance fabric sourcing':'機能布料採購',other:l==='en'?'Other custom project':'其他客製需求'};
const qtyNames={undecided:l==='en'?'Not sure yet':'尚未確定',under100:l==='en'?'Under 100 pcs':'少於 100 件','100to499':l==='en'?'100–499 pcs':'100–499 件', '500plus':l==='en'?'500+ pcs':'500 件以上'};
const details=form.querySelector('[name="details"]'),quantity=form.querySelector('[name="quantity"]');
if(needNames[need]&&details&&!details.value)details.value=(l==='en'?'Project type: ':'需求類型：')+needNames[need]+'\n';
if(qtyNames[qty]&&quantity&&!quantity.value)quantity.value=qtyNames[qty];
form.addEventListener('submit',function(e){
if(location.hostname.endsWith('github.io')||location.protocol==='file:'){
e.preventDefault();if(!form.reportValidity())return;
const fd=new FormData(form);const lines=[['company','Company / 公司'],['contact_person','Contact / 聯絡人'],['phone','Phone / 電話'],['email','Email'],['line','LINE'],['quantity','Quantity / 數量'],['budget','Budget / 預算'],['deadline','Timeline / 交期'],['project_type','Type / 類型'],['details','Details / 需求']];
const body=lines.map(([key,label])=>label+': '+(fd.get(key)||'')).join('\n\n');
location.href='mailto:info@boyutechtex.com?subject='+encodeURIComponent('BOYU TECH TEX - Project Inquiry')+'&body='+encodeURIComponent(body);
}
});
}
})();
