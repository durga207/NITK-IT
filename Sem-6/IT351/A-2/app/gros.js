body {
  background-color: #9fa0da;
}
.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -1px;
}
.navbar {
    color: #fff;
    background: rgb(21, 143,122);
    padding: 5px 16px;
  }

  .navbar img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .navbar .navbar-brand {
    color: #efe5ff;
    padding-left: 0;
    padding-right: 50px;
    font-size: 25px;
  }

  .navbar .navbar-brand i {
    font-size: 25px;
    margin-right: 5px;
  }

  .navbar ul li i {
    font-size: 23px;
  }

  .navbar .nav > li a {
    color: #efe5ff;
    padding: 8px 15px;
    font-size: 17px;
  }

  .navbar .nav > li > a > i {
    display: block;
    text-align: center;
  }

  .navbar .dropdown-menu i {
    font-size: 16px;
    min-width: 22px;
  }

  .navbar .dropdown-menu li a {
    color: #777 !important;
    padding: 8px 9px;
    line-height: normal;
    display: flex;
  }

  .navbar .dropdown-menu li a:hover,
  .navbar .dropdown-menu li a:focus {
    color: #333 !important;
    background: transparent !important;
  }
  .navbar .nav .active a,
  .navbar .nav .active a:hover,
  .navbar .nav .active a:focus {
    color: #fff;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
    background: transparent !important;
  }

  @media (max-width: 1199px) {
    .navbar .nav > li > a > i {
      display: inline-block;
      text-align: left;
      min-width: 30px;
      position: relative;
      top: 4px;
    }
  }

  .page-footer {
    background: red;
    color: #fff;
  }
