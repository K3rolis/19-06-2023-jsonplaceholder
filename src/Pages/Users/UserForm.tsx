import React, { useState } from 'react';

const UserForm = ({ onSubmit, initialValue }: any) => {
  const [user, setUser] = useState({
    name: initialValue.name || '',
    username: initialValue.username || '',
    email: initialValue.email || '',
    phone: initialValue.phone || '',
    website: initialValue.website || '',
    street: initialValue?.address?.street || '',
    suite: initialValue?.address?.suite || '',
    city: initialValue?.address?.city || '',
    zipcode: initialValue?.address?.zipcode || '',
    lat: initialValue?.address?.geo?.lat || '',
    lng: initialValue?.address?.geo?.lng || '',
    companyName: initialValue?.company?.name || '',
    catchPhrase: initialValue?.company?.catchPhrase || '',
    bs: initialValue?.company?.bs || '',
  });

  const handleInputChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newUser = {
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        street: user.street,
        suite: user.suite,
        city: user.city,
        zipcode: user.zipcode,
        geo: { lat: user.lat, lng: user.lng },
      },
      phone: user.phone,
      website: user.website,
      company: { name: user.name, catchPhrase: user.catchPhrase, bs: user.bs },
    };

    onSubmit(newUser);

    setUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      lat: '',
      lng: '',
      companyName: '',
      catchPhrase: '',
      bs: '',
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" value={user.name} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="username">username</label>
        <input type="text" id="username" name="username" value={user.username} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="email" value={user.email} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="phone">phone</label>
        <input type="text" id="phone" name="phone" value={user.phone} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="website">website</label>
        <input type="text" id="website" name="website" value={user.website} onChange={handleInputChange} />
      </div>

      <h2>ADDRESS</h2>
      <div className="form-group">
        <label htmlFor="street">street</label>
        <input type="text" id="street" name="street" value={user.street} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="suite">suite</label>
        <input type="text" id="suite" name="suite" value={user.suite} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="city">city</label>
        <input type="text" id="city" name="city" value={user.city} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="zipcode">zipcode</label>
        <input type="text" id="zipcode" name="zipcode" value={user.zipcode} onChange={handleInputChange} />
      </div>

      <h2>GEO</h2>
      <div className="form-group">
        <label htmlFor="lat">lat</label>
        <input type="text" id="lat" name="lat" value={user.lat} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="lng">lng</label>
        <input type="text" id="lng" name="lng" value={user.lng} onChange={handleInputChange} />
      </div>
      <h2>Company</h2>

      <div className="form-group">
        <label htmlFor="companyName">companyName</label>
        <input type="text" id="companyName" name="companyName" value={user.companyName} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="catchPhrase">catchPhrase</label>
        <input type="text" id="catchPhrase" name="catchPhrase" value={user.catchPhrase} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="bs">bs</label>
        <input type="text" id="bs" name="bs" value={user.bs} onChange={handleInputChange} />
      </div>

      <input type="submit" value="submit" />
    </form>
  );
};

export default UserForm;
