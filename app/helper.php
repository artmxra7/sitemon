<?php


if (!function_exists('generateFiledCode')) {
    function generateFiledCode($code)
    {
        $result = $code.'-'.date('s').date('y').date('i').date('m').date('h').date('d').mt_rand(1000000, 9999999);

        return $result;
    }
}

if (!function_exists('generateBreadcrumb')) {
    function generateBreadcrumb($data)
    {
        if (empty($data)) {
            return null;
        }

        $result = '<ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
					<li class="m-nav__item m-nav__item--home">
						<a href="'.url('/').'" class="m-nav__link m-nav__link--icon">
							<i class="m-nav__link-icon la la-home"></i>
						</a>
					</li>';

        foreach ($data as $uri => $item) {
            if ($uri == '!end!' || $uri == '#') {
                $result .= '<li class="m-nav__separator">-</li>
                            <a class="m-nav__link">
                                <span class="m-nav__link-text">'.$item.'</span>
                            </a>';

                continue;
            }
            $result .= '<li class="m-nav__separator">-</li>
						<li class="m-nav__item">
							<a href="'.url($uri).'" class="m-nav__link">
								<span class="m-nav__link-text">'.$item.'</span>
							</a>
						</li>';
        }

        $result .= '</ul>';

        return $result;
    }
}

?>
