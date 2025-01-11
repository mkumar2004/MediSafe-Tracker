import moment from 'moment'

export const FormalDate=(timestamp)=>{
    return new Date(timestamp)
}

export const FormalDateinText=(date)=>{
    return moment(date).format('ll')
}

export const FormalTime=(timestamp)=>{
    const date=new Date(timestamp);
    const Timestring=date.toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
    })

    return Timestring;
}

export const getDateRange=(startdate,enddate)=>{
     const start=moment(new Date( startdate),'MM/DD/YYYY');
     const end=moment(new Date( enddate),'MM/DD/YYYY');
     const dates =[];
     
     while(start.isSameOrBefore(end)){
        dates.push(start.format('MM/DD/YYYY'));
        start.add(1,'days')
     }

      return dates;

    }


export const GetDatesToDisplay=()=>{
     const datelist=[];
     for(let i=0;i<=7;i++){
        datelist.push({
            date:moment().add(i,'days').format('DD') ,//it will return all the date
            day:moment().add(i,'days').format('dd'), //it will return all the day
            formatedDate:moment().add(i,'days').format('L') //it will return in the format of DD/MM/YYYY
        })
     }
     return datelist;
}