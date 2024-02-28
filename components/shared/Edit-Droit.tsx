
const EditDroit = () => {
  return (
    return (
        <Modal
          title="Liste des fontions"
          description="Rechercher une fonction"
          isOpen={isOpen}
          onChange={onClose}
        >
          <DataTable columns={columns} data={data} />
        </Modal>
      );
  )
}

export default EditDroit
