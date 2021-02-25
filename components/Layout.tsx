import layoutStyles from "../styles/Layout.module.css";

const Layout:React.FC = ({children}) => {
  return (
    <section className={layoutStyles.layout}>
      {children}
    </section>
  )
}

export default Layout;