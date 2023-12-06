import React from 'react';
import Layout from '../Layout/Layout';

const Home = () => {
  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url("https://www.vscodehelp.com/assets/images/frontend/banner/653f0de2dde501698631138.png")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '85vh',
          position: 'relative',
          zIndex: '-999',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingLeft: '100px',
            paddingRight: '100px',
            zIndex: '999',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <h1>VSCODEHELP</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae praesentium nisi ipsam rem
            vero, perspiciatis voluptatibus voluptatum error, labore nam cupiditate magni velit placeat,
            qui alias doloribus deleniti id eos ratione quae sit veritatis quas illum! Incidunt, cum
            aliquid ut fugiat doloribus perferendis culpa obcaecati ea explicabo maxime. Dignissimos,
            dolor.{' '}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
