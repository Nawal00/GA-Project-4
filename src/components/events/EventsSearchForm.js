import React from 'react'

const EventsForm = ({ handleChange }) => {

  return (

    <div className="columns is multiline">
      <div className="column is-4 eventFormDiv-1">
        <div className="field">
          <div className="control">

            <label className="label"> <strong className="has-text-white"> Explore by category </strong> </label>

            <select
              className="select is-rounded"
              name="category"
              onChange={handleChange}
            >
              <option> All </option>
              <option> Mums Club </option>
              <option> Sports Club </option>
              <option> Music Club </option>
              <option> Photography Club </option>
            </select>

          </div>
        </div>
      </div>

      <div className="column is-4 eventFormDiv-2">
        <div className="field">
          <div className="control">
            <label className="label"> <strong className="has-text-white"> Search By City </strong> </label>
            <form>
              <input name="location" className="is-rounded" type="text" placeholder="Location" onChange={handleChange} />
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventsForm
