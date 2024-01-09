
function convertToBase64(file){
    return new Promise((res,rej)=>{
        let filereader = new FileReader()
        filereader.readAsDataURL(file)
        filereader.onload = ()=> res(filereader.result)
        filereader.onerror = (error)=> rej(error)
    })
}

export {convertToBase64};