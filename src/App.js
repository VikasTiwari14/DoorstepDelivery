import React, { useState } from 'react';
import "./bootstrap.css";
import './app.css';

var radio1,radio2;
var partsRequirements=[];
var i=0;
var as;
const App = () => {
    const [value,setValue]=useState({
      did:"",
      dan:"",
      rname:"",
      rc:"",
      pn:"",
      id:0,
      brandName:"",
      pd:"",
      quant:"",
      dadd:"",
      ovalue:"",
      roname:"",
      opsname:""
    });
    const [comment,setComment]=useState("");
    const handleChange = (e) => {
        setValue({
           ...value,
           [e.target.name]: e.target.value
        });
    }
    const handleTextArea = (e) => {
      const value = e.target.value;
      setComment(value);
  }
    const handleRadio = (e) => {
      console.log(e.target.id);
      if(e.target.id==="radio1"){
          as="YES";
          radio1=document.getElementById('radio1');
          radio2=document.getElementById('radio2');
          radio1.style.border="none";
          radio1.style.background="rgb(51, 51, 51)";
          radio1.style.color="white";
          radio2.style.border="1px solid black";
          radio2.style.background="white";
          radio2.style.color="black";
      }
      else{
        as="NO";
        radio1=document.getElementById('radio1');
        radio2=document.getElementById('radio2');
        radio2.style.border="none";
        radio2.style.background="rgb(51, 51, 51)";
        radio2.style.color="white";
        radio1.style.border="1px solid black";
        radio1.style.background="white";
        radio1.style.color="black";
      }
    }
    const addBundle = () => {
        if(i>2){
          alert("You can Add atmost 3 parts description per form");
          setValue({pn:"",brand:"",pd:"",quant:""});
        }
        if(value.pn!==""&&value.brand!=="" &&value.pd!=="" &&value.quant!==""&&i<3){
           i+=1;
           var partNumber=value.pn;
           var id=value.id;
           var brandName=value.brandName;
           var brand={id,brandName};
           var partDescription=value.pd;
           var quantity=value.quant;
           var obj={partNumber,brand,partDescription,quantity};
           console.log(value.pn, value.brand,value.pd)
           document.getElementById("b"+i).style.display="block"; 
           document.getElementById("sp"+i+"1").innerHTML=value.pn;
           document.getElementById("sp"+i+"2").innerHTML=value.brand;
           document.getElementById("sp"+i+"3").innerHTML=value.pd;
           document.getElementById("sp"+i+"4").innerHTML=value.quant;
           partsRequirements.push(obj);
           setValue({pn:"",brandName:"",pd:"",quant:""});
        }
    }
    
    const removeBundle = (e) => {
           e.preventDefault();
           i-=1;
           var f=e.target.id;
           f=f[3];
           document.getElementById("b"+f).style.display="none";
           partsRequirements.splice(f-1,1);
    }
    
    const submitData = async (e) => {
      e.preventDefault();
      let advanceStatus=as;
      let orderValue=value.ovalue;
      let casePriority=document.getElementById("caseP").value;
      let destinationAddress=value.dadd;
      let recipientContact=value.rc;
      let recipientName=value.rname;
      let orderType=document.getElementById("oType").value;
      let demandID=value.did;
      let destinationIW={id:0,iwName:value.dan};
      let destinationType=document.getElementById("dType").value;
      let retailOutlet={id:0,name:value.roname};
      let opsExec={id:0,name:value.opsname};

      let data={demandID,orderType,destinationIW,destinationType,recipientName,recipientContact,partsRequirements,destinationAddress,casePriority,orderValue,advanceStatus,comment,retailOutlet,opsExec};
      //console.log(value.did,value.rname,value.dadd,value.dan,value.ovalue,value.pd,value.pn,value.quant,value.brand,value.rc);
      console.log(data);
      // console.log(partsRequirements);
      let result= await fetch("http://cloud.ideoholics.com:8006/parts-delivery/delivery-request/create",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{"Content-Type":'application/json'}
      })
      result=await result.json();
      console.log(result.success);
      if(result.success){
        alert("Your Form Submitted Successfuly");
        setValue({did:"",dadd:"",dan:"",rname:"",rc:"",ovalue:""});
        setComment("");
      }
      else{
        alert("You Form Not Submitted Try Again!");
      }
      
    }
    

     return(
       <React.Fragment>
           <form>
             <div className="container">
                <div className="row">
                  <h5>Doorstep Delivery Request Form</h5><hr/>
                  <div className="labelClass col-3 col-md-3 ">
                    <label>Demand ID  </label><br />
                    <label>Destination Account Name</label><br />
                    <label>Recipient Name</label><br />
                    <label>RO Name</label><br />
                  </div>
                  <div className="col-3">
                    <input type="text" name="did" value={value.did} onChange={handleChange} required/><br />
                    <input type="text" name="dan" value={value.dan} onChange={handleChange} required/><br />
                    <input type="text" name="rname" value={value.rname} onChange={handleChange} required/><br />
                    <input type="text" name="roname" value={value.roname} onChange={handleChange} required/><br />
                    
                  </div>
                  <div className="labelClass col-md-2 col-3">
                       <label>Order Type</label><br />
                       <label>Destination Type</label><br />
                       <label>Recipient Contact Number</label><br />
                       <label>OPS Exec Name</label><br />
                  </div>
                  <div className="col-3">
                      <select id="oType">
                        <option value="Cx Demand">Cx Demand</option>
                        <option value="Missing Item in RO">Missing Item in RO</option>
                        <option value="Range Building">Range Building</option>
                        <option value="Periodical Replenishment">Periodical Replenishment</option>
                      </select><br/>
                      <select id="dType">
                        <option value="IW">IW</option>
                        <option value="RO">RO</option>
                        <option value="VO">VO</option>
                        <option value="WH">WH</option>
                        <option value="OT">OT</option>
                      </select><br/>
                      <input type="text" name="rc" value={value.rc} onChange={handleChange} required/><br />
                      <input type="text" name="opsname" value={value.opsname} onChange={handleChange} required/><br />
                  </div>
                </div>
                <div className="row">
                <p className="offset-3 ml-3" id="h6"><b>PART BUNDLE INFORMATION</b></p>
                  <div className="labelClass col-3">
                    <label>Part Number</label><br />
                    <label>Brand</label><br />
                    <label>Part Description</label><br />
                    <label>Quantity</label><br />
                  </div>
                  <div className="col-3">
                      <input type="text" name="pn" value={value.pn} onChange={handleChange} required/><br />
                      <input type="text" name="brandName" value={value.brandName} onChange={handleChange} required/><br />
                      <input type="text" name="pd" value={value.pd} onChange={handleChange} required/><br />
                      <input type="text" name="quant" value={value.quant} onChange={handleChange} required/><br />
                      <input type="button" value="+ADD PART BUNDLE" onClick={addBundle}/>
                  </div>
                  <div className="col-5 offset-1 align-content-center" id="bundle">
                    <div className="bundlePart" id="b1">
                      <b>part no. </b><span id="sp11">&nbsp;   </span><button id="btn1" onClick={removeBundle}>X</button><br/>
                      <b>brand    </b><span id="sp12">&emsp;    </span><br/> 
                      <b>part des.</b><span id="sp13"> </span><br/> 
                      <b>quantity </b><span id="sp14">         </span><br/>
                    </div>
                    <div className="bundlePart" id="b2">
                      <b>part no. </b><span id="sp21">&nbsp;   </span><button id="btn2" onClick={removeBundle}>X</button><br/>
                      <b>brand    </b><span id="sp22">&emsp;    </span><br/> 
                      <b>part des.</b><span id="sp23"> </span><br/> 
                      <b>quantity </b><span id="sp24">         </span><br/>
                    </div>
                    <div className="bundlePart" id="b3">
                      <b>part no. </b><span id="sp31">&nbsp;   </span><button id="btn3" onClick={removeBundle}>X</button><br/>
                      <b>brand    </b><span id="sp32">&emsp;    </span><br/> 
                      <b>part des.</b><span id="sp33"> </span><br/> 
                      <b>quantity </b><span id="sp34">         </span><br/>
                    </div>
                    
                  </div>
                </div>
                <div className="row">
                <div className="labelClass col-3">
                    <label>Destination Address</label><br />
                    <label>Order Value (Rs.)</label><br />
                  </div>
                  <div className="col-3">
                      <input type="text" name="dadd" value={value.dadd} onChange={handleChange} required/><br />
                      <input type="text" name="ovalue" value={value.ovalue} onChange={handleChange} required/><br />
                  </div>
                  <div className="labelClass col-2">
                    <label>Case Priority</label><br />
                    <label>Advance Status</label><br />
                  </div>
                  <div className="adS col-3">
                      <select id="caseP">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select><br/>
                      <input type="button" id="radio1" value="YES" onClick={handleRadio} />
                      <input type="button" id="radio2" value="NO"  onClick={handleRadio}/>
                      <br />
                  </div>
                  <div className="labelClass col-3">
                         <label>Add Comment</label><br />
                  </div>
                  <div className="col-9">
                        <textarea id="tarea" value={comment} onChange={handleTextArea}></textarea>
                  </div>
                </div>
             </div>
             <button type="submit" onClick={submitData}>SAVE</button>
           </form>
       </React.Fragment>
     )
}

export default App;