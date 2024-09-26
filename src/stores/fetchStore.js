import { defineStore } from 'pinia';

export const useStore = defineStore('apiStore', {
    state: () => ({
        loading: true,
        visited: false,
        whiteHeader: false,
        all: [],
        data: [],
        project: {},
        settings: [],
        randomRelated: []
      }),
      getters: {
      },
      actions: {
        async fetchAll(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
            try {
                const response = await fetch(`${apiUrl}/api/proyectos?populate=deep,6` , {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                let all = await response.json();
                this.all = all;
                
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.all);
                console.log("done")
                // console.log(this.loading)
                this.loading = false;
                console.log(this.loading)

                const indice1 = Math.floor(Math.random() * this.all.data.length);
                const indice2 = Math.floor(Math.random() * this.all.data.length);

                this.related1 = this.all.data[indice1]
                this.related2 = this.all.data[indice2]

                console.log(this.related1)
                console.log(this.related2)
                this.randomRelated = []
                this.randomRelated.push(this.related1, this.related2);
                console.log(this.randomRelated)
              }
        },
        async fetchData(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
            try {
                const response = await fetch(`${apiUrl}/api/general?populate=deep,6` , {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                let data = await response.json();
                this.data = data.data.attributes.proyectos;
                
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.data);
                console.log("done")
                // console.log(this.loading)
                this.loading = false;
                console.log(this.loading)
              }
        },

        async fetchProject(apiUrl, authToken, slug) {
          this.loading = true;
          console.log(this.loading)
          try {

            const response = await fetch(`${apiUrl}/api/proyectos?filters[slug][$eq]=${slug}&populate=deep,6` , {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            let project = await response.json();
            this.project = project.data[0].attributes;

          }
          catch(error) {
            console.log(error);
          }
          finally {
            console.log(this.project);
            console.log("done")
            // console.log(this.loading)
            this.loading = false;
            console.log(this.loading)
          }
        },

        async fetchServices(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
          try {

            const response = await fetch(`${apiUrl}/api/service?populate=deep,6` , {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            let data = await response.json();
            this.data = data.data.attributes.servicios;

          }
          catch(error) {
            console.log(error);
          }
          finally {
            console.log(this.data);
            console.log("done")
            // console.log(this.loading)
            this.loading = false;
            console.log(this.loading)
          }
        },

        async fetchAbout(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
          try {

            const response = await fetch(`${apiUrl}/api/about?populate=deep,6` , {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            let data = await response.json();
            this.data = data.data.attributes;

          }
          catch(error) {
            console.log(error);
          }
          finally {
            console.log(this.data);
            console.log("done")
            // console.log(this.loading)
            this.loading = false;
            console.log(this.loading)
          }
        },

        async fetchCategory(apiUrl, authToken, category) {
          this.loading = true;
          console.log(this.loading)
            try {
                const response = await fetch(`${apiUrl}/api/${category}?populate=deep,6` , {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                let data = await response.json();
                this.data = data.data.attributes.proyectos;
                
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.data);
                console.log("done")
                // console.log(this.loading)
                this.loading = false;
                console.log(this.loading)
              }
        },

        async fetchSettings(apiUrl, authToken) {
          this.loading = true;
          console.log(this.loading)
            try {
                const response = await fetch(`${apiUrl}/api/setting?populate=deep,2` , {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                let settings = await response.json();
                this.settings = settings.data.attributes;
                
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                console.log(this.settings);
                console.log("done")
              }
        },


        setIsInInfoRoute(value) {
          this.whiteHeader = value;
        },

        toTop() {
          window.scrollTo({ top: 0, behavior: 'instant' });
          console.log('top')
        },

        storage() {
          // Verificar si el usuario ya ha visitado la página
          let visit = sessionStorage.getItem('firstVisit');
      
          if (!visit) {
              this.visited = false
              sessionStorage.setItem('firstVisit', 'true');

          } else {
            this.visited = true
              console.log("Ya has visitado esta página antes.");
          }
        },

        getClass(view) {
          let columnsClass = {
            col1: 'md:col-span-1 col-span-3',
            col2: 'md:col-span-2 col-span-3',
            col3: 'md:col-span-3 col-span-3',
            col4: 'md:col-span-4 col-span-4',
            col5: 'md:col-span-5 col-span-4',
            col6: 'md:col-span-6 col-span-4',
            col7: 'md:col-span-7 col-span-5',
            col8: 'md:col-span-8 col-span-5',
            col9: 'md:col-span-9 col-span-5',
            col10: 'md:col-span-10 col-span-5',
            col11: 'md:col-span-11 col-span-6',
            col12: 'md:col-span-12 col-span-6',
            col13: 'md:col-span-13 col-span-6'
          };

          let startColumnClass = {
            col1: 'md:col-start-1',
            col2: 'md:col-start-2',
            col3: 'md:col-start-3',
            col4: 'md:col-start-4',
            col5: 'md:col-start-5',
            col6: 'md:col-start-6',
            col7: 'md:col-start-7',
            col8: 'md:col-start-8',
            col9: 'md:col-start-9',
            col10: 'md:col-start-10',
            col11: 'md:col-start-11',
            col12: 'md:col-start-12',
            col13: 'md:col-start-13'
          };

          let endColumnClass = {
            col1: 'md:col-end-1 col-end-1',
            col2: 'md:col-end-2 col-end-1',
            col3: 'md:col-end-3 col-end-1',
            col4: 'md:col-end-4 col-end-2',
            col5: 'md:col-end-5 col-end-2',
            col6: 'md:col-end-6 col-end-3',
            col7: 'md:col-end-7 col-end-3',
            col8: 'md:col-end-8 col-end-4',
            col9: 'md:col-end-9 col-end-4',
            col10: 'md:col-end-10 col-end-5',
            col11: 'md:col-end-11 col-end-5',
            col12: 'md:col-end-12 col-end-6',
            col13: 'md:col-end-13 col-end-6',
            col14: 'md:col-end-14 col-end-6'
          };

          let gridClass = {
            col1: 'md:grid-cols-1 grid-cols-1',
            col2: 'md:grid-cols-2 grid-cols-1',
            col3: 'md:grid-cols-3 grid-cols-1',
            col4: 'md:grid-cols-4 grid-cols-2',
            col5: 'md:grid-cols-5 grid-cols-2',
            col6: 'md:grid-cols-6 grid-cols-3',
            col7: 'md:grid-cols-7 grid-cols-3',
            col8: 'md:grid-cols-8 grid-cols-4',
            col9: 'md:grid-cols-9 grid-cols-4',
            col10: 'md:grid-cols-10 grid-cols-5',
            col11: 'md:grid-cols-11 grid-cols-5',
            col12: 'md:grid-cols-12 grid-cols-6',
            col13: 'md:grid-cols-13 grid-cols-6'
          };

          return [
            columnsClass[view.Columns] || '',
            startColumnClass[view.startColumn] || '',
            endColumnClass[view.endColumn] || '',
            gridClass[view.Columns] || ''
          ].join(' ').trim();
        }
      }
})