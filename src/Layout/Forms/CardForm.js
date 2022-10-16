import React from "react";

function CardForm({
  cardTitle,
  cancelLabel,
  submitLabel,
  onCancel,
  onSubmit,
  formData,
  setFormData,
  placeHolderBack,
  placeHolderFront,
}) {
  const handleInputChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  return (
    <form onSubmit={onSubmit}>
      <h5>{cardTitle}</h5>
      <div className="form-group">
        <label className="form-label" htmlFor="card-front">
          Front
        </label>
        <textarea
          className="form-control"
          value={formData.front}
          onChange={handleInputChange}
          name="front"
          id="card-front"
          placeholder={placeHolderFront}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="card-back">
          Back
        </label>
        <textarea
          className="form-control"
          value={formData.back}
          onChange={handleInputChange}
          name="back"
          id="card-back"
          placeholder={placeHolderBack}
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

export default CardForm;
