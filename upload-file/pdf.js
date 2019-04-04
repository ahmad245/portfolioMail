
const pdfDocument=require('pdfkit');
const fs=require('fs');

module.exports.intialisPdf=(res,filepath,fileName)=>{
   const file=fs.createReadStream(filepath);
   res.setHeader('Content-Type','application/pdf');
   res.setHeader('Content-Disposition','inline; filename="'+ fileName + '"');
   file.pipe(res);
}
module.exports.createPdf=(res,filePath,fileName)=>{
    const pdfDoc=new pdfDocument;
    
    res.setHeader('Content-Type','application/pdf');
    res.setHeader('Content-Disposition','inline; filename="'+ fileName + '"');
    console.log(filePath);
    const  WriteStreamd=fs.createWriteStream(filePath);
    //pdfDoc.pipe(fs.createWriteStream(filePath));
    
    pdfDoc.pipe(WriteStreamd);
    
    pdfDoc.fontSize(20).text("ahmad  ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmad ahmadahmad");
    pdfDoc.end();
    
    WriteStreamd.on('close',()=> {
        // do stuff with the PDF file
        
        pdfDoc.pipe(res);
  
   
        
    });
  
    
}