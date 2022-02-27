const Map = () => {
  return (
    <div className="map-section container mt-5">
      <div className="mapouter">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d5551.037601927707!2d123.94621908297871!3d10.327769507962879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x33a99889680ceefd%3A0xa9f911a1f5dda572!2sMandaue%20City%2C%20Cebu!3m2!1d10.3321417!2d123.9357136!5e0!3m2!1sen!2sph!4v1645971098275!5m2!1sen!2sph"
          width="100%"
          height="400"
          style={{ border: `0` }}
          loading="lazy"
          title="map"
          className="gmap_canvas"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
