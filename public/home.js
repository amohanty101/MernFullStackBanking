function Home(){
  return (
    <Card
      txtcolor="info"
      header="MIT Mern's Bank"
      bgcolor="light"
      title="Welcome to the MIT MERN Bank's full stack banking experience"
      text="Your Banking experience is secured now."
      body={(<img src="badbank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
