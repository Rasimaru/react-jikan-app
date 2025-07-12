import React, { type JSX } from 'react';
import Layout from '@/components/layout/Layout';

class App extends React.Component {
  state = {
    items: [],
    searchField: ''
  };

  componentDidMount(): void {
    fetch('https://api.jikan.moe/v4/top/anime?filter=airing&page=1')
      .then((response) => response.json())
      .then((data) => this.setState({ items: data }));
  }

  render(): JSX.Element {
    return (
      <Layout>
        <section className="hero flex flex-col gap-4">
          <h2 className="text-5xl">Discover Your Next Adventure</h2>
          <p className="text-lg text-center">
            Track, discover, and discuss your favorite anime and manga all in one place.
          </p>
        </section>
        <section></section>
      </Layout>
    );
  }
}

export default App;
