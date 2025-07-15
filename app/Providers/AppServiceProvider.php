<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use App\Models\Project;
use App\Policies\UserPolicy;
use App\Policies\ProjectPolicy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    
    }
    
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureCommands();
        $this->configureModels();
        $this->configureUrl();
        $this->configureVite();
        $this->registerPolicies();
    }
    
    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(
            $this->app->isProduction(),
        );
    }
    
    private function configureModels(): void
    {
        Model::shouldBeStrict();
    }
    
    private function configureUrl(): void
    {
        URL::forceScheme('https');
    }
    
    private function configureVite(): void
    {
        Vite::usePrefetchStrategy('aggressive');
        Vite::prefetch(concurrency: 3);
    }
    
    private function registerPolicies(): void
    {
        Gate::policy(
            Project::class,
            ProjectPolicy::class
        );
        
        Gate::policy(
            User::class,
            UserPolicy::class
        );
    }
}
