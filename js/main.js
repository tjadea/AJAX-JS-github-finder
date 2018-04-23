$(document).ready(function () {
    // console.log('Ready');
    $('#searchUser').on('keyup', function (e) {
        // console.log(e.target.value);
        let username = e.target.value;
        // Make request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '59d7faa1f1975a13b2ce',
                client_secret: '3effc9b5ceccb2c798f4291e87b7c0a1f92f37db'
            }
        }).done(function (user) {
            // console.log(user);
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '59d7faa1f1975a13b2ce',
                    client_secret: '3effc9b5ceccb2c798f4291e87b7c0a1f92f37db',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                // console.log(repos);
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-5">
                                    <h5 class="card-title">${repo.name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${repo.description}</h6>
                                </div>
                                <div class="col-md-4">
                                    <span class="badge badge-secondary">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-warning">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-3">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-secondary">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                });
            });
            $('#profile').html(`
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><a href="${user.blog}">${user.blog}</a></h6>
                <div class="row">
                    <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        <br><br>
                        <a target="_blank" class="btn btn-secondary btn-block" href="${user.html_url}">View Profile</a>
                    </div>
                    <div class="col-md-9">
                    <span class="badge badge-secondary">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-warning">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Followers: ${user.followers}</span>
                    <span class="badge badge-danger">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}<li>
                        <li class="list-group-item">Location: ${user.location}<li>
                        <li class="list-group-item">Member Since: ${user.created_at}<li>
                    <ul>
                    </div>
                </div>
            </div>
            </div>
            <h4 class="page-header">Latest Repos</h4>
            <div id="repos"></div>
            `);
        });
    });
});