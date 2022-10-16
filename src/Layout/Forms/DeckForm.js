import React from "react";

function DeckForm({
  deckTitle,
  cancelLabel,
  submitLabel,
  onCancel,
  onSubmit,
  formData,
  setFormData,
  placeHolderName,
  placeHolderDescription,
}) {
  const handleInputChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  return (
    <form onSubmit={onSubmit}>
      <h5>{deckTitle}</h5>
      <div className="form-group">
        <label htmlFor="deck-name">Name</label>
        <input
          className="form-control"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          id="deck-name"
          placeholder={placeHolderName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="deck-description">Description</label>
        <textarea
          className="form-control"
          value={formData.description}
          onChange={handleInputChange}
          name="description"
          id="deck-description"
          placeholder={placeHolderDescription}
        />
      </div>
      <div>
        <button
          className="btn btn-secondary btn-md mr-2"
          onClick={onCancel}
          type="button"
        >
          {cancelLabel}
        </button>
        <button className="btn btn-primary btn-md" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default DeckForm;
