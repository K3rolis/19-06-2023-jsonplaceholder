import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../../api/users';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [bs, setBs] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(Number(userId)).then((data) => {
      console.log(data);
      setName(data.name);
      setUsername(data.username);
      setEmail(data.email);
      setPhone(data.phone);
      setWebsite(data.website);

      setStreet(data.address.street);
      setSuite(data.address.suite);
      setCity(data.address.city);
      setZipcode(data.address.zipcode);
      setLat(data.address.geo.lat);
      setLng(data.address.geo.lng);

      setCompanyName(data.company.name);
      setCatchPhrase(data.company.catchPhrase);
      setBs(data.company.bs);
    });
  }, [userId]);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueriesData(['user', userId], data);
      navigate(`/users/${userId}`);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUser = {
      id: Number(userId),
      name: name,
      username: username,
      email: email,
      address: { street: street, suite: suite, city: city, zipcode: zipcode, geo: { lat: lat, lng: lng } },
      phone: phone,
      website: website,
      company: { name: companyName, catchPhrase: catchPhrase, bs: bs },
    };

    console.log(newUser);

    updateUserMutation.mutate(newUser);
  };

  if (updateUserMutation.isLoading) return <h1>Saving your changes....</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="username">username</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="phone">phone</label>
        <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="website">website</label>
        <input type="text" id="website" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <h2>ADDRESS</h2>
      <div className="form-group">
        <label htmlFor="street">street</label>
        <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="suite">suite</label>
        <input type="text" id="suite" name="suite" value={suite} onChange={(e) => setSuite(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="city">city</label>
        <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="zipcode">zipcode</label>
        <input type="text" id="zipcode" name="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
      </div>

      <h2>GEO</h2>
      <div className="form-group">
        <label htmlFor="lat">lat</label>
        <input type="text" id="lat" name="lat" value={lat} onChange={(e) => setLat(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="lng">lng</label>
        <input type="text" id="lng" name="lng" value={lng} onChange={(e) => setLng(e.target.value)} />
      </div>
      <h2>Company</h2>

      <div className="form-group">
        <label htmlFor="companyName">companyName</label>
        <input type="text" id="companyName" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="catchPhrase">catchPhrase</label>
        <input type="text" id="catchPhrase" name="catchPhrase" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="bs">bs</label>
        <input type="text" id="bs" name="bs" value={bs} onChange={(e) => setBs(e.target.value)} />
      </div>

      <input type="submit" value="submit" />
    </form>
  );
};

export default EditUser;
