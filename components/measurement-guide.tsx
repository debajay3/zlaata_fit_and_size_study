const guides:Record<number,{title:string;description:string;crop:[number,number,number,number]}>= {
 6:{title:'How to measure your height',description:'Stand barefoot against a wall, looking straight ahead. Place a flat book on your head, mark its level, then measure from the floor to that mark.',crop:[2,40,276,910]},
 7:{title:'How to measure your bust',description:'Wrap a soft measuring tape around the fullest part of your bust. Keep it level around your back, snug without pressing into your body. Read the measurement in inches.',crop:[286,220,430,390]},
 10:{title:'How to measure your waist',description:'Wrap the tape around your natural waist, at the narrowest part of your torso. Relax and breathe normally; keep the tape level. Read the measurement in inches.',crop:[726,270,396,360]},
 11:{title:'How to measure your hips',description:'Stand with your feet together. Wrap the tape around the fullest part of your hips and seat, keeping it level. Read the measurement in inches.',crop:[1133,330,399,390]}
};
export default function MeasurementGuide({questionId}:{questionId:number}) {
 const guide=guides[questionId];
 if(!guide)return null;
 const [x,y,width,height]=guide.crop;
 return <figure className={`measurementGuide ${questionId===6?'heightGuide':''}`}>
  <div className="measurementImage" style={{aspectRatio:`${width} / ${height}`,backgroundSize:`${1536/width*100}% ${1024/height*100}%`,backgroundPosition:`${x/(1536-width)*100}% ${y/(1024-height)*100}%`}} role="img" aria-label={guide.title}/>
  <figcaption><strong>{guide.title}</strong><p>{guide.description}</p></figcaption>
 </figure>;
}
