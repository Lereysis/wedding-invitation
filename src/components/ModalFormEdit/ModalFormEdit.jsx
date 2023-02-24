import React from 'react'

const ModalFormEdit = ({name,numberGuest,numberPhone,messageCustomize}) => {
    return (
        <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Invitado</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="name-guest" class="col-form-label">Nombre de el invitado:</label>
                                <input type="text" class="form-control" id="name-guest" value={name}/>
                            </div>
                            <div class="mb-3">
                                <label for="number-guest" class="col-form-label">Numero de invitados:</label>
                                <input type="text" class="form-control" id="number-guest" value={numberGuest}/>
                            </div>
                            <div class="mb-3">
                                <label for="number-guest" class="col-form-label">Numero de Telefono:</label>
                                <input type="text" class="form-control" id="number-guest" value={numberPhone}/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="message" className="form-label">Mensaje perzonalizado para el invitado</label>
                                <textarea className='form-control' id="message" name="messageCustomize" value={messageCustomize} rows="8"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalFormEdit