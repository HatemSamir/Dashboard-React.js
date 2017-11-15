var NavBar = React.createClass ({
  render: function() {
    var self = this;

    var createLinkItem = function (item, index) {
      return <NavItem key={item.title + index} href={item.href} title={item.title} cssClass={item.cssClass} hidden={self.props.user.role === 'customer'}/>;
    }

    return (
        <div className="col-lg-2 col-md-2 col-sm-3 col-sm-12">
          <nav className="navbar navbar-default navbar-fixed-side">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Creative Tim</a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {this.props.navData.map(createLinkItem)}
              </ul>
            </div>
          </nav>
        </div>
    );
  }
});

var NavItem = React.createClass ({
  render: function() {
    var self = this;

    var listItem = function() {
      if(!self.props.hidden) {
        return <li className={self.props.cssClass}><a href={self.props.href}>Admin</a></li>
      }
      return <li className={self.props.cssClass}><a href={self.props.href}>{self.props.title}</a></li>
    };

    return listItem()
  }
});

var navLinks = [
  {
    title: "Dashboard",
    href: "#",
    cssClass: "dashboard"
  },{
    title: "User Profile",
    href: "#",
    cssClass: "user-profile"
  },
  {
    title: "Table List",
    href: "#",
    cssClass: "table-list"
  },
  {
    title: "Typography",
    href: "#",
    cssClass: "typography"
  },
  {
    title: "Icons",
    href: "#",
    cssClass: "icons"
  },
  {
    title: "Maps",
    href: "#",
    cssClass: "maps"
  },
  {
    title: "Notifications",
    href: "#",
    cssClass: "notifications"
  }
];

var Card = React.createClass ({
  render: function () {
    return (
      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-info">
            <i style={{backgroundColor: this.props.iconColor}} className="material-icons">{this.props.icon}</i>
            <h2>{this.props.title}</h2>
            <h3 className="unit-number">
              {this.props.number}
              <span>{this.props.unit}</span>
            </h3>
          </div>
          <div className="card-footer">
            <i className="material-icons">{this.props.footerIcon}</i>
            {this.props.footerText}
          </div>
        </div>
      </div>
    )
  }
});

var Grid = React.createClass ({
  render: function() {

    var self = this;

    var componentList = function() {
      if (self.props.type === 'list') {
        return (
          <div className="grid col-lg-6 col-md-12 col-sm-12">
            <div className="list clearfix">
              <div className="head-title">
                <h1>{self.props.title}</h1>
                <span>{self.props.subtitle}</span>
              </div>
              <table className="col-md-12 col-sm-12 col-xs-12 table-striped table-condensed">
                <thead>
                    <th>id</th>
                    <th>name</th>
                    <th>salary</th>
                    <th>country</th>
                </thead>
                {
                  self.props.data.map((employee) => {
                    return (
                      <tr>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.country}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
          </div>
        )
      }

      if (self.props.type === 'todo') {
        return (
          <div className="grid col-lg-6 col-md-12 col-sm-12">
            <div className="todo clearfix">
              <div className="head-title clearfix">
                <h1>{self.props.title}</h1>
                <ul>
                  <li className="bugs">bugs</li>
                  <li className="website">website</li>
                  <li className="server">server</li>
                </ul>
              </div>
              <ul>
                {self.props.data.map((task) => {
                  return (
                      <li>{
                        (function()  {
                          if (task.done) {
                            return <input type="checkbox" checked />
                          } else {
                            return <input type="checkbox" />
                          }
                        })()
                      }
                      <span>{task.title}</span>
                      <button className="remove"></button>
                      <button className="edit"></button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      }
    }

    return componentList()

  }
});

var Chart = React.createClass({
    render : function(){
        return (
            <div id={this.props.id}></div>
        );
    },
    //Called after the render function.
    componentDidMount : function(){
        zingchart.render({
            id : this.props.id,
            width: (this.props.width || 600),
            height: (this.props.height || 400),
            data : this.props.data
        });
    },
    //Used to check the values being passed in to avoid unnecessary changes.
    shouldComponentUpdate : function(nextProps, nextState){
        //Lazy object comparison
        return !(JSON.stringify(nextProps.data) === JSON.stringify(this.props.data)) ;
    },
    componentWillUpdate : function(nextProps){
        zingchart.exec(this.props.id, 'setdata', {
            data : nextProps.data
        })
    }
});

var Stats = React.createClass ({

  render: function() {
    return (
      <div className="col-lg-4 col-md-12 col-sm-12">
        <div className="chart-container">
          <Chart id={this.props.id} height="250" width="100%" data={this.props.data}/>
          <h1>{this.props.title}</h1>
          <p>{this.props.info}</p>
          <div className="chart-footer">
            <p>{this.props.update}</p>
          </div>
        </div>
      </div>
    )
  }

});

var App = React.createClass({
  render: function() {

    var employesList = [
      {
        id:'1',
        name:'Dakota Rice',
        salary:'$36,738',
        country:'Niger',
      },
      {
        id:'2',
        name:'Minerva Hooper',
        salary:'$23,789',
        country:'Curacao',
      },
      {
        id:'3',
        name:'Sage Rodriguez',
        salary:'$56,142',
        country:'Netherland',
      },
      {
        id:'4',
        name:'Philip Chancy',
        salary:'$38,142',
        country:'Koreea, South',
      }
    ]

    var tasksList = [
      {
        title: "Sign contract what are conference organizers afraid of? ",
        done: true
      },
      {
        title: "Lines from great Russians literature? or E-mail from my boss?",
        done: false
      },
      {
        title: "Flooded: one year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
        done: false
      },
      {
        title: "Create 4 invisibl User Experiences you Never Knew About",
        done: true
      }
    ];

    var userObject = {
      id: 1,
      username: 'hatem',
      role: 'customer'
    };

    var dailySalesData = {
          "graphset": [{
              "type" : "line",
              "series":  [{
                  "values" : [0,1,4,2,1]
              }]
          }]
      };

    var completedTaskData = {
          "graphset": [{
              "type" : "line",
              "series":  [{
                  "values" : [0,1,3,2,4]
              }]
          }]
      };

    var emailSubscriptionData = {
        type: 'vbar',
        plot: {
          stacked: true,
          animation: {
            sequence: 3,
            effect: 4,
            method: 1,
            speed: 500
          }
        },
        legend: {
          borderWidth: 0
        },
        plotarea:{
          margin: 'dynamic'
        },
        scaleX: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu']
        },
        scaleY: {
          minValue: 0,
          maxValue: 16,
          step: 4.5,
          decimals: 1
        },
        series: [
          {
            values: [5.0,3.0,5.5,2.0,2.5],
            offsetValues: [1.0,3.0,0,2.0,2.5],
            backgroundColor: '#FF6600',
            valueBox: {
              placement: 'bottom',
              rules: [
                {
                  rule: '%i == 2',
                  visible: false
                }
              ]
            },
            text: 'Jim'
          },
          {
            values: [5.0,8.0,9.0,4.0,3.5],
            offsetValues: [1.0,3.0,0,2.0,2.5],
            backgroundColor: '#DC143C',
            valueBox: {},
            text: 'Joe'
          }
        ]
      };

    return (
      <div>
        <NavBar user={userObject} navData={navLinks}/>
        <div className="col-lg-10 col-md-10 col-sm-9 col-xs-12">
          <Card icon="content_copy" iconColor="#ff9302" title="Used Space" number="49/50" unit="GB" footerText="get more space" footerIcon="warning" />
          <Card icon="store_mall_directory" iconColor="#22b34e" title="Revenu" number="34,000" unit="$" footerText="Last 24 Hours" footerIcon="date_range" />
          <Card icon="info_outline" iconColor="#fd2435" title="Fixed Issues" number="75" unit="" footerText="Tracked From Github" footerIcon="local_offer" />
          <Card icon="content_copy" iconColor="#00b9ce" title="Followers" number="245" unit="+" footerText="Just Updated" footerIcon="update"/>
          <Stats id="dailySalesData" title="Daily Sales" info="55% increase in todays sales" update="updated 4 minutes ago" data={dailySalesData} />
          <Stats id="emailSubscriptionData" title="Email Subscriptions" info="Last Campaign Performance" update="updated 4 minutes ago" data={emailSubscriptionData} />
          <Stats id="completedTaskData" title="Completed Tasks" info="Last Campaign Performance" update="updated 4 minutes ago" data={completedTaskData} />
          <Grid title="Tasks:" type="todo" data={tasksList} />
          <Grid title="Employees Stats" subtitle="New employees on 15th September, 2016" type="list" data={employesList} />
        </div>
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
