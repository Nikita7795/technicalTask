import Comments from 'src/components/Comments/Comments';
import './Main.css';

const Main: React.FC = (
) => {
  return (
    <div className={'Main'}>
      <section className={'Main-comment'}>
        <Comments />
      </section>
      <div className={"Main-overlay"}></div>
      <div className={'Main-gradient1'}></div>
      <div className={'Main-gradient3'}></div>
      <div className={'Main-gradient4'}></div>
      <div className={'Main-gradient5'}></div>
      <div className={'Main-gradient6'}></div>
      <div className={'Main-gradient7'}></div>
      <div className={'Main-gradient8'}></div>
    </div>
  )
};

export default Main;
