import ImageFactory from 'src/components/ImageFactory'

const Constants = {
    badgePic : [ImageFactory.consumer1,ImageFactory.consumer2,ImageFactory.consumer3,
        ImageFactory.homecook1,ImageFactory.homecook2,ImageFactory.homecook3,
        ImageFactory.juniorcook1,ImageFactory.juniorcook2,ImageFactory.juniorcook3,
        ImageFactory.cook1,ImageFactory.cook2,ImageFactory.cook3,
        ImageFactory.chef1,ImageFactory.chef2,ImageFactory.chef3 ],
    
    badgeName : ['Consumer I','Consumer II','Consumer III','Homecook I','Homecook II','Homecook III',
        'Juniorcook I','Juniorcook II','Juniorcook III','Cook I','Cook II','Cook III',
        'Chef I','Chef II','Chef III'],

    badgeDetail: [ {image: ImageFactory.consumer1 ,name:'Consumer I', point:40, progress:0}, 
        {image: ImageFactory.consumer2 ,name:'Consumer II', point:80, progress:0},
        {image: ImageFactory.consumer3 ,name:'Consumer III', point:150, progress:0},
        {image: ImageFactory.homecook1 ,name:'Homecook I', point:270, progress:0},
        {image: ImageFactory.homecook2 ,name:'Homecook II', point:400, progress:0},
        {image: ImageFactory.homecook3 ,name:'Homecook III', point:550, progress:0},
        {image: ImageFactory.juniorcook1 ,name:'Juniorcook I', point:720, progress:0},
        {image: ImageFactory.juniorcook2 ,name:'Juniorcook II', point:900, progress:0},
        {image: ImageFactory.juniorcook3 ,name:'Juniorcook III', point:1400, progress:0},
        {image: ImageFactory.cook1 ,name:'Cook I', point:2000, progress:0},
        {image: ImageFactory.cook2 ,name:'Cook II', point:2900, progress:0},
        {image: ImageFactory.cook3 ,name:'Cook III', point:4500, progress:0},
        {image: ImageFactory.chef1 ,name:'Chef I', point:6900, progress:0},
        {image: ImageFactory.chef2 ,name:'Chef II', point:10000, progress:0},
        {image: ImageFactory.chef3 ,name:'Chef III', point:10000000, progress:0} ],
    
    achievement: [
        {achImage: ImageFactory.plates1, achName: 'Plates maker I', achDetail:'Make 10 plates', needed:'10'},
        {achImage: ImageFactory.plates2, achName: 'Plates maker II', achDetail:'Make 25 plates', needed:'25'},
        {achImage: ImageFactory.plates3, achName: 'Plates maker III', achDetail:'Make 50 plates', needed:'50'},
        {achImage: ImageFactory.plates4, achName: 'Plates maker IV', achDetail:'Make 100 plates',  needed:'100'},
        {achImage: ImageFactory.plates5, achName: 'Plates maker V', achDetail:'Make 250 plates',  needed:'250'},
        {achImage: ImageFactory.plates6, achName: 'Plates maker VI', achDetail:'Make 500 plates',  needed:'500'},
        {achImage: ImageFactory.plates7, achName: 'Plates maker VII', achDetail:'Make 1000 plates',  needed:'1000'},
        {achImage: ImageFactory.plates8, achName: 'Plates maker VIII', achDetail:'Make 2500 plates',  needed:'2500'},
        {achImage: ImageFactory.plates9, achName: 'Plates maker IX', achDetail:'Make 5000 plates',  needed:'5000'},
        {achImage: ImageFactory.plates10, achName: 'Plates maker X', achDetail:'Make 10000 plates',  needed:'10000'},
        {achImage: ImageFactory.trophy1, achName: 'Trophies acquire I', achDetail:'Got 100 trophies',  needed:'100'},
        {achImage: ImageFactory.trophy2, achName: 'Trophies acquire II', achDetail:'Got 1000 trophies',  needed:'1000'},
        {achImage: ImageFactory.trophy3, achName: 'Trophies acquire III', achDetail:'Got 10000 trophies',  needed:'10000'},
        {achImage: ImageFactory.trophy4, achName: 'Trophies acquire IV', achDetail:'Got 100000 trophies',  needed:'100000'},
        {achImage: ImageFactory.trophy5, achName: 'Trophies acquire V', achDetail:'Got 1000000 trophies',  needed:'1000000'} ]
    
}

export default Constants