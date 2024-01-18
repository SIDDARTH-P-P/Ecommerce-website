export default function Footer(){
    return(
        <>
        <div className="container-fluid pt-4 bgclr">
        <div className="row">
            <div className="col-lg col-sm-12">
                <p className="text-start fs pb-0 text-secondary ">Copyright ©2023 All rights reserved | This template is made with <span  className="bi bi-heart-fill text-danger"></span> by <span className="text-danger">Siddu</span></p>
            </div>
            <div className="col-lg text-end col-sm-12">
                <span id="contact" className="icon pe-3 bi bi-twitter"></span> <span className="icon pe-3 bi bi-facebook"></span> <span className="icon pe-3 bi bi-behance"></span> <span className="icon pe-3 bi bi-globe"></span>
            </div>
        </div>
    </div>
        </>
    );
}