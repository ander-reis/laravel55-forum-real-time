@extends('layouts.default')

@section('content')
<div class="container">
    <h3>{{ __('Most recent threads') }}</h3>
    <threads
            title="{{ __('Threads') }}"
            threads="{{ __('Threads') }}"
            replies="{{ __('Replies') }}"
            open="{{ __('Open') }}"
            new-thread="{{__('New thread')}}"
            thread-title="{{__('Title')}}"
            thread-body="{{__('Body')}}"
            send="{{__('Send')}}"
            pin="{{ __('Pin') }}"
            close="{{ __('Close') }}"
    >
        @include('layouts.default.preloader')
    </threads>
</div>
@endsection

@section('scripts')
    <script src="/js/threads.js"></script>
@endsection
