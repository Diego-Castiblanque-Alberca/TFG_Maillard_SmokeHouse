import "../../../styles/backOffice/Modal.css";

export function Modal({ mostrar, children, titulo , botones, handleClose}) {


  return (
    <div 
        className="modal"
        style={mostrar ? {display: "block"} : {display: "none"}}
    >
      <section className="modal-main">
        <div className="modal-header">
            <img src="" alt="" />
            <h2>{titulo}</h2>
        </div>
        {children}
        <div className="modal-footer">
            {botones.map((boton, index) => {
                return (
                    <button 
                        key={index} 
                        onClick={()=>{
                            setTimeout(mostrar=false,1000);
                            if(index==1){
                                handleClose()
                            }
                        }}
                    >
                        {boton}
                    </button>
                )
            })}
        </div>
      </section>
    </div>
  );
}