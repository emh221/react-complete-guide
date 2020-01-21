import React, {useEffect, useRef} from 'react';
import classes from './Cockpit.module.css'
import AuthContext from '../../context/auth-context'

 const Cockpit = (props) => {
   const toggleBtnRef = useRef(null);

   useEffect(()=> {
     console.log('[cockpit.js] Use Effect!!' );

     // setTimeout(() => {
     //   alert('Saved data to cloud!');
     //
     // }, 1000);
     toggleBtnRef.current.click();
     return()=> {
       console.log('[Cockpit.js] cleanup work in useEffect');
     };
   }, []);

   useEffect(()=>{
   console.log('[cockpit.js] 2nd Use Effect!!' );
   return () => {
     console.log('[Cockpit.js] cleanup worki in 2nd useEffect');
   };
 },);

   const dynamicClasses = [];
   let btnClass = '';
   if (props.showPersons) {
     btnClass = classes.Red;
   }

   if (props.personsLength <= 2) {
     dynamicClasses.push(classes.red)
   }
   if (props.personsLength <= 1) {
     dynamicClasses.push(classes.bold)
   }

   return (
     <div className = {classes.Cockpit}>
     <h1>{props.title}</h1>
     <p className= {dynamicClasses.join(' ')}>This is really working!</p>
     <button
      className ={btnClass}
       onClick={props.clicked}
       ref ={toggleBtnRef}>
       Toggle Name
       </button>
       <AuthContext.Consumer>
       {(context) => <button onClick = {context.login}>
        Log in
      </button>}
      </AuthContext.Consumer>
     </div>
   );
 }

 export default React.memo(Cockpit);
