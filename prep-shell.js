(()=>{
  const buttons=[...document.querySelectorAll("[data-prep-view]")];
  const overview=document.querySelector('[data-prep-panel="overview"]');
  const tracks=document.querySelector('[data-prep-panel="tracks"]');
  const workspace=document.getElementById("studyWorkspace");

  function show(view){
    const isOverview=view==="overview";
    overview?.classList.toggle("is-hidden",!isOverview);
    tracks?.classList.toggle("is-hidden",isOverview);
    workspace?.classList.add("is-hidden");
    buttons.forEach(button=>button.classList.toggle("active",button.dataset.prepView===view));
    (isOverview?overview:tracks)?.scrollIntoView({behavior:"smooth",block:"start"});
  }

  buttons.forEach(button=>button.addEventListener("click",()=>show(button.dataset.prepView)));
})();